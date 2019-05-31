<template>
  <div>
    <div id="chartDiv" :style="chartStyle"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
// import { ResourceStat } from '@/api/resource'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    chartStyle: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      myChart: ''
    }
  },
  mounted () {
    // this.fetchData()
    setTimeout(this.showChart, 100)
  },
  methods: {
    showChart () {
      /* ECharts图表 */
      var bardata = this.data.content
      this.myChart = echarts.init(document.getElementById('chartDiv'))
      this.myChart.setOption({
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
        color: ['#516efc', '#f49d2a', '#273eb0', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
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
      this.$emit('myChart', this.myChart)
    }
  }
}
</script>
