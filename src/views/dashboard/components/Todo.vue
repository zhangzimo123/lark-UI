<template>
  <div class="panel-card-content">
    <a-row class="panel-content-row" v-for="(item,index) in list" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <span class="row-content">{{ item.name }}</span>
      <a-tag class="row-tag" color="#f50">{{ item.tag }}</a-tag>
    </a-row>
  </div>
</template>
<script>
import { TodoLatest } from '@/api/todo'
export default {
  data () {
    return {
      list: [],
      size: 10,
      total: 10
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
          vm.list = [].concat(data.content)
          vm.total = data.total
        })
    }
  }
}
</script>
<style scoped>
.rightAngle {
  border-radius: 0px 0px 0px 0px;
}
</style>
