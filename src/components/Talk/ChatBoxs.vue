<template>
  <div
    class="demo-infinite-container"
    v-infinite-scroll="handleInfiniteOnLoad"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :dataSource="chatBoxs">
      <a-list-item slot="renderItem" slot-scope="item" style="padding: 12px" @click="showChat(item)">
        <a-list-item-meta :description="item.last" class="talk-item">
          <a slot="title" :href="item.href">{{ item.name }}</a>
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
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import { Chat, ChatListUtils, MessageTargetType } from '../../utils/talk/chatUtils'
import conf from '../../utils/talk/conf'
export default {
  directives: { infiniteScroll },
  name: 'ChatBoxs',
  data () {
    return {
      data: [],
      loading: false,
      busy: false
    }
  },
  beforeMount () {
    this.fetchData(res => {
      console.log('这地方')
      console.log(res.result.data)
      this.data = res.result.data
    })
  },
  created () {},
  computed: {
    // 需要展示研讨列表
    chatBoxs: {
      get: function () {
        return this.$store.state.chatBoxs
      },
      set: function (chatBoxs) {
        this.$store.commit('setChatBoxs', chatBoxs)
      }
    }
  },
  methods: {
    showChat (chatBox) {
      const self = this
      const chatList = ChatListUtils.getChatList(self.$store.state.user.id)
      // 删除当前用户已经有的会话
      const newChatList = chatList.filter(function (element) {
        return String(element.id) !== String(chatBox.id)
      })
      // 重新添加会话，放到第一个
      const chat = new Chat(chatBox.id, chatBox.name, conf.getHostUrl() + chatBox.avatar, 0, '', '', '', MessageTargetType.CHAT_GROUP)
      newChatList.unshift(chat)
      // 存储到localStorage 的 chatList
      ChatListUtils.setChatList(self.$store.state.user.id, chatList)
      this.$store.commit('SET_CHAT_LIST', newChatList)
      this.$router.push({ name: 'ChatPanel',
        query: { id: chatBox.id } })
    },
    fetchData (callback) {
      this.$http
        .get('/talk/talk-boxs', {
          // params: Object.assign(parameter, this.queryParam)
        })
        .then(res => {
          callback(res)
        })
    },
    handleInfiniteOnLoad () {
      const data = this.data
      this.loading = true
      if (data.length > 14) {
        this.$message.warning('Infinite List loaded all')
        this.busy = true
        this.loading = false
        return
      }
      this.fetchData(res => {
        this.data = data.concat(res.result.data)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-list-item-meta-description {
  width: 120px;
  word-wrap: break-word; /* 内容存在英语或数字时强制换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置盒子内排列顺序为纵向 */
  -webkit-line-clamp: 1; /* 限制块元素显示的文本的行数 */
}
.talk-time {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  line-height: 22px;
}
</style>
