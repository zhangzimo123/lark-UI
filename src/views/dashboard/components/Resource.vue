<template>
  <!--<a-card-->
  <!--title="资源池"-->
  <!--:headStyle="headStyle"-->
  <!--:loading="loading"-->
  <!--:bordered="true"-->
  <!--:style="{ minHeight: '300px' }">-->
  <!--<a-row slot="extra" style="width:450px;">-->
  <!--<a-col :span="20">-->
  <!--<a-radio-group v-model="selectedType" size="small" @change="fetchData">-->
  <!--<a-radio-button :value="0">全部</a-radio-button>-->
  <!--<a-radio-button :value="1">工具资源</a-radio-button>-->
  <!--<a-radio-button :value="2">人员资源</a-radio-button>-->
  <!--<a-radio-button :value="3">其他</a-radio-button>-->
  <!--</a-radio-group>-->
  <!--</a-col>-->
  <!--<a-col :span="4">-->
  <!--<a-popover-->
  <!--placement="left"-->
  <!--trigger="click">-->
  <!--<template slot="content">-->
  <!--<a>移除卡片</a>-->
  <!--</template>-->
  <!--<a href="#" class="right"><a-icon type="tool" /></a>-->
  <!--</a-popover>-->
  <!--</a-col>-->
  <!--</a-row>-->
  <div style="height:205px;overflow-y:auto;overflow-x: hidden">
    <a-row type="flex" :gutter="10" v-if="selectedType === 0">
      <a-col :span="14">
        <resource-chart :data="list.stat" :chartStyle="chartStyle" @myChart="myChart"/>
      </a-col>
      <a-col :span="10">
        <span class="ant-card-body-title" style="color: #666666">计算资源列表</span>
        <a-row v-for="(row,index) in list.list.content" :key="'item'+index">
          <i class="ivu-tag-dot-inner" ></i>
          <span class="resource-list content-adpat" style="color: #999999">{{ row.name }}</span>
        </a-row>
      </a-col>
    </a-row>
  </div>
  <!--<a-row :gutter="5" v-else>-->
  <!--<a-col :span="8" v-for="(item,index) in list" :key="'col-item-'+index">-->
  <!--<a-card>-->
  <!--<div style="height:60px;text-align:center;">-->
  <!--<img :src="item.img" style="max-width:60%;max-height:60px;">-->
  <!--</div>-->
  <!--<div style="text-align:center;">-->
  <!--<span>{{ item.name | omit }}</span>-->
  <!--</div>-->
  <!--</a-card>-->
  <!--</a-col>-->
  <!--</a-row>-->
  <!--</a-card>-->
</template>
<script>

import TypeBar from './TypeBar.vue'
import ResourceChart from './ResourceChart.vue'
import { resourceData } from '@/api/resource'
export default {
  props: {
    headStyle: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: true
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
      size: 4,
      list: []
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
  created () {
    this.fetchResource()
  },
  methods: {
    totalResource () {
      this.$router.push({
        path: '/total-resource'
      })
    },
    myChart (data) {
      this.$emit('myChart', data)
    },
    fetchResource () {
      const vm = this
      resourceData().then(data => {
        vm.list = data.resource
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
