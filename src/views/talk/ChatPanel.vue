<template>
  <!-- 研讨布局 -->
  <a-layout class="talk-layout">

    <a-layout-sider class="talk-layout-sider">

      <div class="search-bar">
        <a-input-search
          placeholder="消息/联系人/群组"
          size="small"
        />

        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="$refs.model.beginTalk()">发起研讨</a-menu-item>
            <a-menu-item key="2">发起会议</a-menu-item>
          </a-menu>
          <a-button type="default" size="small" icon="plus" style="margin-left:3px">
          </a-button>
        </a-dropdown>

      </div>

      <a-tabs :activeKey="activeKey" @change="changePane" :tabBarGutter="0" :tabBarStyle="tabStyle" :animated="false">
        <a-tab-pane key="1" forceRender>
          <span slot="tab">
            <a-icon type="clock-circle" style="fontSize: 18px" />
            最近
          </span>

          <div class="recent-contacts-container tab-content-container">

            <!-- <a-list :dataSource="chatList">
              <a-list-item :class="{active : active == item.id}" class="talk-list" slot="renderItem" slot-scope="item" @click="showChat(item)">
                <a-list-item-meta :description="item.lastMessage" class="talk-item">
                  <div slot="title" :href="item.href">{{ item.name }}</div>
                  <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </a-list-item-meta>
                <div class="talk-time">10:34</div>
              </a-list-item>
              <div v-if="loading && !busy" class="demo-loading-container">
                <a-spin/>
              </div>
            </a-list> -->
            <chat-contacts-item></chat-contacts-item>

          </div>
        </a-tab-pane>

        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="team" style="fontSize: 18px" />
            群组
          </span>

          <div class="group-contacts-container tab-content-container">
            <contacts-box/>
          </div>
        </a-tab-pane>

        <a-tab-pane key="3">
          <span slot="tab">
            <a-icon type="user" style="fontSize: 18px" />
            联系人
          </span>

          <div class="contacts-container tab-content-container">

          </div>
        </a-tab-pane>
      </a-tabs>
    </a-layout-sider>

    <a-layout class="talk-layout-content">
      <!--
      根据左侧选择的tab页，右侧展示对应的组件内容
      所以右侧也需要写三个组件 分别是：聊天组件， 群组信息组件， 联系人信息组件
        1). 聊天组件： 直接进行聊天的界面
        2). 群组信息组件： 展示群组信息，有直接跳转到聊天界面的按钮
        3). 联系人信息组件： 展示联系人信息，有直接跳转到聊天界面的按钮
      情景描述：
        用户未选中查看左侧列表中的某一项时，右侧显示对应的欢迎页；
        用户选中后直接展示对应的信息，并高亮选中项；
        选中项的值可以统一记录在本组件中
      -->
      <!-- <div v-show="isShowWelcome">
        <div style="margin: 120px auto 0 auto;text-align: center;">
          <a-icon type="rocket" theme="twoTone" twoToneColor="#52c41a" style="fontSize:108px" />
          <p class="description">不要怂，一起上</p>
        </div>
      </div> -->

      <div v-show="activeKey == '1'" class="chat-area">
        <user-chat v-show="isShowPanel" :chat="currentChat" @showChat="showChat"/>
      </div>

      <div v-show="activeKey == '2'" class="group-info-area">
        <group-info :selected="selectedGroup"></group-info>
      </div>

      <div v-show="activeKey == '3'" class="contacts-info-area">
        <contacts-info :selected="selectedContacts"></contacts-info>
      </div>

    </a-layout>

    <member-model ref="model" @ok="handleSaveOk" @close="handleSaveClose"/>

  </a-layout>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import {
  Chat as UserChat,
  Contacts as ContactsBox,
  ContactsInfo,
  GroupInfo,
  ChatContactsItem,
  MemberBox as MemberModel
} from '@/components/Talk'
import WebsocketHeartbeatJs from '../../utils/talk/WebsocketHeartbeatJs'
import {
  ChatListUtils,
  Chat,
  imageLoad,
  MessageInfoType,
  MessageTargetType,
  ErrorType,
  timeoutFetch
} from '../../utils/talk/chatUtils'
import conf from '@/api/index'
import HttpApiUtils from '../../utils/talk/HttpApiUtils'
export default {
  directives: { infiniteScroll },
  name: 'ChatPanel',
  components: {
    ContactsBox,
    ContactsInfo,
    GroupInfo,
    UserChat,
    MemberModel,
    ChatContactsItem
  },
  data () {
    return {
      activeKey: '1',
      tabStyle: { margin: '0 6px 0' },
      data: [],
      loading: false,
      busy: false,
      host: conf.getHostUrl(),
      isShowPanel: false,
      isShowWelcome: true,
      memberVisible: false,
      active: '',
      // record current contacts/group
      selectedContacts: {},
      selectedGroup: {}
    }
  },
  computed: {
    currentChat: {
      get: function () {
        return this.$store.state.chat.currentChat
      },
      set: function (currentChat) {
        this.$store.commit('SET_CURRENT_CHAT', currentChat)
      }
    },
    chatList: {
      get: function () {
        return this.$store.state.chat.chatList
      },
      set: function (chatList) {
        this.$store.commit('SET_CHAT_LIST', chatList)
      }
    }
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
      // 删除当前用户已经有的会话
      // const newChatList = chatList.filter(function (element) {
      //   return String(element.id) !== String(chat.id)
      // })
      // 重新添加会话，放到第一个
      const firstChat = new Chat(chat.id, chat.name, conf.getHostUrl() + chat.avatar, 0, '', '', '', MessageTargetType.CHAT_GROUP)
      // newChatList.unshift(firstChat)
      // 存储到localStorage 的 chatList
      ChatListUtils.setChatList(self.$store.state.user.info.id, chatList)
      // this.$store.commit('SET_CHAT_LIST', newChatList)

      this.$store.commit('RESET_UNREAD')
      this.currentChat = chat
      // 当前聊天室
      if (firstChat) {
        self.$store.commit('SET_CURRENT_CHAT', firstChat)
      }
      // 重新设置chatList
      self.$store.commit('SET_CHAT_LIST', ChatListUtils.getChatList(self.$store.state.user.info.id))
      // 每次滚动到最底部
      this.$nextTick(() => {
        // imageLoad('message-box')
      })
      this.active = chat.id
    },
    delChat (chat) {
      this.$store.commit('DEL_CHAT', chat)
    }
  },
  activated: function () {
    // const self = this
    // if (this.$route.query.chat) {
    //   self.isShowPanel = true
    //   self.isShowWelcome = false
    // }
    // 当前研讨室
    // if (self.$route.query.chat) {
    //   self.$store.commit('SET_CURRENT_CHAT', this.$route.query.chat)
    // }
    // 重新设置chatList
    // self.$store.commit('SET_CHAT_LIST', ChatListUtils.getChatList(self.$store.state.user.info.id))
    // 每次滚动到最底部
    // this.$nextTick(() => {
    //   imageLoad('message-box')
    // })
  },
  mounted: function () {
    const self = this
    const websocketHeartbeatJs = new WebsocketHeartbeatJs({
      url: conf.getWsUrl()
    })
    websocketHeartbeatJs.onopen = function () {
      websocketHeartbeatJs.send('{"code":' + MessageInfoType.MSG_READY + '}')
    }
    websocketHeartbeatJs.onmessage = function (event) {
      console.log('这地方被用了')
      const data = event.data
      const sendInfo = JSON.parse(data)
      // 真正的消息类型
      if (sendInfo.code === MessageInfoType.MSG_MESSAGE) {
        const message = sendInfo.message
        if (message.avatar && message.avatar.indexOf('http') === -1) {
          message.avatar = conf.getHostUrl() + message.avatar
        }
        message.timestamp = self.formatDateTime(new Date(message.timestamp))
        // 发送给个人
        if (message.type === MessageTargetType.FRIEND) {
          // 接受人是当前的研讨窗口
          if (String(message.fromid) === String(self.$store.state.currentChat.id)) {
            self.$store.commit('ADD_MESSAGE', message)
          } else {
            self.$store.commit('SET_UNREAD_COUNT', message)
            self.$store.commit('ADD_UNREAD_MESSAGE', message)
          }
        } else if (message.type === MessageTargetType.CHAT_GROUP) {
          // message.avatar = self.$store.state.chatMap.get(message.id);
          // 接受人是当前的研讨窗口
          if (String(message.id) === String(self.$store.state.currentChat.id)) {
            if (String(message.fromid) !== self.$store.state.user.id) {
              self.$store.commit('ADD_MESSAGE', message)
            }
          } else {
            self.$store.commit('SET_UNREAD_COUNT', message)
            self.$store.commit('ADD_UNREAD_MESSAGE', message)
          }
        }
        self.$store.commit('SET_LAST_MESSAGE', message)
        // 每次滚动到最底部
        self.$nextTick(() => {
          imageLoad('message-box')
        })
      }
    }

    websocketHeartbeatJs.onreconnect = function () {
      console.log('重连中...')
    }

    let count = 0
    websocketHeartbeatJs.onerror = function () {
      const param = new FormData()
      param.set('client_id', 'v-client')
      param.set('client_secret', 'v-client-ppp')
      param.set('grant_type', 'refresh_token')
      param.set('scope', 'select')
      param.set('refresh_token', sessionStorage.getItem('refresh_token'))
      timeoutFetch(
        fetch(conf.getTokenUrl(), {
          method: 'POST',
          model: 'cros', // 跨域
          headers: {
            Accept: 'application/json'
          },
          body: param
        }),
        5000
      )
        .then(response => {
          if (response.status === 200) {
            return response.json()
          } else {
            return new Promise((resolve, reject) => {
              reject(ErrorType.FLUSH_TOKEN_ERROR)
            })
          }
        })
        .then(json => {
          count = 0
          self.$store.commit('SET_TOKEN', json)
          self.$store.commit('SET_TOKEN_STATUS', json)

          // 清除原先的刷新缓存的定时器
          self.$store.commit('CLEAR_FLUSH_TOKEN_TIME_ID')
          // 刷新token 定时器
          const flushTokenTimerId = setTimeout(function () {
            const api = new HttpApiUtils()
            api.flushToken(self)
          }, ((json.expires_in - 10) * 1000))
          self.$store.commit('SET_FLUSH_TOKEN_TIME_ID', flushTokenTimerId)
        })
        .catch(error => {
          count++
          if (error.toString() === 'TypeError: Failed to fetch') {
            self.$Message.error('网络断开，正在重连...')
          } else if (ErrorType.FLUSH_TOKEN_ERROR === error) {
            count = 25
          }
        })
        // 重连次数大于24 退出登录
      if (count > 24) {
        count = 0
        // logout(self)
      }
    }
    // 这地方不成功，消息将不能发送
    self.$store.commit('SET_WEBSOCKET', websocketHeartbeatJs)
  }
}
</script>

<style lang="less" scoped>
  .talk-layout{
    // height: calc(100vh - 64px);
    overflow-y: hidden;
    margin: -24px -24px 0;
  }

  .talk-layout-sider {
    // 覆盖默认样式
    max-width: 300px !important;
    flex: 0 0 300px !important;

    background: #fff;
    border-right: 1px solid #ebebeb;

    // 聊天搜索栏样式 该部分高度为48px
    .search-bar {
      display: flex;
      margin: 18px 12px 6px;
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

      // 视窗高度-头部导航栏告诉-搜索框高度-tab页高度
      height: calc(100vh - 64px - 48px - 46px);

      &:hover {
        overflow-y: overlay;
      }

    }
  }

  .talk-layout-content {
    overflow: hidden;
  }

  // ***************************旧样式***************
  .talk-list{
    padding: 8px 12px 8px 12px;cursor: pointer;
  }
  .active {
     background: #e8e8e8;
    //  border: 1px solid #e8e8e8;
    //  color: #fff;
   }
  // .box-panel{
  //   height: calc(100% - 50px);
  // }
  .description{
    margin-top: 24px;
    color: gray;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
</style>
