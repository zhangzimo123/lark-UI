<template>
  <a-card
    title="研讨厅"
    :headStyle="headStyle"
    :loading="loading"
    :bordered="true"
    :style="{ minHeight: '300px' }">
    <a-popover
      placement="left"
      slot="extra"
      trigger="click">
      <template slot="content">
        <a>移除卡片</a>
      </template>
      <a href="#"><a-icon type="tool" /></a>
    </a-popover>
    <a-row class="ant-card-list-item" :gutter="5" v-for="(row,index) in list" :key="'item'+index">
      <a-col :span="2" class="discuss-avatar">
        <a-badge :count="row.unread">
          <a-avatar :src="row.avatar" />
        </a-badge>
      </a-col>
      <a-col :span="20" class="min-width">
        <a-row :gutter="5">
          <a-col :span="21">
            <span class="discuss-name">{{ row.user }}</span>
          </a-col>
          <a-col :span="3">
            <span class="datetime">{{ row.time }}</span>
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
  data () {
    return {
      size: 4,
      unread: 20,
      list: []
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
