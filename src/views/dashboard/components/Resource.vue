<template>
  <div>
    <a-row type="flex" :gutter="10" v-if="selectedType==1">
      <a-col :span="14">
        <a-row type="flex">
          <a-col :span="24">
            <div id="myChartR" style="width: 100%;height: 222px"></div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="10">
        <span class="ivu-content-row-font">计算资源列表</span>
        <a-row class="panel-content-row  panel-content-row-resource" v-for="(row,index) in cardList" :key="'item'+index">
          <i class="ivu-tag-dot-inner ivu-tag-dot-inner-resource" ></i>
          <span class="resource-list">{{ row.content.length > 12 ? row.name.replace(/^(.{10})(.*)$/,'$1...') : row.content }}</span>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="5" v-else>
      <a-col :span="8" v-for="(item,index) in cardList" :key="'col-item-'+index">
        <a-card>
          <div style="height:60px;text-align:center;">
            <img :src="publicPath + 'images/index/expert1.jpg'" style="max-width:60%;max-height:60px;">
          </div>
          <div style="text-align:center;">
            <span>{{ item.name | omit }}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>

import TypeBar from './TypeBar.vue'
import echarts from 'echarts'
import { ResourceLatest, ResourceStat } from '@/api/resource'
export default {
  components: {
    TypeBar,
    echarts
  },
  data () {
    return {
      selectedType: 1,
      typeArray: [
        { type: 1, name: '计算资源', show: true },
        { type: 2, name: '人员资源', show: true },
        { type: 3, name: '其他', show: true }
      ],
      list: [],
      total: 0,
      chartData: {
        data: [],
        options: {
          title: '资源占比统计',
          bgColor: '#ffffff',
          radius: 40,
          innerRadius: 25,
          legendTop: 125
        }
      }
    }
  },
  computed: {
    cardList () {
      return this.list.filter((item, index) => {
        return index < 6
      })
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
    this.fetchData()
    this.fetchChartData()
  },
  methods: {
    fetchData (type) {
      if (type === undefined) {
        type = 1
      }
      var vm = this
      ResourceLatest(type).then((data) => {
        vm.list = [].concat(data.content)
        vm.total = data.total
      })
    },
    fetchChartData (type) {
      if (type === undefined) {
        type = 1
      }
      var vm = this
      ResourceStat(type).then(({ data, status }) => {
        vm.chartData.data = data.content
        /* ECharts图表 */
        var myChart = echarts.init(document.getElementById('myChartR'))
        var bardata = vm.chartData.data
        myChart.setOption({
          title: {
            text: '资源占比统计',
            x: 'center',
            textStyle: {
              color: '#333333',
              fontSize: '13',
              fontWeight: '540'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} :{d}%'
          },
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: 5,
            data: bardata
          },
          grid: {
            left: '5%',
            right: '10%',
            width: '70%',
            containLabel: true
          },
          color: ['#01a5e2', '#e2e2e2', '#fe9846', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: bardata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      })
    },
    totalResource () {
      this.$router.push({
        path: '/total-resource'
      })
    }
  }
}
</script>
