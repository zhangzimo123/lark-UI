<template>
  <a-card
    :headStyle="headStyle"
    :bordered="true"
    :style="{ minHeight: '300px'}">
    <div slot="title">
      <a-row>
        <a-col>
          {{ title }}
        </a-col>
      </a-row>
    </div>
    <a-popover
      placement="left"
      slot="extra"
      trigger="click">
      <template slot="content">
        <a>移除卡片</a>
      </template>
      <a href="#">
        <a-icon type="tool"/>
      </a>
    </a-popover>
    <div>
      <a-row v-for="(item,index) in list" :key="'item'+index" class="row-magin">
        <i></i>
        <span>{{ item.name.length> 24 ? item.name.replace(/^(.{22})(.*)$/,'$1...') : item.name }}</span>
        <a-tag class="right" color="#f50">{{ item.tag }}</a-tag>
      </a-row>
    </div>
  </a-card>
</template>
<script>
import { TodoLatest } from '@/api/todo'

export default {
  data () {
    return {
      list: [],
      size: 10,
      total: 10,
      title: '待办事项',
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      var vm = this
      TodoLatest(vm.size)
        .then((data) => {
          vm.list = [].concat(data.content.slice(0, 6))
          vm.total = data.total
        })
    }
  }
}
</script>
<style scoped>
  .right {
    float: right;
    margin-right: 3px;
  }
  .row-magin{
    margin-bottom: 12px;
  }
</style>
