<template>
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
  <div style="height:205px;overflow-y:auto">
    <a-row v-for="(item,index) in data.content" :key="'item'+index" class="row-magin">
      <i class="ivu-tag-dot-inner"></i>
      <span @click="visibleModal(item)">{{ item.name.length> 28 ? item.name.replace(/^(.{26})(.*)$/,'$1...') : item.name }}</span>
      <a-tag class="right" color="#f50">{{ item.tag }}</a-tag>
      <a-modal
        v-model="modal"
        footer=""
        title="待办详细">
        <a-row class="row-magin">
          <a-col>{{ rowDetails.name }}</a-col>
        </a-row>
      </a-modal>
    </a-row>
  </div>
  <!--</a-card>-->
</template>
<script>
import { TodoLatest } from '@/api/todo'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      size: 10,
      total: 10,
      title: '待办事项',
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      modal: false,
      rowDetails: ''
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    fetchData () {
      var vm = this
      TodoLatest(vm.size)
        .then((data) => {
          vm.list = [].concat(data.content.slice(0, 6))
          vm.total = data.total
        })
    },
    visibleModal (row) {
      this.modal = true
      this.rowDetails = row
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
