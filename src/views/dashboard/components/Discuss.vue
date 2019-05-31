<template>
  <div>
    <!--<a-card-->
    <!--:headStyle="headStyle"-->
    <!--:bordered="true"-->
    <!--:style="{ height: '300px'}">-->
    <!--<div slot="title">-->
    <!--<a-row>-->
    <!--<a-col>-->
    <!--<span style="color: #333333; font-weight:bold">-->
    <!--{{ title }}-->
    <!--</span>-->
    <!--<span style="font-size: 12px;font-weight: 200;color: #666666">({{ data.unread }}条未读消息)</span>-->
    <!--</a-col>-->
    <!--</a-row>-->
    <!--</div>-->
    <!--<div slot="extra">-->
    <!--<a-popover-->
    <!--placement="left"-->
    <!--trigger="click">-->
    <!--<template slot="content">-->
    <!--<a @click="$emit('remove')" style="color: #516efc">移除卡片</a>-->
    <!--</template>-->
    <!--<a class="right" href="#">-->
    <!--<a-icon type="close" style="color: #516efc"/>-->
    <!--</a>-->
    <!--</a-popover>-->
    <!--</div>-->
    <div style="height:205px;">
      <!--<a-row class="ant-card-list-item" :gutter="5" v-for="(row,index) in data.content" :key="'item'+index" >-->
      <!--<a-col :span="2" class="discuss-avatar">-->
      <!--<a-badge :count="row.unread">-->
      <!--<a-avatar :src="row.avatar" />-->
      <!--<a-row class="ant-card-list-item" :gutter="5" v-for="(row,index) in list" :key="'item'+index" @click="showChat(row)">-->
      <a-row class="ant-card-list-item" :gutter="5" v-for="(item) in chatList" :key="item.id" >
        <a-col :span="2" class="discuss-avatar" >
          <a-badge :count="item.unread">
            <a-avatar :src=" require('@/assets/sjs.jpg')" />
          </a-badge>
        </a-col>
        <a-col :span="21" class="min-width" @click="showChat(item)">
          <a-row :gutter="5">
            <a-col :span="21">
              <span style="color: #666666" class="discuss-name">{{ item.name }}</span>
            </a-col>
            <a-col :span="3">
              <span style="color: #999999" class="datetime right">{{ item.time }}</span>
            </a-col>
          </a-row>
          <a-row>
            <span style="color: #999999" class="discuss-msg">{{ item.lastMessage }}</span>
          </a-row>
        </a-col>
      </a-row>
    </div>
    <a-modal
      class="discuss-block"
      title="消息框"
      :visible="isShowPanel"
      @cancel="handleCancel"
      :mask="false"
      centered
      :footer="null"
      :maskClosable="false"
      wrapClassName="discuss-block-mask"
    >
      <user-chat :chat="currentChat" @showChat="showChat"/>
    </a-modal>
    <!--</a-card>-->
  </div>
</template>
<script>
import UserChat from '@/components/Talk/Chat'
import WebsocketHeartbeatJs from '../../../utils/talk/WebsocketHeartbeatJs'
import conf from '@/api/index'
import HttpApiUtils from '../../../utils/talk/HttpApiUtils'
import {
  ChatListUtils,
  Chat,
  imageLoad,
  MessageInfoType,
  MessageTargetType,
  timeoutFetch
} from '../../../utils/talk/chatUtils'
import { ErrorType } from '@/utils/constants'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    UserChat
  },
  data () {
    return {
      title: '研讨厅',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      size: 4,
      showChatVisible: true,
      isShowPanel: false,
      isShowWelcome: true,
      active: ''
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
        return this.$store.state.chat.recentChatList
      },
      set: function (chatList) {
        this.$store.commit('SET_RECENT_CHAT_LIST', chatList)
      }
    }
  },
  methods: {
    toDiscussPage () {
      // this.$router.push({ path: '/discuss' })
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
      this.active = chat.id
    },
    delChat (chat) {
      this.$store.commit('delChat', chat)
    },
    // closeMyChatPanel () {
    // this.$parent.closeMyChatPanel()
    // },
    // openSearchWindow () {
    // this.$parent.openSearchWindow()
    // },
    handleCancel: function () {
      const self = this
      self.isShowPanel = false
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
<style>
  .discuss-avatar{
    padding: 5px;
    margin-right: 10px;
  }

  .discuss-name{
    font-weight: 500;
  }

  .discuss-msg{

  }

  .discuss-block .ant-modal-body{
    padding: 0!important;
  }

  .discuss-block .ant-layout-content {
    height: 300px;
  }

  .discuss-block .ant-modal-header{
    background-color:#f2f3f5!important;
  }

  .discuss-block .ant-modal-title{
    color: #40a9ff!important;
  }

  .discuss-block .ant-modal-close-x{
    color: #40a9ff!important;
    background-color:#f2f3f5!important;
  }

  .discuss-block-mask{
    width: 38.8%;
    height: 76.7%;
    position: fixed;
    left: 488px;
    top: 125px;
  }
</style>
