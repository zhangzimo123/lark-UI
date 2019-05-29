<template>
  <a-layout v-if="Object.keys(chatInfo).length" class="conv-box">

    <!-- 聊天设置选项的抽屉组件 -->
    <talk-history :activeOption="activeOption" @closeDrawer="triggerDrawer"></talk-history>

    <a-layout-header class="conv-box-header">
      <a-row type="flex" justify="space-between">
        <a-col :span="14" class="conv-title">
          <!-- 需要对名字的字数做限制 -->
          <span>{{ chatInfo.name }}</span>
          <!-- 若为群组时显示成员数量 -->
          <span v-show="chatInfo.isGroup">( {{ chatInfo.memberNum }} )</span>
          <!-- 显示密级 -->
          <span>【{{ chatInfo.secretLevel | fileSecret }}】</span>
        </a-col>

        <a-col :span="10" class="conv-option">
          <div v-if="!isPopup" style="float: right">
            <!-- 需要判断是否为群聊，操作选项不同 -->
            <a-tooltip
              v-for="(item, index) in optionFilter(chatInfo.isGroup)"
              :key="index"
              placement="bottom"
              :overlayStyle="{fontSize: '12px'}"
            >
              <template slot="title">
                <span>{{ item.message }}</span>
              </template>
              <!-- <a-icon @click="openDrawer(item.name)" style="marginLeft: 20px" :type="item.type" /> -->
              <a-icon @click="triggerDrawer(item.name)" style="marginLeft: 20px" :type="item.type" />
            </a-tooltip>
          </div>
        </a-col>
      </a-row>
    </a-layout-header>

    <a-layout-content class="conv-box-message">

      <div class="talk-main-box">
        <div v-if="messageList.length" class="talk-main">
          <div v-for="(item, index) in messageList" :key="index" class="talk-item" @mouseenter="talkItemEnter" @mouseleave="talkItemLeave">
            <message-piece :messageInfo="item"></message-piece>
          </div>
        </div>

        <div v-else class="talk-main">
          <p class="empty-tip">暂时没有消息</p>
        </div>
      </div>

    </a-layout-content>

    <a-layout-footer class="conv-box-editor">

      <div class="editor-option">
        <a-row type="flex" justify="space-between" class="editor-option-container">
          <a-col :span="12">
            <!-- 文字编辑选项 -->
            <a-tooltip
              placement="top"
              :overlayStyle="{fontSize: '12px'}"
            >
              <template slot="title">
                <span>表情</span>
              </template>
              <a-icon style="marginRight: 20px" type="smile" />
            </a-tooltip>
          </a-col>

          <a-col :span="12">
            <div style="float: right">
              <!-- 发送选项 -->
              <a-tooltip
                placement="top"
                :overlayStyle="{fontSize: '12px'}"
              >
                <template slot="title">
                  <span>文件上传</span>
                </template>
                <a-icon style="marginLeft: 20px" type="folder" />
              </a-tooltip>
            </div>
          </a-col>
        </a-row>
      </div>

      <div class="editor-area">
        <div class="draft-input">
          <!-- 输入框 -->
          <textarea
            v-focus
            size="large"
            class="textarea-input"
            v-model="messageContent"
            @keyup.enter="mineSend()"
          ></textarea>
          <!-- 发送键 -->
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

  <a-layout v-else style="height: 100%; textAlign: center;">
    <div class="unselected-tip">
      <a-icon type="message" style="fontSize: 140px; color: #d7d9db" />
      <p>未选择聊天</p>
    </div>
  </a-layout>
</template>

<script>
import conf from '@/api/index'
import Faces from './Face.vue'
import { TalkHistory } from '@/components/Talk'
import MessagePiece from './MessagePiece'
import { fetchPost, imageLoad, transform, ChatListUtils } from '../../utils/talk/chatUtils'
import VEmojiPicker from 'v-emoji-picker'
import packData from 'v-emoji-picker/data/emojis.json'
// 引入密级常量
import { mixinSecret } from '@/utils/mixin'

