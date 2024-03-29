<template>
  <!-- 研讨布局 -->
  <a-layout class="talk-layout">
    <a-layout-sider class="talk-layout-sider">
      <div class="search-bar">
        <SearchInput />
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="$refs.model.beginTalk()">发起研讨</a-menu-item>
            <a-menu-item key="2">发起会议</a-menu-item>
          </a-menu>
          <a-button type="default" size="small" icon="plus" style="margin-left:3px;">
          </a-button>
        </a-dropdown>
      </div>
      <SearchArea
        :activeChat="activeChat"
        :activeGroup="activeGroup"
        :contactsGroup="activeContacts"
        :searchResultList="searchResultList"
        :searchGroupResultList="searchGroupResultList"
        :showSearchContent="showSearchContent"
        :searchContactsResultList="searchContactsResultList"
      />
      <a-tabs
        v-if="showSearchContent"
        :activeKey="activeKey"
        @change="changePane"
        :tabBarGutter="0"
        :tabBarStyle="tabStyle"
        :animated="false">
        <a-tab-pane key="1" forceRender>
          <span slot="tab">
            <a-icon type="clock-circle" style="{fontSize: 16px}" />
            最近
          </span>

          <div class="recent-contacts-container tab-content-container">
            <div v-for="(item, index) in chatList" :key="index" @click="showChat(item)">
              <recent-contacts-item :contactsInfo="item" :activated="item.id === activeChat"></recent-contacts-item>
            </div>

            <!-- 没有最新联系人或者联系人加载失败时的提示信息 -->
            <div v-if="!chatList || !chatList.length" class="empty-tips">
              <p>
                暂无聊天信息，
                <a-button type="primary" ghost size="small" :loading="recentLoading" @click="getRecentContacts">重新加载</a-button>
              </p>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="team" style="{fontSize: 16px}" />
            群组
          </span>

          <div class="group-contacts-container tab-content-container">
            <div v-for="(item, index) in groupList" :key="index" @click="showGroup(item)">
              <group-item :groupInfo="item" :activated="item.id === activeGroup"></group-item>
            </div>

            <!-- 没有群组或者群组加载失败时的提示信息 -->
            <div v-if="!groupList || !groupList.length" class="empty-tips">
              <p>
                暂无群组信息，
                <a-button type="primary" ghost size="small" :loading="groupLoading" @click="getGroupList">重新加载</a-button>
              </p>
            </div>

          </div>
        </a-tab-pane>

        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="user" style="{fontSize: 18px, margin: 0}" />
            联系人
          </span>

          <div class="contacts-container tab-content-container">
            <contacts-box :contactsTree="contactsTree" @SelectContacts="showContacts" style="paddingLeft: 18px;"/>

            <!-- 获取联系人树失败时的提示信息 -->
            <div v-if="!contactsTree || !contactsTree.length" class="empty-tips">
              <p>
                加载失败，
                <a-button type="primary" ghost size="small" :loading="contactsLoading" @click="getContactsTree">重新加载</a-button>
              </p>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-layout-sider>

    <a-layout class="talk-layout-content">

      <div v-show="activeKey == '1'" class="chat-area">
        <keep-alive>
          <router-view />
        </keep-alive>
        <!-- <user-chat :chatInfo="currentChat" @showChat="showChat"/> -->
      </div>
      <div v-show="activeKey == '2'" class="info-area">
        <group-info :selected="activeGroup"></group-info>
      </div>

      <div v-show="activeKey == '3'" class="info-area">
        <contacts-info :selected="activeContacts"></contacts-info>
      </div>

    </a-layout>

    <member-model ref="model" @ok="handleSaveOk" @close="handleSaveClose"/>
    <SearchRecordModal :searchRecordModalVisible="searchRecordModalVisible"/>
  </a-layout>
</template>

<script>
import {
  Chat as UserChat,
  Contacts as ContactsBox,
  ContactsInfo,
  GroupInfo,
  RecentContactsItem,
  MemberBox as MemberModel,
  GroupItem
} from '@/components/Talk'

import SearchInput from './SearchInput'
import SearchArea from './SearchArea'
import SearchRecordModal from './SearchRecordModal'

