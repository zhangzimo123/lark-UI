<template>
  <a-card
    title="研讨厅"
    :headStyle="headStyle"
    :loading="loading"
    :bordered="true"
    :style="{ height: '305px' }">
    <div slot="extra" style="width:450px;">
      <span class="left">({{ unread }}条未读消息)</span>
      <a-popover
        placement="left"
        trigger="click">
        <template slot="content">
          <a>移除卡片</a>
        </template>
        <a class="right" href="#"><a-icon type="tool" /></a>
      </a-popover>
    </div>
    <a-row class="ant-card-list-item" :gutter="5" v-for="(row,index) in list" :key="'item'+index" >
      <a-col :span="2" class="discuss-avatar">
        <a-badge :count="row.unread">
          <a-avatar :src="row.avatar" />
        </a-badge>
      </a-col>
      <a-col :span="22" class="min-width">
        <a-row :gutter="5">
          <a-col :span="21">
            <span class="discuss-name" @click="showChat(currentChat)">{{ row.user }}</span>
          </a-col>
          <a-col :span="3">
            <span class="datetime right">{{ row.time }}</span>
          </a-col>
        </a-row>
        <a-row>
          <span class="discuss-msg">{{ row.content }}</span>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import { DiscussLatest } from '@/api/discuss'
import UserChat from '@/components/Talk/Chat'
export default {
  props: {
    headStyle: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    UserChat
  },
  data () {
    return {
      size: 4,
      unread: 20,
      list: [],
      showChatVisible: true,
      currentChat: {
        id: '001',
        name: 'AAA',
        time: '10:20',
        lastMessage: '123'
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const vm = this
      // const paramter = 'size' + vm.size
      DiscussLatest(vm.size).then((data) => {
        vm.list = data.content
        vm.unread = data.unread
      })
    },
    toDiscussPage () {
      // this.$router.push({ path: '/discuss' })
    },
    showChat (currentChat) {
      // this.showChatVisible = true
      console.log('this:', this)
      this.$emit('showChatPanel', {})
    }
  }
}
</script>
<style scoped>
.discuss-avatar{
  padding: 5px;
}
.discuss-name{
  font-weight: 500;
}
.discuss-msg{

}
</style>
