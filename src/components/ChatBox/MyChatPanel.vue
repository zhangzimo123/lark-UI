<template>
  <div class="talk-view" v-show="myChatPanelIsShow">
    <a-layout class="talk-layout">
      <a-layout-sider
        class="talk-sider"
        style="flex: 0 0 300px;max-width: 300px;min-width: 300px;width: 300px;"
      >
        <!--<div class="talk-account-info-board">-->
        <!--<div class="talk-account-info-board-close" @click="this.closeMyChatPanel">✖</div>-->
        <!--<div>-->
        <!--<img class="talk-account-info-board-head" src="@/assets/sjs.jpg"/>-->
        <!--<div class="talk-account-info-board-online-icon"></div>-->
        <!--<span class="talk-account-info-board-name" >三井寿</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="search-bar">-->
        <!--<a-row>-->
        <!--<a-col :span="21">-->
        <!--<a-input-search-->
        <!--placeholder="消息/联系人/群组"-->
        <!--style="width:100%"-->
        <!--size="small"-->
        <!--/>-->
        <!--</a-col>-->
        <!--<a-col :span="3">-->
        <!--<a-dropdown>-->
        <!--<a-menu slot="overlay">-->
        <!--<a-menu-item key="1" @click="$refs.model.beginTalk()">发起研讨</a-menu-item>-->
        <!--<a-menu-item key="2">发起会议</a-menu-item>-->
        <!--</a-menu>-->
        <!--<a-button type="default" size="small" icon="plus" style="margin-left:3px">-->
        <!--</a-button>-->
        <!--</a-dropdown>-->
        <!--</a-col>-->
        <!--</a-row>-->
        <!--</div>-->
        <a-tabs defaultActiveKey="1" :tabBarGutter="0" :tabBarStyle="tabStyle">
          <a-tab-pane key="1" forceRender class="box-panel">
            <span slot="tab" class="talk-tab-font">
              <!--<a-icon type="clock-circle" />-->
              消息
            </span>
            <div class="talk-box-container">
              <div v-for="(item) in chatList" :key="item.id" @click="showChat(item)">
                <recent-contacts-item :contactsInfo="item" :activated="item.id === activeChat" style="background-color: white!important;"></recent-contacts-item>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" class="box-panel">
            <span slot="tab" class="talk-tab-font">
              <!--<a-icon type="team" />-->
              联系人
            </span>
            <contact-list/>
            <div class="talk-group-list-add-box" @click="openSearchWindow">
              <!--<img class="talk-group-list-add" src="@/assets/search.png" />-->
              <a-icon type="search" style="color:#5C95F6" />
              <span class="talk-group-list-add-font">搜索</span>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" class="box-panel">
            <span slot="tab" class="talk-tab-font">
              <!--<a-icon type="user" />-->
              群组
            </span>
            <div v-for="(item,index) in groupData" class="talk-group-list-item" :key="index">
              <img class="talk-group-list-head" :src="item.head" />
              <span class="talk-group-list-name" >{{ item.title }}</span>
            </div>
            <div class="talk-group-list-add-box" @click="openSearchWindow">
              <img class="talk-group-list-add" src="@/assets/add-group.png" />
              <span class="talk-group-list-add-font">添加群组</span>
            </div>
          </a-tab-pane>
        </a-tabs>
        <!--<div class="talk-foot-background">-->
        <!--<img class="talk-foot-search" src="@/assets/search.png" @click="openSearchWindow" />-->
        <!--<img class="talk-foot-add"src="@/assets/add.png" />-->
        <!--</div>-->
      </a-layout-sider>

      <a-layout style="z-index: 1">
        <!--<div v-show="isShowWelcome">-->
        <!--<div style="margin: 120px auto 0 auto;text-align: center;">-->
        <!--<a-icon type="rocket" theme="twoTone" twoToneColor="#52c41a" style="fontSize:108px" />-->
        <!--<p class="description">不要怂，一起上</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<a-layout>-->
        <!--<user-chat v-show="isShowPanel" :chat="currentChat" @showChat="showChat"/>-->
        <!--</a-layout>-->
        <member-model ref="model" @ok="handleSaveOk" @close="handleSaveClose"/>
      </a-layout>
      <a-modal
        class="discuss-block"
        title=""
        :visible="isShowPanel"
        @cancel="handleCancel"
        :mask="false"
        centered
        :footer="null"
        :closable="false"
      >
        <user-chat :chat="currentChat" @showChat="showChat"/>
      </a-modal>
    </a-layout>
  </div>
