<template>
  <a-layout v-if="chat.name" class="talk-setting" id="talkSetting">
    <talk-setting ref="model" :talk="talkId"/>
    <a-layout-header class="talk-header" v-if="chat">
      <a-row type="flex" align="middle" style="height: 50px">
        <a-col :span="1">
          <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">{{ chat.name }}</a-avatar>
        </a-col>
        <a-col :span="3">
          <div class="talk-info">
            <div class="talk-name">
              {{ chat.name }}
            </div>
          </div>
        </a-col>
        <a-col :span="20"><div class="header-toolbat">
          <div class="message-box-toolbar">
            <ul class="toolbar-right">
              <li class="tool-element">
                <a-tooltip placement="bottom" >
                  <template slot="title">
                    <span>群公告</span>
                  </template>
                  <a-icon type="sound" theme="twoTone" :style="{ fontSize: '18px' }"/>
                </a-tooltip>
              </li>
              <li class="tool-element">
                <a-tooltip placement="bottom" >
                  <template slot="title">
                    <span>文件</span>
                  </template>
                  <a-icon type="folder" theme="twoTone" :style="{ fontSize: '18px' }"/>
                </a-tooltip>
              </li>
              <li class="tool-element">
                <a-tooltip placement="bottom" >
                  <template slot="title">
                    <span>标记信息</span>
                  </template>
                  <a-icon type="star" theme="twoTone" :style="{ fontSize: '18px' }" />
                </a-tooltip>
              </li>
              <li class="tool-element">
                <a-tooltip placement="bottom" >
                  <template slot="title">
                    <span>研讨记录</span>
                  </template>
                  <a-icon type="profile" theme="twoTone" :style="{ fontSize: '18px' }" />
                </a-tooltip>
              </li>
              <li class="tool-element">
                <a-tooltip placement="bottomLeft" >
                  <template slot="title">
                    <span>研讨设置</span>
                  </template>
                  <a-icon type="setting" theme="twoTone" :style="{ fontSize: '18px' }" @click="$refs.model.showSetting(talkId)"/>
                </a-tooltip>
              </li>
            </ul>
          </div>
        </div></a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content class="talk-content">
      <div
        class="talk-main-box"
        v-infinite-scroll="handleInfiniteOnLoad"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10">
        <ul v-if="messageList">
          <li v-for="item in messageList" :key="item">
            <p class="time">
              <span>{{ item.date | time }}</span>
            </p>
            <div class="main" :class="{ self: item.self }">
              <img class="avatar" width="30" height="30" :src="item.self ? user.img : session.user.img" />
              <div class="text">{{ item.content }}</div>
            </div>
          </li>
        </ul>
      </div>
    </a-layout-content>
    <a-layout-footer class="talk-footer message-box">
      <div class="message-box-toolbar">
        <ul class="toolbar-left">
          <li class="tool-element">
            <a-tooltip placement="topLeft" >
              <template slot="title">
                <span>添加表情</span>
              </template>
              <a-popover trigger="click">
                <template slot="content">
                  <VEmojiPicker
                    :pack="emojisNative"
                    labelSearch=""
                    @select="onSelectEmoji"
                  />
                </template>
                <a-icon type="smile" :style="{ fontSize: '21px' }"/>
              </a-popover>
            </a-tooltip>
          </li>
          <li class="tool-element">
            <a-tooltip placement="top" >
              <template slot="title">
                <span>字体加粗</span>
              </template>
              <a-icon type="bold" :style="{ fontSize: '21px' }"/>
            </a-tooltip>
          </li>
          <li class="tool-element">
            <a-tooltip placement="top" >
              <template slot="title">
                <span>字体大小</span>
              </template>
              <a-icon type="font-size" :style="{ fontSize: '21px' }"/>
            </a-tooltip>
          </li>
          <li class="tool-element">
            <a-tooltip placement="top" >
              <template slot="title">
                <span>文字序列</span>
              </template>
              <a-icon type="ordered-list" :style="{ fontSize: '21px' }"/>
            </a-tooltip>
          </li>
        </ul>
        <ul class="toolbar-right">
          <li class="tool-element">
            <a-tooltip placement="top" >
              <template slot="title">
                <span>网盘资源</span>
              </template>
              <a-icon type="cloud" :style="{ fontSize: '21px' }"/>
            </a-tooltip>
          </li>
          <li class="tool-element">
            <a-tooltip placement="top" >
              <template slot="title">
                <span>文件上传</span>
              </template>
              <a-icon type="paper-clip" :style="{ fontSize: '21px' }" />
            </a-tooltip>
          </li>
          <li class="tool-element">
            <a-tooltip placement="top" >
              <template slot="title">
                <span>发送名片到当前研讨中</span>
              </template>
              <a-icon type="idcard" :style="{ fontSize: '21px' }" />
            </a-tooltip>
          </li>
          <li class="tool-element">
            <a-dropdown placement="topRight">
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a-icon type="bar-chart" />
                  投票
                </a-menu-item>
                <a-menu-item key="2">
                  <a-icon type="table" />
                  填表
                </a-menu-item>
                <a-menu-item key="3">
                  <a-icon type="calendar" />
                  发起会议
                </a-menu-item>
              </a-menu>
              <a-icon type="appstore" :style="{ fontSize: '21px' }" />
            </a-dropdown>
          </li>
        </ul>
      </div>
      <div class="message-composer">
        <div class="draft-input">
          <textarea size="large" class="textarea-input" v-model="messageContent" @keyup.enter="mineSend()" placeholder="开始研讨..."></textarea>
          <div class="send-toolbar">
            <div style="margin-left: auto">
              <a-tooltip placement="top" >
                <template slot="title">
                  <span><p>Enter 标记为<strong>非密</strong>发送 ,</p>
                    <p>Shift+Enter 标记为<strong>秘密</strong>发送 ,</p>
                    <p>Alt+Enter 标记为<strong>机密</strong>发送 ,</p>
                    <p>Ctrl+Enter 换行</p></span>
                </template>
                <a-icon type="question-circle" style="margin-right: 6px; cursor: pointer;"/>
              </a-tooltip>
              <!-- <span class="user-guide" style="margin-left: auto">Enter 发送 ,Shift+Enter 标记为秘密发送 ,Alt+Enter 标记为机密发送 ,Ctrl+Enter 换行</span> -->
              <a-dropdown-button @click="mineSend()" type="primary">
                发送(<strong>非密</strong>)
                <a-menu slot="overlay">
                  <a-menu-item key="1">标记为<strong>秘密</strong>并发送</a-menu-item>
                  <a-menu-item key="2">标记为<strong>机密</strong>并发送</a-menu-item>
                </a-menu>
              </a-dropdown-button>
            </div>
          </div>
        </div>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import conf from '@/api/index'
