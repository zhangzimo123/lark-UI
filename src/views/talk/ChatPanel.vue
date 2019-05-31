<template>
  <!-- 研讨布局 -->
  <a-layout class="talk-layout">

    <a-layout-sider class="talk-layout-sider">

      <div class="search-bar">
        <div class="search-bar-input">
          <a-input
            placeholder="消息/联系人/群组"
            size="small"
            style="width: 215px;border:2px solid white;"
            @blur="onBlur"
            @focus="onFocus"
            v-model="searchObj.searchValue"
            @input="searchValueChange"
          />
          <span class="search-icon" v-if="!showSearchContent" @click="cleanSearchValue">✖</span>
          <a-icon class="search-icon" v-if="showSearchContent" type="search" />
        </div>

        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="$refs.model.beginTalk()">发起研讨</a-menu-item>
            <a-menu-item key="2">发起会议</a-menu-item>
          </a-menu>
          <a-button type="default" size="small" icon="plus" style="margin-left:3px;margin-top:3px;">
          </a-button>
        </a-dropdown>
      </div>

      <div v-if="!showSearchContent" class="showSearchContent">
        <div class="recent-contacts-container tab-content-container">
          <div v-for="(item, index) in searchResultList" :key="index" @click="showChat(item)">
            <recent-contacts-item :contactsInfo="item" :activated="item.id === activeChat"></recent-contacts-item>
          </div>
        </div>
      </div>

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
        <user-chat :chatInfo="currentChat" @showChat="showChat"/>
      </div>

      <div v-show="activeKey == '2'" class="info-area">
        <group-info :selected="activeGroup"></group-info>
      </div>

      <div v-show="activeKey == '3'" class="info-area">
        <contacts-info :selected="activeContacts"></contacts-info>
      </div>

    </a-layout>

    <member-model ref="model" @ok="handleSaveOk" @close="handleSaveClose"/>

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
import WebsocketHeartbeatJs from '../../utils/talk/WebsocketHeartbeatJs'
import {
  ChatListUtils,
  Chat,
  imageLoad,
  MessageInfoType,
  MessageTargetType,
  timeoutFetch
} from '../../utils/talk/chatUtils'
import { ErrorType } from '@/utils/constants'
import conf from '@/api/index'
import HttpApiUtils from '../../utils/talk/HttpApiUtils'

