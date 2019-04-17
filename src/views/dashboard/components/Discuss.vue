<template>
  <div>
    <a-row class="list-item" :gutter="5" v-for="(row,index) in list" :key="'item'+index">
      <a-col :span="2" >
        <a-badge :count="row.unread">
          <a-avatar class="discuss-avatar" src="images/index/read.png" />
        </a-badge>
      </a-col>
      <a-col :span="20" class="min-width">
        <a-row :gutter="5">
          <a-col :span="21">
            <span class="discuss-name">{{ row.user }}</span>
                  &nbsp;
            <span class="discuss-msg">{{ row.content.length > 16 ? row.content.replace(/^(.{16})(.*)$/,'$1...') : row.content }}</span>
          </a-col>
          <a-col :span="3">
            <span style="position: absolute;top: 10%;" class="datetime">
              <span>{{ row.time }}</span>
            </span>
            <!--<div>-->
            <!--<i-button size="small">回复</i-button>-->
            <!--</div>-->
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { DiscussLatest } from '@/api/discuss'
export default {
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
.rightAngle {
  border-radius: 0px 0px 0px 0px;
}
</style>
