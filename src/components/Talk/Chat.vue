<template>
  <a-layout v-if="chat.name" id="talkSetting" class="conv-box">

    <!-- <talk-setting ref="model" :talk="talkId"/> -->

    <a-layout-header class="conv-box-header">
      <a-row type="flex" justify="space-between">
        <a-col :span="14" class="conv-title">
          <!-- 需要对名字的字数做限制 -->
          <span>一二三四五二二三四五三二三四五四二三四五五</span>
          <!-- 若为群组时显示成员数量 -->
          <span>(417)</span>
        </a-col>

        <a-col :span="10" class="conv-option">
          <div style="float: right">
            <!-- 需要判断是否为群聊，操作选项不同 -->
            <a-tooltip
              v-for="(item, index) in optionList"
              :key="index"
              placement="bottom"
              :overlayStyle="{fontSize: '12px'}"
            >
              <template slot="title">
                <span>{{ item.message }}</span>
              </template>
              <a-icon style="marginLeft: 20px" :type="item.type" />
            </a-tooltip>
          </div>
        </a-col>
      </a-row>
    </a-layout-header>

    <a-layout-content class="conv-box-message">
      <div
        class="talk-main-box"
        v-infinite-scroll="handleInfiniteOnLoad"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="10">
        <div v-if="messageList" class="talk-main">
          <div v-for="item in messageList" :key="item" class="talk-item" @mouseenter="talkItemEnter" @mouseleave="talkItemLeave">
            <div class="item-avatar" :class="{ me: item.isself }">
              <a-avatar shape="square" size="large" style="color: #f56a00; backgroundColor: #fde3cf">{{ item.username }}</a-avatar>
            </div>
            <div class="say" :class="{ reply: item.isself }">
              <div class="text">{{ item.content }}</div>
            </div>
            <div v-show="activeItemHandle" style="float: right; marginTop: 0px">
              <a-button-group size="small">
                <a-button>标记</a-button>
                <a-button>回复</a-button>
                <a-button>转发</a-button>
                <a-button>撤回</a-button>
                <a-button>删除</a-button>
              </a-button-group>
            </div>
          </div>
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
            size="large"
            class="textarea-input"
            v-model="messageContent"
            @keyup.enter="mineSend()"
            placeholder="开始研讨..."
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
  props: {
    chat: {
      type: Object,
      default: function () {
        return { message: '没东西' }
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
      },
      optionList: [
        {
          message: '群公告',
          type: 'notification'
        }, {
          message: '标记信息',
          type: 'tags'
        }, {
          message: '聊天内容',
          type: 'file-text'
        }, {
          message: '文件',
          type: 'folder-open'
        }, {
          message: '更多',
          type: 'ellipsis'
        }
      ]
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
        return this.chat.id
      }
    }
  },
  mounted: function () {
    // 每次滚动到最底部
    this.$nextTick(() => {
      imageLoad('message-box')
    })
    console.log('this.chat', this.chat)
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
      // if (typeof date === 'string') {
      //   date = new Date(date)
      // }
      date = new Date(date)
      return date.getHours() + ':' + date.getMinutes()
    }
  },
  methods: {
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
            toid: self.chat.id, // 消息目的id
            fromid: currentUser.id, // 消息来源id
            id: self.chat.id, // 当前研讨间id
            type: self.chat.type, // 消息类型
            code: self.chat.code, // 消息编码
            secret: self.chat.secret, // 消息密级
            status: self.chat.status, // 消息状态 已读未读
            isself: true
          }
          self.send(currentMessage)
        }
      }
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
      height: 48px;
      width: 100%;

      line-height: 48px;
      padding: 0 20px;
      background-color: #f2f3f5;
      border-bottom: 1px solid #dcdee0;

      .conv-title {
        color: black;
        font-size: 16px;
        font-weight: 500;

        :nth-child(2) {
          letter-spacing: -2px;
        }
      }

      .conv-option {
        font-size: 16px;

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
      // background-color: #f2f3f5;

      .talk-main-box {
        position: relative;
        flex-grow: 1;
        overflow: hidden;
        // background-color: #f2f3f5;
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
          overflow-x: hidden;
          overflow-y: auto;
          .talk-item{
            display: flex;
            flex-direction: row-reverse;
            margin-top: 20px;
            margin-bottom: 22px;
            .item-avatar{
              float: left;
              margin-left: 0;
              margin-right: 7px;
              cursor: pointer;
            }
            .item-avatar.me {
              float: right;
              margin-right: 0;
              margin-left: 7px;
              cursor: pointer;
            }
            .say {
                color: #212121;
                background: rgba(207 , 232, 252, 0.84);
                padding: 8px 16px;
                border-radius: 1px 18px 18px 18px;
                font-weight: 400;
                text-transform: none;
                text-align: left;
                font-size: 16px;
                letter-spacing: .5px;
                margin: 0 0 2px 0;
                max-width: 65%;
                float: none;
                clear: both;
                line-height: 1.5em;
                word-break: break-word;
                transform-origin: left top;
                transition: all 200ms;
                box-sizing: content-box;
                // border: 1px solid rgb(182, 182, 182);
                box-shadow: 1px 1px 1px #c2c2c2;
            }
            .reply {
                color: #212121;
                background: rgba(255, 255, 255, 0.84);
                padding: 8px 16px !important;
                border-radius: 18px 1px 18px 18px;
                font-weight: 400;
                text-transform: none;
                text-align: left;
                font-size: 16px;
                letter-spacing: .5px;
                margin: 0 0 2px 0 !important;
                max-width: 65%;
                float: right;
                position: relative;
                transform-origin: right top;
                margin: 8px 0 10px;
                padding: 0;
                max-width: 65%;
                // border: 1px solid red;
                box-shadow: -1px 1px 1px #c2c2c2;
            }
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
          height: 135px;
          flex-direction: column;
          cursor: text;
          // 输入框
          .textarea-input{
            height: 95px;
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