export default {
  name: 'ChatPanel',
  components: {
    ContactsBox,
    ContactsInfo,
    GroupInfo,
    UserChat,
    MemberModel,
    RecentContactsItem,
    GroupItem
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
      searchResultList: [],

      // 记录当前选中的联系人/群组信息
      activeContacts: '',
      activeGroup: '',
      activeChat: '',

      // 加载状态
      recentLoading: false,
      groupLoading: false,
      contactsLoading: false,

      // 搜索内容显示
      showSearchContent: true
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
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },
    showChat: function (chat) {
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
    onBlur () {
      console.log('onBlur')
      if (!this.searchObj.searchValue) {
        this.showSearchContent = true
      }
    },
    onFocus () {
      console.log('onFocus')
      if (!this.searchObj.searchValue) {
        this.searchResultList = []
      }
      this.showSearchContent = false
    },
    cleanSearchValue () {
      this.searchObj.searchValue = ''
      this.showSearchContent = true
    },
    searchValueChange (e) {
      const value = e.target.value
      const strArr = []
      const searchArr = []
      this.searchResultList = []
      for (const item of this.chatList) {
        strArr.push(item.name)
      }
      if (strArr && value) {
        for (let i = 0; i < strArr.length; i++) {
          if (strArr[i].indexOf(value) >= 0) {
            searchArr.push(strArr[i])
          }
        }
      }
      for (const searchArrItem of searchArr) {
        for (const chatListItem of this.chatList) {
          if (searchArrItem === chatListItem.name) {
            this.searchResultList.push(chatListItem)
          }
        }
      }
      console.log('this.searchResultList', this.searchResultList)
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
    // const self = this
    // const websocketHeartbeatJs = new WebsocketHeartbeatJs({
    //   url: conf.getWsUrl()
    // })
    // websocketHeartbeatJs.onopen = function () {
    //   websocketHeartbeatJs.send('{"code":' + MessageInfoType.MSG_READY + '}')
    // }
    // websocketHeartbeatJs.onmessage = function (event) {
    //   const data = event.data
    //   const sendInfo = JSON.parse(data)
    //   // 真正的消息类型
    //   if (sendInfo.code === MessageInfoType.MSG_MESSAGE) {
    //     const message = sendInfo.message
    //     if (message.avatar && message.avatar.indexOf('http') === -1) {
    //       message.avatar = conf.getHostUrl() + message.avatar
    //     }
    //     message.timestamp = self.formatDateTime(new Date(message.timestamp))
    //     // 发送给个人
    //     if (message.type === MessageTargetType.FRIEND) {
    //       // 接受人是当前的研讨窗口
    //       if (String(message.fromid) === String(self.$store.state.currentChat.id)) {
    //         self.$store.commit('ADD_MESSAGE', message)
    //       } else {
    //         self.$store.commit('SET_UNREAD_COUNT', message)
    //         self.$store.commit('ADD_UNREAD_MESSAGE', message)
    //       }
    //     } else if (message.type === MessageTargetType.CHAT_GROUP) {
    //       // message.avatar = self.$store.state.chatMap.get(message.id);
    //       // 接受人是当前的研讨窗口
    //       if (String(message.id) === String(self.$store.state.currentChat.id)) {
    //         if (String(message.fromid) !== self.$store.state.user.id) {
    //           self.$store.commit('ADD_MESSAGE', message)
    //         }
    //       } else {
    //         self.$store.commit('SET_UNREAD_COUNT', message)
    //         self.$store.commit('ADD_UNREAD_MESSAGE', message)
    //       }
    //     }
    //     self.$store.commit('SET_LAST_MESSAGE', message)
    //     // 每次滚动到最底部
    //     self.$nextTick(() => {
    //       imageLoad('message-box')
    //     })
    //   }
    // }

    // websocketHeartbeatJs.onreconnect = function () {
    //   console.log('重连中...')
    // }

    // let count = 0
    // websocketHeartbeatJs.onerror = function () {
    //   const param = new FormData()
    //   param.set('client_id', 'v-client')
    //   param.set('client_secret', 'v-client-ppp')
    //   param.set('grant_type', 'refresh_token')
    //   param.set('scope', 'select')
    //   // param.set('refresh_token', localStorage.getItem('Refresh-Token'))
    //   timeoutFetch(
    //     fetch(conf.getTokenUrl(), {
    //       method: 'POST',
    //       model: 'cros', // 跨域
    //       headers: {
    //         Accept: 'application/json'
    //       },
    //       body: param
    //     }),
    //     5000
    //   )
    //     .then(response => {
    //       if (response.status === 200) {
    //         return response.json()
    //       } else {
    //         return new Promise((resolve, reject) => {
    //           reject(ErrorType.FLUSH_TOKEN_ERROR)
    //         })
    //       }
    //     })
    //     .then(json => {
    //       count = 0
    //       self.$store.commit('SET_TOKEN', json)
    //       self.$store.commit('SET_TOKEN_STATUS', json)

    //       // 清除原先的刷新缓存的定时器
    //       self.$store.commit('CLEAR_FLUSH_TOKEN_TIME_ID')
    //       // 刷新token 定时器
    //       const flushTokenTimerId = setTimeout(function () {
    //         const api = new HttpApiUtils()
    //         api.flushToken(self)
    //       }, ((json.expires_in - 10) * 1000))
    //       self.$store.commit('SET_FLUSH_TOKEN_TIME_ID', flushTokenTimerId)
    //     })
    //     .catch(error => {
    //       count++
    //       if (error.toString() === 'TypeError: Failed to fetch') {
    //         self.$Message.error('网络断开，正在重连...')
    //       } else if (ErrorType.FLUSH_TOKEN_ERROR === error) {
    //         count = 25
    //       }
    //     })
    //     // 重连次数大于24 退出登录
    //   if (count > 24) {
    //     count = 0
    //     // logout(self)
    //   }
    // }
    // // 这地方不成功，消息将不能发送
    // self.$store.commit('SET_WEBSOCKET', websocketHeartbeatJs)
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

  .search-bar-input {
    background-color: white;
    border: 2px solid #eeeeee;
  }

  .showSearchContent{
    height: 810px;
  }

  .search-icon{
    padding: 0 5px 0 5px;
  }

</style>