</template>
<script>
import UserChat from '@/components/Talk/Chat'
import ContactList from './ContactsList.vue'
import WebsocketHeartbeatJs from '../../utils/talk/WebsocketHeartbeatJs'
import MemberModel from '@/components/Talk/contacts/MemberBox'
import {
  ChatListUtils,
  Chat,
  imageLoad,
  MessageInfoType,
  MessageTargetType,
  timeoutFetch
} from '../../utils/talk/chatUtils'
import { ErrorType } from '@/utils/constants'
import {
  RecentContactsItem
} from '@/components/Talk'
import conf from '@/api/index'
import HttpApiUtils from '../../utils/talk/HttpApiUtils'
export default {
  name: 'MyChatPanel',
  components: {
    ContactList,
    UserChat,
    MemberModel,
    RecentContactsItem
  },
  data () {
    return {
      tabStyle: { marginBottom: '0px' },
      data: [],
      loading: false,
      busy: false,
      host: conf.getHostUrl(),
      isShowPanel: false,
      isShowWelcome: true,
      memberVisible: false,
      active: '',
      groupData: [
        {
          title: '旺仔研究群1',
          key: '0',
          head: require('@/assets/sjs.jpg')
        },
        {
          title: '旺仔研究群2',
          key: '1',
          head: require('@/assets/sjs.jpg')
        }
      ]
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
    closeMyChatPanel () {
      this.$parent.closeMyChatPanel()
    },
    openSearchWindow () {
      this.$parent.openSearchWindow()
    },
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
  props: {
    myChatPanelIsShow: Boolean
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
<style lang="less">
.talk-sider {
  flex-direction: column;
  background: #fff;
  height: 100%;
  border-right: 1px solid #ebebeb;
}
.talk-view {
  // height: calc(100% - 64px);
  height: 555px;
  /*width: 209px;*/
  // margin: -24px;
  box-shadow: -3px -1px 6px -3px #919191;
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
    background-color: white;
    height: 89%;
    border-top: 1px solid #ebebeb;
}
.talk-list{
  padding: 8px 12px 8px 12px;cursor: pointer;
}
.active {
   background: #e8e8e8;
  //  border: 1px solid #e8e8e8;
  //  color: #fff;
 }
.box-panel{
  /*height: calc(100% - 50px);*/
  height: 515px;
  background-color: white;
}
.description{
  margin-top: 24px;
  color: gray;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
}

  /*style created by cc*/
  .talk-account-info-board{
    background-color: #5C95F6;
    height: 88px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .talk-account-info-board-close{
    color: #FFFFFF;
    font-size: 9px;
    position: absolute;
    top: 9px;
    right: 9px;
  }
  .talk-account-info-board-head{
    height: 33px;
    width: 33px;
    border-radius: 15px;
    margin-left: 8px;
    margin-right: 13px;
  }
  .talk-account-info-board-online-icon{
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: #00FFCC;
    position: absolute;
    top: 26px;
    left: 38px;
  }
  .talk-account-info-board-name{
    color: #FFFFFF;
    font-size:12px
  }
  .talk-tab-font{
    font-size: 12px;
  }
  .talk-view .ant-tabs-nav .ant-tabs-tab:nth-child(-n+2){
    margin:0 55px 0 0!important;
  }
  .talk-view .ant-tabs-nav .ant-tabs-tab{
    padding: 10px 0 10px 0!important;
  }
  .talk-view .ant-tabs-ink-bar{
    width: 21px!important;
    height: 3px!important;
    left: 4px!important;
  }
  .talk-view .ant-tabs-nav-scroll{
    display: flex;
    justify-content: center;
  }
  .talk-view .ant-list-split .ant-list-item{
    background-color: #FFFFFF;
    border-bottom: 0!important;
  }
  .talk-view .ant-avatar{
    width: 29px!important;
    height: 29px!important;
  }
  .talk-view .ant-list-item-meta-title{
    font-size: 11px!important;
    margin-bottom: -3px!important;
  }
  .talk-view .ant-list-item-meta-description{
    font-size: 9px!important;
  }
  .talk-time{
    font-size: 9px;
    color: #919191;
  }
  .talk-view .ant-list-item-meta{
    align-items: center!important;
  }
  .talk-foot-background{
    background-color: #5C95F6;
    position:absolute;
    bottom: 0;
    width: 100%;
    height: 31px;
    display: flex;
    align-items: center;
  }
  .talk-foot-search{
    width: 13px;
    height: 13px;
    margin-left: 16px;
    margin-right: 25px;
  }
  .talk-foot-add{
    width: 13px;
    height: 13px;
  }
  .talk-group-list-head{
    width: 29px;
    height: 29px;
    border-radius: 50%;
  }
  .talk-group-list-name{
    font-size: 11px;
    margin-left: 11px;
  }
  .talk-group-list-item{
    padding: 13px 0px 0px 13px;
  }
  .talk-group-list-add{
    width: 13px;
    height: 13px;
    margin-right: 5px;
  }
  .talk-group-list-add-font{
    font-size: 11px;
    color: #5EA0FF;
    margin-left: 5px;
  }
  .talk-group-list-add-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
  }
  .discuss-block .ant-modal-body{
    padding: 0!important;
  }
  .discuss-block .ant-layout-content {
    height: 300px;
  }
  .panel-block .ant-modal-header{
    background-color:#f2f3f5!important;
  }

  .panel-block .ant-modal-title{
    color: #40a9ff!important;
  }

  .panel-block .ant-modal-close-x{
    color: #40a9ff!important;
    background-color:#f2f3f5!important;
  }

  .panel-block-mask{
    width: 38.8%;
    height: 76.7%;
    position: fixed;
    left: 488px;
    top: 125px;
  }
</style>
