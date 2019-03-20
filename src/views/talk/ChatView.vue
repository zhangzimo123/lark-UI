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
                  <a-menu-item key="1">发起研讨</a-menu-item>
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
            群组
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
        欢迎
      </a-layout>
    </a-layout>
  </div>
</template>
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
<script>
import infiniteScroll from 'vue-infinite-scroll'
import { Chat, ChatListUtils, MessageTargetType } from '../../utils/talk/chatUtils'
import conf from '../../utils/talk/conf'

export default {
  directives: { infiniteScroll },
  name: 'ChatView',
  components: {
  },
  data () {
    return {
      tabStyle: { marginLeft: '12px', marginRight: '12px', marginBottom: '0px' },
      data: [],
      loading: false,
      busy: false,
      host: conf.getHostUrl()
    }
  },
  computed: {
    // 需要展示研讨列表
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
    showChat (chatBox) {
      const self = this
      const chatList = ChatListUtils.getChatList(self.$store.state.user.info.id)
      // 删除当前用户已经有的会话
      const newChatList = chatList.filter(function (element) {
        return String(element.id) !== String(chatBox.id)
      })
      // 重新添加会话，放到第一个
      const chat = new Chat(chatBox.id, chatBox.name, conf.getHostUrl() + chatBox.avatar, 0, '', '', '', MessageTargetType.CHAT_GROUP)

      newChatList.unshift(chat)
      // 存储到localStorage 的 chatList
      ChatListUtils.setChatList(self.$store.state.user.info.id, chatList)
      this.$store.commit('setChatList', newChatList)
      this.$router.push({
        path: '/talk/ChatPanel',
        query: { chat: chat }
      })
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
