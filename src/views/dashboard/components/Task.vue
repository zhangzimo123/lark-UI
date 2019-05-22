<template>
  <div style="height:205px;overflow-y:auto">
    <a-row class="row-magin" v-for="(row,index) in showList" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
      <span @click="visibleModal(row)" class="content-adpat" style="color: #666666">{{ row.name }}</span>
      <span class="right" color="#f50" style="color: #999999">{{ row.date }}</span>
      <a-modal
        v-model="modal"
        footer=""
        title="任务单详细">
        <a-row class="row-magin">
          <a-col>{{ rowDetails.name }}</a-col>
        </a-row>
      </a-modal>
    </a-row>
  </div>
</template>
<script>
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
      selectedType: 0,
      buttonEdit: false,
      typeArray: [
        { type: 1, name: '新创建', show: true },
        { type: 2, name: '已发布', show: true },
        { type: 3, name: '待审核', show: true },
        { type: 4, name: '已完成', show: true }
      ],
      typeMap: { 'type-1': {} },
      modal: false,
      rowDetails: ''
    }
  },
  created () {
    this.setStatusMap()
  },
  computed: {
    showTypeArray () {
      return this.typeArray.filter(item => {
        return item.show
      })
    },
    showList () {
      return this.data.content.slice(0, 5)
    }
  },
  methods: {
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
        return '#516EFC'
      } else if (type === 2) {
        return '#f49D2a'
      } else if (type === 3) {
        return '#e8e8e8'
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
  .row-tag{
    font-size: 12px;
    position: relative;
    top: -5px;
  }
  .content-adpat{
    width: 55%;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
</style>
