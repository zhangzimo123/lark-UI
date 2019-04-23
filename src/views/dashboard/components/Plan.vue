<template>
  <div>
    <!--<a-card-->
    <!--:headStyle="headStyle"-->
    <!--:bordered="true"-->
    <!--:style="{ minHeight: '300px'}">-->
    <!--<div slot="title">-->
    <!--<a-row>-->
    <!--<a-col>-->
    <!--{{ title }}-->
    <!--</a-col>-->
    <!--</a-row>-->
    <!--</div>-->
    <!--<a-popover-->
    <!--placement="left"-->
    <!--slot="extra"-->
    <!--trigger="click">-->
    <!--<template slot="content">-->
    <!--<a>移除卡片</a>-->
    <!--</template>-->
    <!--<a href="#">-->
    <!--<a-icon type="tool"/>-->
    <!--</a>-->
    <!--</a-popover>-->
    <a-row class="row-magin" v-for="(row,index) in tableData" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <span>{{ row.name.length> 24 ? row.name.replace(/^(.{22})(.*)$/,'$1...') : row.name }}</span>
      <span class="right" color="#f50">{{ row.date }}</span>
    </a-row>
    <!--</a-card>-->
  </div>
</template>
<script>
import { PlanLatest } from '@/api/plan'

export default {
  data () {
    return {
      title: '计划表',
      showTableHeader: true,
      tableData: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      var vm = this
      PlanLatest()
        .then((data) => {
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
  .row-magin{
    margin-bottom: 12px;
  }
  .ivu-tag-dot-inner {
    height: 6px;
    width: 6px;
    background-attachment: scroll;
    background-clip: border-box;
    background-color: rgb(45, 140, 240);
    background-image: none;
    background-origin: padding-box;
    background-position: 0% 0%;
    background-position-x: 0%;
    background-position-y: 0%;
    background-repeat: repeat;
    background-size: auto;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    box-sizing: border-box;
    color: rgb(81, 90, 110);
    cursor: pointer;
    display: inline-block;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5FAE软雅黑, Arial, sans-serif;
    font-size: 1px;
    margin-right: 8px;
    position: relative;
    top: -2px;
  }

</style>