// import WebsocketHeartbeatJs from '../../utils/talk/WebsocketHeartbeatJs'
import {
  ChatListUtils,
  Chat,
  imageLoad,
  // MessageInfoType,
  MessageTargetType
  // timeoutFetch
} from '../../utils/talk/chatUtils'
// import { ErrorType } from '@/utils/constants'
import conf from '@/api/index'
// import HttpApiUtils from '../../utils/talk/HttpApiUtils'

import Utils from '../../../src/utils/utils.js'

export default {
  name: 'ChatPanel',
  components: {
    ContactsBox,
    ContactsInfo,
    GroupInfo,
    UserChat,
    MemberModel,
    RecentContactsItem,
    GroupItem,
    SearchInput,
    SearchArea,
    SearchRecordModal
  },
  data () {
    return {
      activeKey: '1',
      tabStyle: { margin: '0 6px 0', paddingLeft: '10px' },
      data: [],
      loading: false,
      busy: false,
      host: conf.getHostUrl(),
      isShowPanel: false,
      isShowWelcome: true,
      memberVisible: false,
      active: '',
      searchObj: {
        searchValue: ''
      },

      // 记录当前选中的联系人/群组信息
      activeContacts: '',
      activeGroup: '',
      activeChat: '',

      // 加载状态
      recentLoading: false,
      groupLoading: false,
      contactsLoading: false,

      searchRecordModalVisible: false
    }
  },
  computed: {
    currentChat: {
      get: function () {
        console.log(this.$store.state.chat.currentChat)
        return this.$store.state.chat.currentChat
      },
      set: function (currentChat) {
        this.$store.commit('SET_CURRENT_CHAT', currentChat)
      }
    },
    chatList: {
      get: function () {
        return this.$store.state.chat.recentChatList
      },
      set: function (recentChatList) {
        this.$store.commit('SET_RECENT_CHAT_LIST', recentChatList)
      }
    },
    groupList () {
      return this.$store.state.chat.groupList
    },
    contactsTree () {
      return this.$store.state.chat.contactsTree
    },
    showSearchContent () {
      if (this.$store.state.chat.showSearchContent === null) {
        return true
      } else {
        return this.$store.state.chat.showSearchContent
      }
    },
    searchResultList () {
      return this.$store.state.chat.searchResultList
    },
    searchGroupResultList () {
      return this.$store.state.chat.searchGroupResultList
    },
    searchContactsResultList () {
      return this.$store.state.chat.searchContactsResultList
    }
  },
  created () {
    this.getRecentContacts()
    this.getContactsTree()
    this.getGroupList()
  },
  methods: {
    /* 切换面板 */
    changePane (activeKey) {
      this.activeKey = activeKey
      if (activeKey === '1') {
        this.getRecentContacts()
      }
      // if( activeKey === '2'){
      // this.getGroupList()
      // }
      // if( activeKey === '3'){
      // this.getContactsTree()
      // }
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },
    showChat: function (chat) {
      console.log('chat')
      console.log(chat)
      const self = this
      self.isShowWelcome = false
      self.isShowPanel = true
      const chatList = ChatListUtils.getChatList(self.$store.state.user.info.id)

      // 重新添加会话，放到第一个
      const firstChat = new Chat(chat.id, chat.name, conf.getHostUrl() + chat.avatar, 0, '', '', '', MessageTargetType.CHAT_GROUP)

      // 存储到localStorage 的 chatList
      ChatListUtils.setChatList(self.$store.state.user.info.id, chatList)

      this.$store.commit('RESET_UNREAD')
      this.currentChat = chat
      // 当前聊天室
      if (firstChat) {
        self.$store.commit('SET_CURRENT_CHAT', firstChat)
      }
      // 重新设置chatList
      self.$store.commit('SET_RECENT_CHAT_LIST', ChatListUtils.getChatList(self.$store.state.user.info.id))

      this.$router.push({
        path: '/talk/ChatPanel/ChatBox',
        query: chat
      })

      // Chat会话框中的研讨信息每次滚动到最底部
      this.$nextTick(() => {
        // imageLoad('message-box')
      })
      this.activeChat = chat.id
    },
    delChat (chat) {
      this.$store.commit('DEL_CHAT', chat)
    },
    /** 展示群组详细信息 */
    showGroup (group) {
      this.activeGroup = group.id
    },
    /** 展示联系人详细信息 */
    showContacts (key) {
      this.activeContacts = key
    },
    /**
     * 加载群组列表
     * @author jihainan
     */
    getGroupList () {
      this.groupLoading = true
      this.$store.dispatch('GetGroupList').finally(() => {
        this.groupLoading = false
      })
    },
    /**
     * 加载联系人树
     * @author jihainan
     */
    getContactsTree () {
      this.contactsLoading = true
      this.$store.dispatch('GetContactsTree').finally(() => {
        this.contactsLoading = false
      })
    },
    /**
     * 获取最近联系列表
     * @author jihainan
     */
    getRecentContacts () {
      this.recentLoading = true
      this.$store.dispatch('GetRecentContacts').then(res => {
        if (this.$store.state.user.info.id) {
          ChatListUtils.setChatList(this.$store.state.user.info.id, res.result.data)
        }
      }).finally(() => {
        this.recentLoading = false
      })
    },
    handleOpenSearchRecordModal () {
      this.searchRecordModalVisible = true
    },
    handleCloseSearchRecordModal () {
      this.searchRecordModalVisible = false
    }
  },
  activated: function () {
    const self = this
    if (this.$route.query.chat) {
      self.isShowPanel = true
      self.isShowWelcome = false
    }
    // 当前研讨室
    if (self.$route.query.chat) {
      self.$store.commit('SET_CURRENT_CHAT', this.$route.query.chat)
    }
    // 重新设置chatList
    self.$store.commit('SET_RECENT_CHAT_LIST', ChatListUtils.getChatList(self.$store.state.user.info.id))
    // 每次滚动到最底部
    this.$nextTick(() => {
      imageLoad('message-box')
    })
  },
  mounted: function () {
    const self = this
    Utils.$on('showChat', function (chat) {
      self.showChat(chat)
    })
    Utils.$on('showGroup', function (chat) {
      self.showGroup(chat)
    })
    Utils.$on('openModal', function (chat) {
      self.handleOpenSearchRecordModal()
    })
    Utils.$on('closeModal', function (chat) {
      self.handleCloseSearchRecordModal()
    })
    Utils.$on('changePane', function (key) {
      self.changePane(key)
    })
    Utils.$on('showContacts', function (key) {
      self.showContacts(key)
    })
  }
}
</script>