export default {
  components: {
    VEmojiPicker,
    Faces,
    MessagePiece,
    TalkHistory
  },
  name: 'UserChat',
  props: {
    /** 聊天对话框的基本信息 */
    chatInfo: {
      type: Object,
      default: () => ({})
    },
    /** 是否为弹框式的聊天窗口 */
    isPopup: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  mixins: [ mixinSecret ],
  data () {
    return {
      // 被激活的抽屉
      activeOption: '',
      facesVisible: false,
      pack: packData,
      visible: false,
      wrapClass: 'talk-setting',
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
      activeItemHandle: false,
      // userList: [],
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
  watch: {
    // 监听每次 user 的变化
    chatInfo: function () {
      const self = this
      self.messageList = []
      // 从内存中取研讨信息
      const cacheMessages = self.$store.state.chat.messageListMap.get(self.chatInfo.id)
      if (cacheMessages) {
        self.messageList = cacheMessages
      }
      // 每次滚动到最底部
      this.$nextTick(() => {
        imageLoad('conv-box-editor')
      })
      // if (self.chat.type === '1') {
      //   const param = new FormData()
      //   param.set('chatId', self.chat.id)
      //   fetchPost(
      //     conf.getChatUsersUrl(),
      //     param,
      //     function (json) {
      //       self.userList = json
      //     },
      //     self
      //   )
      // }
      // 滚动到最新一条消息
      this.scrollToBottom()
    }
  },
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
        return this.chatInfo.id
      }
    }
  },
  mounted () {
    // 页面创建时，消息滚动到最近一条
    this.scrollToBottom()

    // 每次滚动到最底部
    this.$nextTick(() => {
      imageLoad('conv-box-editor')
    })
    console.log('this.chatInfo', this.chatInfo)
  },
  updated () {
  },
  filters: {
    // 将日期过滤为 hour:minutes
    // time (date) {
    // if (typeof date === 'string') {
    //   date = new Date(date)
    // }
    // date = new Date(date)
    // return date.getHours() + ':' + date.getMinutes()
    // }
  },
  methods: {
    /**
     * 聊天消息滚到到最新一条
     * 1. 发送消息 2. 页面创建 3.页面更新
     * @author jihainan
     */
    scrollToBottom () {
      this.$nextTick(() => {
        const msgContr = this.$el.querySelector('.talk-main-box')
        if (msgContr) {
          msgContr.scrollTop = msgContr.scrollHeight
        }
      })
    },
    /**
     * 通过isGroup属性过滤聊天选项
     * @author jihainan
     */
    optionFilter (isGroup) {
      // 聊天操作选项
      const optionList = [
        { group: true, name: 'groupNotice', message: '群公告', type: 'notification' },
        { group: true, name: 'markMessage', message: '标记信息', type: 'tags' },
        { group: false, name: 'talkHistory', message: '聊天内容', type: 'file-text' },
        { group: false, name: 'talkFile', message: '文件', type: 'folder-open' },
        { group: false, name: 'moreInfo', message: '更多', type: 'ellipsis' }]
      return isGroup ? optionList : optionList.filter(item => !item.group)
    },
    /**
     * 根据drawerName打开对应的抽屉
     * @author jihainan
     */
    triggerDrawer (drawerName) {
      this.activeOption = drawerName
    },
    talkItemEnter () {
      this.activeItemHandle = true
    },
    talkItemLeave () {
      this.activeItemHandle = false
    },
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
    // handleInfiniteOnLoad () {
    //   const hisMessageList = this.hisMessageList
    //   this.loading = true
    //   if (hisMessageList.length > 14) {
    //     this.$message.warning('没有了')
    //     this.busy = true
    //     this.loading = false
    //     return
    //   }
    //   this.fetchData(res => {
    //     this.hisMessageList = hisMessageList.concat(res.results)
    //     this.loading = false
    //   })
    // },
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
      // const time = new Date().getTime()
      const content = self.messageContent
      if (content !== '' && content !== '\n') {
        if (content.length > 2000) {
          self.openMessage('不能超过2000个字符')
        } else {
          const currentMessage = {
            mine: true, // 当前用户
            avatar: currentUser.avatar, // 当前用户头像
            username: currentUser.name, // 当前用户名称
            time: new Date(), // 时间
            content: self.messageContent, // 研讨内容
            toid: self.chatInfo.id, // 消息目的id
            fromid: currentUser.id, // 消息来源id
            id: self.chatInfo.id, // 当前研讨间id
            type: self.chatInfo.type, // 消息类型
            code: self.chatInfo.code, // 消息编码
            secret: self.chatInfo.secret, // 消息密级
            status: self.chatInfo.status, // 消息状态 已读未读
            isself: true
          }
          self.send(currentMessage)
        }
      }
      this.scrollToBottom()
    },
    // 发送消息的基础方法
    send (message) {
      const self = this
      // self.$store.commit('SEND_MESSAGE', message)
      // message.timestamp = self.formatDateTime(new Date(message.timestamp))
      self.$store.commit('ADD_MESSAGE', message)
      self.messageContent = ''
      // 每次滚动到最底部
      self.$nextTick(() => {
        // imageLoad('conv-box-editor')
      })
    },
    getHistoryMessage (pageNo) {
      const self = this
      self.showHistory = true
      if (!pageNo) {
        pageNo = 1
      }
      const param = new FormData()
      param.set('chatId', self.chatInfo.id)
      param.set('chatType', self.chatInfo.type)
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
  directives: {
    // 使元素获得焦点
    'focus': (el) => {
      el.focus()
    }
  }
}
</script>
<style lang="less" scoped>

  .unselected-tip {
    padding-top: 20%;
    color: #a5a7a9;
    font-size: 16px;
  }

  .conv-box {
    height: 100%;

    // 头部区域
    &-header {
      position: relative;
      top: 0;
      height: 55px;
      width: 100%;

      line-height: 55px;
      padding: 0 20px;
      background-color: #f2f3f5;
      border-bottom: 1px solid #dcdee0;

      .conv-title {
        color: black;
        font-size: 16px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        :nth-child(2) {
          letter-spacing: -2px;
        }
        :nth-child(3) {
          color: #708090;
          font-size: 14px;
        }
      }

      .conv-option {
        font-size: 18px;

        .anticon:hover {
          color: #1890ff;
        }
      }
    }
    // 消息展示区域
    &-message {
      display: flex;
      position: relative;
      overflow: hidden;
      flex-grow: 1;

      .talk-main-box {
        position: relative;
        flex-grow: 1;
        overflow: hidden;
        &:hover {
          overflow: overlay;
        }

        .talk-main{
          position: absolute;
          box-sizing: border-box;
          min-height: 100%;
          min-width: 360px;
          width: 100%;
          padding: 4px 16px 16px;
          background: rgba(255, 255, 255, 0);
          overflow: hidden;
          .talk-item{
            display: flex;
            flex-direction: row-reverse;
            // margin-top: 20px;
            // margin-bottom: 22px;
            // .item-avatar{
            //   float: left;
            //   margin-left: 0;
            //   margin-right: 7px;
            //   cursor: pointer;
            // }
            // .item-avatar.me {
            //   float: right;
            //   margin-right: 0;
            //   margin-left: 7px;
            //   cursor: pointer;
            // }
            // .say {
            //     color: #212121;
            //     background: rgba(207 , 232, 252, 0.84);
            //     padding: 8px 16px;
            //     border-radius: 1px 18px 18px 18px;
            //     font-weight: 400;
            //     text-transform: none;
            //     text-align: left;
            //     font-size: 16px;
            //     letter-spacing: .5px;
            //     margin: 0 0 2px 0;
            //     max-width: 65%;
            //     float: none;
            //     clear: both;
            //     line-height: 1.5em;
            //     word-break: break-word;
            //     transform-origin: left top;
            //     transition: all 200ms;
            //     box-sizing: content-box;
            //     // border: 1px solid rgb(182, 182, 182);
            //     box-shadow: 1px 1px 1px #c2c2c2;
            // }
            // .reply {
            //     color: #212121;
            //     background: rgba(255, 255, 255, 0.84);
            //     padding: 8px 16px !important;
            //     border-radius: 18px 1px 18px 18px;
            //     font-weight: 400;
            //     text-transform: none;
            //     text-align: left;
            //     font-size: 16px;
            //     letter-spacing: .5px;
            //     margin: 0 0 2px 0 !important;
            //     max-width: 65%;
            //     float: right;
            //     position: relative;
            //     transform-origin: right top;
            //     margin: 8px 0 10px;
            //     padding: 0;
            //     max-width: 65%;
            //     // border: 1px solid red;
            //     box-shadow: -1px 1px 1px #c2c2c2;
            // }
          }

          .empty-tip {
            text-align: center;
            margin-top: 130px;
            color: #ccc;
            font-size: 13px;
          }
        }
      }
    }
    // 文字编辑区域
    &-editor {
      flex-shrink: 0;
      background-color: #fff;
      display: flex;
      padding: 0;
      border-top: 1px solid #dcdee0;
      flex-direction: column;
      // 编辑器选项
      .editor-option {
        display: flex;
        height: 40px;
        line-height: 32px;
        padding: 4px 20px;

        &-container {
          width: 100%;
          font-size: 20px;
        }
      }
      // 文字编辑区域
      .editor-area {
        padding: 0 20px 5px;
        display: flex;
        flex-direction: column;

        .draft-input{
          flex: 1 0 auto;
          width: 100%;
          display: flex;
          height: 140px;
          flex-direction: column;
          cursor: text;
          // 输入框
          .textarea-input{
            height: 100px;
            width: 100%;
            line-height: 20px;
            color: black;
            resize: none;
            outline: none;
            border: none;
          }
          // 发送键
          .send-toolbar{
            margin: 4px 0;
            display: flex;
            align-items: flex-end;
        }
      }

      .user-guide {
        font-size: 12px;
        color: #bdbebf;
      }
      .faces-box {
        position: absolute;
        bottom: 3.8rem;
      }
    }
    }
  }

</style>
