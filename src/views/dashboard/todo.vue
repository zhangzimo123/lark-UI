<template>
  <div>
    <a-row v-for="(item,index) in tableData" :key="'item'+index" class="row-magin">
      <span
        class="row-content">{{ item.name.length> 24 ? item.name.replace(/^(.{22})(.*)$/,'$1...') : item.name }}</span>
      <a-tag class="right" color="gold">{{ item.tag }}</a-tag>
    </a-row>
  </div>
</template>
<script>
import { getTodos } from '../../api/dashboard'

export default {
  data () {
    return {
      title: '待办事项',
      showTableHeader: true,
      tableData: []
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    getTodos
  },
  methods: {
    fetchData () {
      var vm = this
      getTodos().then(data => {
        vm.tableData = [].concat(data.content).slice(0, 6)
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

  .row-magin {
    margin-bottom: 12px;
  }
</style>