import Faces from './Face.vue'
import TalkSetting from './setting/TalkSetting'
import { fetchPost, imageLoad, transform, ChatListUtils } from '../../utils/talk/chatUtils'
import infiniteScroll from 'vue-infinite-scroll'
import VEmojiPicker from 'v-emoji-picker'
import packData from 'v-emoji-picker/data/emojis.json'

export default {
  components: {
    VEmojiPicker,
    Faces,
    TalkSetting
  },
  name: 'UserChat',
  computed: {
    emojisNative () {
      return packData
    },
    messageList: {
      get: function () {
        return this.$store.state.chat.messageList
      },
      set: function (messageList) {
        this.$store.commit('SET_MESSAGE_LIST', messageList)
      }
    },
    talkId: {
      get: function () {
        return this.chat.id
      }
    }
  },
  data () {
    return {
      facesVisible: false,
      pack: packData,

      wrapClass: 'talk-setting',
      wrapId: 'talkSetting',
      host: conf.getHostUrl(),
      count: 0,
      pageSize: 20,
      modal: false,
      showHistory: false,
      loading: false,
      busy: false,
      hisMessageList: [],
      // 保存各个研讨记录的map
      messageListMap: new Map(),
      messageContent: '',
      showFace: false,
      userList: [],
      imgFormat: ['jpg', 'jpeg', 'png', 'gif'],
      fileFormat: ['doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'xls', 'xlsx', 'pdf', 'gif', 'exe', 'msi', 'swf', 'sql', 'apk', 'psd'],
      // tokenImg: {
      //   access_token: Vue.ls.get('Access-Token'),
      //   type: 'image'
      // },
      // tokenFile: {
      //   access_token: localStorage.getItem('Access-Token'),
      //   type: 'file'
      // },
      action: conf.getHostUrl() + '/api/upload',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  props: {
    chat: {
      type: Object,
      default: function () {
        return { message: '没东西' }
      }
    }
  },
  methods: {
    onSelectEmoji (dataEmoji) {
      this.messageContent += dataEmoji.emoji
    },
    showSetting () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    showChat (user) {
      const self = this
      if (user.id !== self.$store.state.user.info.id) {
        const chat = ChatListUtils.resetChatList(self, user, conf.getHostUrl())
        self.$store.commit('SET_CURRENT_CHAT', chat)
      } else {
        self.$Message.warning('不能给自己说话哦')
      }
    },
    showUser: function () {},
    beforeUpload () {
      this.tokenImg = {
        // access_token: localStorage.getItem('Access-Token'),
        type: 'image'
      }
      this.tokenFile = {
        // access_token: localStorage.getItem('Access-Token'),
        type: 'file'
      }
      return new Promise(resolve => {
        this.$nextTick(function () {
          resolve(true)
        })
      })
    },
    handleInfiniteOnLoad () {
      const hisMessageList = this.hisMessageList
      this.loading = true
      if (hisMessageList.length > 14) {
        this.$message.warning('没有了')
        this.busy = true
        this.loading = false
        return
      }
      this.fetchData(res => {
        this.hisMessageList = hisMessageList.concat(res.results)
        this.loading = false
      })
    },
    // 错误提示
    openMessage (error) {
      this.$Message.error(error)
    },
    showFaceBox: function () {
      this.showFace = !this.showFace
    },
    insertFace: function (item) {
      this.messageContent = this.messageContent + 'face' + item
      this.showFace = false
    },
    handleStart () {
      this.$Loading.start()
    },
    handleFormatError (file) {
      this.$Message.warning('文件 ' + file.name + ' 格式不正确。')
    },
    handleImgMaxSize (file) {
      this.$Message.warning('图片 ' + file.name + ' 太大，不能超过 512K！')
    },
    handleFileMaxSize (file) {
      this.$Message.warning('文件 ' + file.name + ' 太大，不能超过 10M！')
    },
    handleSuccess (res, file) {
      const self = this
      if (res.msg === 'success') {
        const path = res.filePath
        const fileName = file.name
        // 文件后缀
        const suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
        // 文件
        if (self.imgFormat.indexOf(suffix) === -1) {
          this.messageContent = this.messageContent + 'file(' + path + ')[' + fileName + ']'
        } else { // 图片
          this.messageContent = this.messageContent + 'img[' + path + ']'
        }
        this.$Loading.finish()
      } else {
        this.$Message.error('文件上传错误，请重试')
      }
    },
    handleError: function () {
      this.$Loading.finish()
      this.$Message.error('上传错误！')
    },
    // 本人发送信息
    mineSend () {
      const self = this
      const currentUser = self.$store.state.user
      const time = new Date().getTime()
      const content = self.messageContent
      if (content !== '' && content !== '\n') {
        if (content.length > 2000) {
          self.openMessage('不能超过2000个字符')
        } else {
          const currentMessage = {
            mine: true, // 当前用户
            avatar: currentUser.avatar, // 当前用户头像
            username: currentUser.name, // 当前用户名称
            timestamp: time, // 时间
            content: self.messageContent, // 研讨内容
            toid: self.chat.id, // 消息目的id
            fromid: currentUser.id, // 消息来源id
            id: self.chat.id, // 当前研讨间id
            type: self.chat.type, // 消息类型
            code: self.chat.code, // 消息编码
            secret: self.chat.secret, // 消息密级
            status: self.chat.status // 消息状态 已读未读
          }
          self.send(currentMessage)
        }
      }
    },
    // 发送消息的基础方法
    send (message) {
      const self = this
      self.$store.commit('SEND_MESSAGE', message)
      message.timestamp = self.formatDateTime(new Date(message.timestamp))
      self.$store.commit('ADD_MESSAGE', message)
      self.messageContent = ''
      // 每次滚动到最底部
      self.$nextTick(() => {
        // imageLoad('message-box')
      })
    },
    getHistoryMessage (pageNo) {
      const self = this
      self.showHistory = true
      if (!pageNo) {
        pageNo = 1
      }
      const param = new FormData()
      param.set('chatId', self.chat.id)
      param.set('chatType', self.chat.type)
      param.set('fromId', self.$store.state.user.id)
      param.set('pageNo', pageNo)
      fetchPost(
        conf.getHisUrl(),
        param,
        function (json) {
          const list = json.messageList.map(function (element) {
            element.content = transform(element.content)
            return element
          })
          const tempList = list.map(function (message) {
            message.timestamp = self.formatDateTime(new Date(message.timestamp))
            return message
          })
          self.hisMessageList = tempList.reverse()
          self.count = json.count
          self.pageSize = json.pageSize
          // 每次滚动到最底部
          self.$nextTick(() => {
            imageLoad('his-chat-message')
          })
        },
        self
      )
    }
  },
  watch: {
    // 监听每次 user 的变化
    chat: function () {
      const self = this
      self.messageList = []
      // 从内存中取研讨信息
      const cacheMessages = self.$store.state.chat.messageListMap.get(self.chat.id)
      if (cacheMessages) {
        self.messageList = cacheMessages
      }
      // 每次滚动到最底部
      this.$nextTick(() => {
        imageLoad('message-box')
      })
      if (self.chat.type === '1') {
        const param = new FormData()
        param.set('chatId', self.chat.id)
        fetchPost(
          conf.getChatUsersUrl(),
          param,
          function (json) {
            self.userList = json
          },
          self
        )
      }
    }
  },
  mounted: function () {
    // 每次滚动到最底部
    this.$nextTick(() => {
      imageLoad('message-box')
    })
  },
  directives: { infiniteScroll }
  // directives: {
  //   // 发送消息后滚动到底部
  //   'scroll-bottom' () {
  //     this.$nextTick(() => {
  //       this.el.scrollTop = this.el.scrollHeight - this.el.clientHeight
  //     })
  //   }
  // }
}
</script>
<style lang="less" scoped>
.talk-header{
    width: 100%;
    height: 50px;
    z-index: 100;
    position: relative;
    border-bottom: 1px solid #ebebeb;
    background-color: #FFFFFF;
    padding: 0 12px 0 12px;
    align-items: center!important;
    background: #fff;
    height: 50px;
    line-height: 0px;
    border-bottom: 1px solid #ebebeb;
    .header-content{
      height: 100%;
       display: -moz-box;/*兼容Firefox*/
      display: -webkit-box;/*兼容FSafari、Chrome*/
       -moz-box-align: center;/*兼容Firefox*/
      -webkit-box-align: center;/*兼容FSafari、Chrome */
    }
    .talk-info{
      flex: 1;
      margin-left: 9px;
      max-width: 100%;
      overflow: hidden!important;
      text-overflow: ellipsis!important;
      word-wrap: normal!important;
      .talk-name{
        color: #404040;
        margin: 0;
        cursor: pointer;
        overflow: hidden !important;
        font-size: 14px;
        max-width: 100%;
        word-wrap: normal !important;
        font-weight: 600;
        line-height: 1.1;
        user-select: text;
        white-space: nowrap !important;
        margin-bottom: 6px;
        text-overflow: ellipsis !important;
      }
    }
}
.header-toolbar{
  margin-left: auto;
}
.talk-content{
    display: flex;
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    background-color: #f7f7f7;
}
.talk-main-box{
  position: relative;
  overflow: auto;
  flex-grow: 1;
  overflow-x: hidden;
}
.talk-footer{
  flex: none;
  position: relative;
  flex-shrink: 0;
  background-color: #fff;
}
.message-box{
  padding: 6px 12px;
  display: flex;
  position: relative;
  border-top: 1px solid #ebebeb;
  flex-direction: column;
  background-color: #FFFFFF;
}
.im-talk{
  height: 100%
}
.message-box-toolbar{
  position: relative;
  display: flex;
  .toolbar-left{
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    margin-left: -7px;
    margin-right: auto;
  }
  .toolbar-right{
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    margin-left: auto;
    margin-right: -7px;
  }
}
.tool-element{
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 2px;
  border-radius: 50%;
  justify-content: center;
}
.message-composer{
  display: flex;
  flex-direction: column;
  .draft-input{
    flex: 1 0 auto;
    width: 100%;
    display: flex;
    min-height: 84px;
    max-height: 204px;
    line-height: 24px;
    flex-direction: column;
    cursor: text;
    position: relative;
    .textarea-input{
      max-height: 204px;
      height:84px;
      width:100%;
      resize:none;
      outline:none;
      border: none;
    }
    .send-toolbar{
          height: 24px;
    display: flex;
    align-items: flex-end;
    }
  }
  .user-guide {
    font-size: 12px;
    color: #bdbebf;
}
.talk-setting{
position: relative;
}
    .faces-box {
      position: absolute;
      bottom: 3.8rem;
    }
}
</style>
