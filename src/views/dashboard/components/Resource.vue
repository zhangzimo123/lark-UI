<template>
  <div style="height:205px;overflow-y:auto;overflow-x: hidden">
    <a-row type="flex" :gutter="10" v-if="selectedType === 0">
      <a-col :span="16">
        <resource-chart :data="data.stat" :chartStyle="chartStyle" @myChart="myChart"/>
      </a-col>
      <a-col :span="8">
        <span class="ant-card-body-title" style="color: #666666">计算资源列表</span>
        <a-row v-for="(row,index) in showList" :key="'item'+index">
          <i class="ivu-tag-dot-inner" ></i>
          <span class="content-adpat" style="color: #999999">{{ row.name }}</span>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import TypeBar from './TypeBar.vue'
import ResourceChart from './ResourceChart.vue'
export default {
  props: {
    headStyle: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    TypeBar,
    ResourceChart
  },
  data () {
    return {
      chartStyle: { width: '100%', height: '202px' },
      selectedType: 0,
      typeArray: [
        { type: 1, name: '计算资源', show: true },
        { type: 2, name: '人员资源', show: true },
        { type: 3, name: '其他', show: true }
      ],
      size: 4
    }
  },
  filters: {
    status (status) {
      switch (status) {
        case 0:
          return '未知'
        case 1:
          return '未开始'
        case 2:
          return '进行中'
        case 3:
          return '已结束'
        default:
          return '空'
      }
    },
    omit (str) {
      return str.replace(/^(.{5})(.*)$/, '$1')
    }
  },
  computed: {
    showList () {
      return this.data.list.content.slice(0, 5)
    }
  },
  methods: {
    myChart (data) {
      this.$emit('myChart', data)
    },
    totalResource () {
      this.$router.push({
        path: '/total-resource'
      })
    }
  }
}
</script>
<style scoped>
.ant-card-body-title{
  font-size: 14px;
  font-weight: 600;
}
.ivu-tag-dot-inner {
  height: 6px;
  width: 6px;
  background-attachment: scroll;
  background-clip: border-box;
  background-color: #516EFC;
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
  color: #516EFC;
  cursor: pointer;
  display: inline-block;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5FAE软雅黑, Arial, sans-serif;
  font-size: 1px;
  margin-right: 8px;
  position: relative;
  top: -7px;
}
.content-adpat{
  width: 85%;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
}
</style>