<style lang="less" scoped>
  .talk-layout{
    // height: calc(100vh - 64px);
    overflow-y: hidden;
  }

  .talk-layout-sider {
    // 覆盖默认样式
    max-width: 280px !important;
    flex: 0 0 280px !important;

    background: rgb(230, 232, 235);
    border-right: 1px solid #dcdee0;

    // 聊天搜索栏样式 该部分高度为48px
    .search-bar {
      display: flex;
      margin: 16px 12px 8px;
    }

    // 调整tabs标签样式
    .ant-tabs-nav .ant-tabs-tab .anticon {
      margin-right: 0px;
    }

    // 最近消息标签页样式
    .recent-contacts-container {
      flex: 1;
      display: flex;
      position: relative;
      flex-direction: column;
      border-top: 1px solid #ebebeb;
    }

    // 群组标签页样式
    .group-contacts-container {
    }

    // 联系人标签页样式
    .contacts-container {
    }

    // 让最近 群组 联系人tab页的内容可以滚动的样式
    .tab-content-container {
      overflow: hidden;

      // 视窗高度-头部导航栏高度-搜索框高度-tab页高度
      height: calc(100vh - 64px - 48px - 46px);

      &:hover {
        overflow-y: overlay;
      }

    }

    // 加载失败或列表为空的提示信息样式
    .empty-tips {
      text-align: center;
      padding: 32px;
    }
  }

  .talk-layout-content {
    overflow: hidden;
    z-index: 8;
    background-color: rgb(242, 243, 245);
    .chat-area, .info-area {
      height: 100%;
    }
  }

</style>
