<template>
  <div style="height:205px;overflow-y:auto">
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
    <a-row class="row-magin" v-for="(row,index) in list" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <span @click="visibleModal(row)" class="content-adpat" style="color: #666666">{{ row.name }}</span>
      <span class="right" color="#999999">{{ row.date }}</span>
      <a-modal
        v-model="modal"
        footer=""
        title="计划表详细">
        <a-row class="row-magin">
          <a-col>{{ rowDetails.name }}</a-col>
        </a-row>
      </a-modal>
    </a-row>
    <!--</a-card>-->
  </div>
</template>
<script>
import { planData } from '@/api/plan'
export default {
  data () {
    return {
      title: '计划表',
      modal: false,
      rowDetails: '',
      list: []
    }
  },
  created () {
    this.fetchPlan()
  },
  methods: {
    visibleModal (row) {
      this.modal = true
      this.rowDetails = row
    },
    fetchPlan () {
      const vm = this
      planData().then(data => {
        vm.list = data.plan.content.slice(0, 5)
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
    background-color:  #516EFC;
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
    color:  #516EFC;
    cursor: pointer;
    display: inline-block;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5FAE软雅黑, Arial, sans-serif;
    font-size: 1px;
    margin-right: 8px;
    position: relative;
    top: -7px;
  }
  .content-adpat{
    width: 70%;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

</style>
