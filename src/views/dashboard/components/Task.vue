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
    <a-row class="row-magin" v-for="(row,index) in data.content" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
      <span @click="visibleModal(row)">{{ row.name.length> 28 ? row.name.replace(/^(.{26})(.*)$/,'$1...') : row.name }}</span>
      <span class="right" color="#f50">{{ row.date }}</span>
      <a-modal
        v-model="modal"
        footer=""
        title="任务单详细">
        <a-row class="row-magin">
          <a-col>{{ rowDetails.name }}</a-col>
        </a-row>
      </a-modal>
    </a-row>
    <!--</a-card>-->
  </div>
</template>
<script>
import { TaskLatest } from '@/api/task'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      title: '任务单',
      showTableHeader: true,
      selectedType: 0,
      buttonEdit: false,
      typeArray: [
        { type: 1, name: '新创建', show: true },
        { type: 2, name: '已发布', show: true },
        { type: 3, name: '待审核', show: true },
        { type: 4, name: '已完成', show: true }
      ],
      typeMap: { 'type-1': {} },
      list: [],
      modal: false,
      rowDetails: ''
    }
  },
  created () {
    this.setStatusMap()
    // this.fetchData()
  },
  computed: {
    showTypeArray () {
      return this.typeArray.filter(item => {
        return item.show
      })
    }
  },
  methods: {
    fetchData (type) {
      if (type === undefined) {
        type = 0
      }
      var vm = this
      TaskLatest(type).then((data) => {
        vm.list = data.content.slice(0, 6)
      })
    },
    setStatusMap () {
      const m = {}
      this.typeArray.forEach(item => {
        m['type-' + item.type] = item
      })
      this.typeMap = Object.assign({}, m)
    },
    typeName (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.name : ''
    },
    typeColor (type) {
      if (type === 1) {
        return '#91d5ff'
      } else if (type === 2) {
        return '#ffd591'
      } else if (type === 3) {
        return '#ffbb96'
      } else {
        return '#c5c8ce'
      }
    },
    completeEdit () {
      this.buttonEdit = false
      this.selectedType = 0
      this.fetchData()
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

  .row-magin {
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
  .row-tag{
    font-size: 12px;
  }
</style>
