<template>
  <div class="talk-view">
    <a-layout class="talk-layout">
      <a-layout-sider
        class="talk-sider"
        style="flex: 0 0 300px; max-width: 300px; min-width: 300px; width: 300px"
      >
        <div class="search-bar">
          <a-row>
            <a-col :span="21">
              <a-input-search
                placeholder="消息/联系人/群组"
                style="width:100%"
                size="small"
              />
            </a-col>
            <a-col :span="3">
              <a-dropdown>
                <a-menu slot="overlay">
                  <a-menu-item key="1" @click="$refs.model.beginTalk()">发起研讨</a-menu-item>
                  <a-menu-item key="2">发起会议</a-menu-item>
                </a-menu>
                <a-button type="default" size="small" icon="plus" style="margin-left:3px">
                </a-button>
              </a-dropdown>
            </a-col>
          </a-row>
        </div>
        <a-tabs defaultActiveKey="1" :tabBarGutter="0" :tabBarStyle="tabStyle">
          <a-tab-pane key="1" forceRender class="box-panel">
            <span slot="tab">
              <a-icon type="clock-circle" />
              最近
            </span>
            <div class="talk-box-container">
              <a-list :dataSource="chatList">
                <a-list-item class="talk-list" slot="renderItem" slot-scope="item" @click="showChat(item)">
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
              </a-list>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" style="height:100%">
            <span slot="tab">
              <a-icon type="team" />
              群组
            </span>
            <contacts-box/>
          </a-tab-pane>
          <a-tab-pane key="3" style="height:100%">
            <span slot="tab">
              <a-icon type="user" />
              联系人
            </span>
            联系人
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
      <a-layout>
        <div v-show="isShowWelcome">欢迎</div>
        <user-chat v-show="isShowPanel" :chat="currentChat" @showChat="showChat"/>
      </a-layout>
      <member-model ref="model" @ok="handleSaveOk" @close="handleSaveClose"/>
    </a-layout>
  </div>
</template>
<script>
import infiniteScroll from 'vue-infinite-scroll'
import UserChat from '@/components/Talk/Chat'
import ContactsBox from '@/components/Talk/Contacts'
import WebsocketHeartbeatJs from '../../utils/talk/WebsocketHeartbeatJs'
import MemberModel from '@/components/Talk/contacts/MemberBox'
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
    UserChat,
    MemberModel
  },
  data () {
    return {
      tabStyle: { marginLeft: '12px', marginRight: '12px', marginBottom: '0px' },
      data: [],
      loading: false,
      busy: false,
      host: conf.getHostUrl(),
      isShowPanel: false,
      isShowWelcome: true,
      memberVisible: false
    }
  },
  computed: {
    currentChat: {
      get: function () {
        return this.$store.state.chat.currentChat
      },
      set: function (currentChat) {
        this.$store.commit('setCurrentChat', currentChat)
      }
    },
    chatList: {
      get: function () {
        return this.$store.state.user.chatList
      },
      set: function (chatList) {
        this.$store.commit('SET_CHAT_LIST', chatList)
      }
    }
  },
  methods: {
    handleSaveOk () {

    },
    handleSaveClose () {

    },
    // startTalk: function () {
    //   this.$refs.model.beginTalk()
    // },
    showChat: function (chat) {
      const self = this
      self.isShowWelcome = false
      self.isShowPanel = true
      const chatList = ChatListUtils.getChatList(self.$store.state.user.info.id)
      // 删除当前用户已经有的会话
      const newChatList = chatList.filter(function (element) {
        return String(element.id) !== String(chat.id)
      })
      // 重新添加会话，放到第一个
      const firstChat = new Chat(chat.id, chat.name, conf.getHostUrl() + chat.avatar, 0, '', '', '', MessageTargetType.CHAT_GROUP)
      newChatList.unshift(firstChat)
      // 存储到localStorage 的 chatList
      ChatListUtils.setChatList(self.$store.state.user.info.id, chatList)
      this.$store.commit('setChatList', newChatList)

      this.$store.commit('resetUnRead')
      this.currentChat = chat
      // 每次滚动到最底部
      this.$nextTick(() => {
        // imageLoad('message-box')
      })
    },
    delChat (chat) {
      this.$store.commit('delChat', chat)
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
      self.$store.commit('setCurrentChat', this.$route.query.chat)
    }
    // 重新设置chatList
    self.$store.commit('setChatList', ChatListUtils.getChatList(self.$store.state.user.info.id))
    // 每次滚动到最底部
    this.$nextTick(() => {
      imageLoad('message-box')
    })
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
            self.$store.commit('addMessage', message)
          } else {
            self.$store.commit('setUnReadCount', message)
            self.$store.commit('addUnreadMessage', message)
          }
        } else if (message.type === MessageTargetType.CHAT_GROUP) {
          // message.avatar = self.$store.state.chatMap.get(message.id);
          // 接受人是当前的研讨窗口
          if (String(message.id) === String(self.$store.state.currentChat.id)) {
            if (String(message.fromid) !== self.$store.state.user.id) {
              self.$store.commit('addMessage', message)
            }
          } else {
            self.$store.commit('setUnReadCount', message)
            self.$store.commit('addUnreadMessage', message)
          }
        }
        self.$store.commit('setLastMessage', message)
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
          self.$store.commit('setToken', json)
          self.$store.commit('setTokenStatus', json)

          // 清除原先的刷新缓存的定时器
          self.$store.commit('clearFlushTokenTimerId')
          // 刷新token 定时器
          const flushTokenTimerId = setTimeout(function () {
            const api = new HttpApiUtils()
            api.flushToken(self)
          }, ((json.expires_in - 10) * 1000))
          self.$store.commit('setFlushTokenTimerId', flushTokenTimerId)
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
    self.$store.commit('setWebsocket', websocketHeartbeatJs)
  }
}
</script>
<style lang="less" scoped>
.talk-sider {
  flex-direction: column;
  background: #fff;
  height: 100%;
  border-right: 1px solid #ebebeb;
}
.talk-view {
  // height: calc(100% - 64px);
  height: 100%;
  // margin: -24px;
}
.talk-layout{
  height: 100%;
}
.search-bar{
  margin: 12px 12px 6px 12px;
}
.talk-box-container{
    flex: 1;
    display: flex;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;
    background-color: #f7f7f7;
    height: 100%;
    border-top: 1px solid #ebebeb;
}
.talk-list{
  padding: 8px 12px 8px 12px;cursor: pointer;
}
.box-panel{
  height: calc(100% - 50px);
}
</style>
