<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '300px',boxShadow: '0px 2px #bfbfbf'}"
    >
      <div slot="title">
        <a-row>
          <a-col>
            <span style="color: #333333;font-weight:bold">
              {{ title }}
            </span>
          </a-col>
        </a-row>
      </div>
      <!--<a-popover-->
      <!--placement="left"-->
      <!--slot="extra"-->
      <!--trigger="click">-->
      <!--<template slot="content">-->
      <!--<a @click="$emit('remove')">移除卡片</a>-->
      <!--</template>-->
      <!--<a href="#">-->
      <!--<a-icon type="close" />-->
      <!--</a>-->
      <!--</a-popover>-->
      <a-popover
        placement="left"
        slot="extra"
        trigger="click">
        <template slot="content">
          <!--<a @click="$emit('remove')">移除卡片</a>-->
          <a-row>
            <a-col>
              <a @click="$emit('remove')" style="color: #516efc">更多</a>
            </a-col>
            <a-col>
              <a @click="$emit('remove')" style="color: #516efc" title="">移除卡片</a>
            </a-col>
          </a-row>
        </template>
        <a href="#">
          <!--<a-icon type="close" />-->
          <a-icon type="plus" style="color: #516efc"/>
        </a>
      </a-popover>
      <a-row :gutter="15">
        <a-col :span="8">
          <div id="myChartRing" :style="{width:'100%',height:'220px'}"></div>
        </a-col>

        <a-col :span="8" >
          <a-row type="flex" :gutter="55">
            <!--<div>-->
            <!--<a-divider style="margin-left: 4%" type="vertical" />-->
            <!--</div>-->
            <a-col :span="20" style="padding-left: 6%">
              <div id="myChartBar" :style="{width:'110%',height:'220px'}"></div>
            </a-col>
            <!--<div >-->
            <!--<a-divider style="margin-left: 15%" type="vertical" />-->
            <!--</div>-->
          </a-row>
        </a-col>
        <a-col :span="8" >
          <div >
            <span style="color: #666666">知识历史记录</span>
            <div v-for="(row,index) in list" :key="'item'+index" class="row-magin">
              <span class="ivu-tag-dot-inner"></span>
              <a-tag type="border" color="#f49d2a" >{{ row.date }}</a-tag>
              <span style="color: #666666">{{ row.content.length > 14 ? row.content.replace(/^(.{12})(.*)$/,'$1...') : row.content }}</span>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { getStatHistorys, getToolStat, getTaskStat } from '../../../api/stat'
import echarts from 'echarts'
export default {
  components: {
    echarts
  },
  data () {
    return {
      title: '统计板',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      columns: [
        {
          render: (row, column, index) => {
            return `
                <div>

                </div>`
          }
        }
      ],
      list: [],
      task: {
        data: [],
        options: {}
      },
      tool: {
        data: [],
        options: {}
      },
      barName: [],
      barData: []
    }
  },
  created () {
    this.fetchData()
    this.fetchTask()
  },
  mounted () {

  },
  methods: {
    fetchData () {
      this.fetchTask()
      this.fetchTool()
      this.fetchList()
    },
    fetchTask () {
      // var vm = this
      getTaskStat().then((data) => {
        // vm.task = data.TaskStat

        /* ECharts图表 */
        var myChart = echarts.init(document.getElementById('myChartRing'))
        var bardata = data.TaskStat
        myChart.setOption({
          title: {
            text: '任务完成量',
            x: 'center',
            textStyle: {
              color: '#666666',
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
            bottom: 10,
            data: bardata
          },
          grid: {
            left: '3%',
            right: '8%',
            width: '90%',
            containLabel: true
          },
          color: ['#516efc', '#273eb0', '#f49d2a', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
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
    fetchTool () {
      var vm = this
      getToolStat().then((data) => {
        // vm.tool = data
        var dataArray = data.ToolStat
        var datas = []
        var legendData = []
        // var xAxis = []
        /* ECharts图表 */
        var myChartbar = echarts.init(document.getElementById('myChartBar'))
        for (var i = 0; i < dataArray.length; i++) {
          vm.barData.push(dataArray[i].value)
          vm.barName.push(dataArray[i].name)
          legendData.push(dataArray[i].name)
          datas.push({
            name: dataArray[i].name,
            type: 'bar',
            data: [dataArray[i].value]
          })
          // xAxis.push({
          //   type: 'category',
          //   data: [data.data[i].name],
          //   axisTick: {
          //     alignWithLabel: true
          //   }
          // })
        }
        myChartbar.setOption({
          title: {
            text: '工具统计',
            x: 'center',
            textStyle: {
              color: '#666666',
              fontSize: '13',
              fontWeight: '540'
            }
          },
          tooltip: {
            trigger: 'item',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: 10,
            data: vm.barName
          },
          grid: {
            left: '3%',
            right: '2%',
            width: '100%',
            containLabel: true
          },
          series: datas,

          xAxis: [
            {
              type: 'category',
              data: [],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          color: ['#516efc', '#273eb0', '#f49d2a', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          yAxis: [
            {
              type: 'value'
            }
          ]
        })
      })
    },
    fetchList () {
      var vm = this
      getStatHistorys().then((data) => {
        vm.list = data.StatHistory.slice(0, 5)
      })
    }
  }
}
</script>
<style scoped>
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
    top: -2px;
  }
  .row-magin {
    margin-top: 12px;
  }
</style>
