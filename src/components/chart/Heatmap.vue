<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip :showTitle="false"/>
      <v-axis
        :data-key="axis1Opts.dataKey"
        :position="axis1Opts.position"
        :tickLine="axis1Opts.tickLine"
        :line="axis1Opts.line"
        :label="axis1Opts.label"
      />
      <v-axis :data-key="axis2Opts.dataKey" :grid="axis2Opts.grid"/>
      <v-coord type="rect" direction="TL"/>
      <v-polygon
        position="week*day*date"
        :color="['commits', '#BAE7FF-#1890FF-#0050B3']"
        shape="boundary-polygon"
      />
    </v-chart>
  </div>
</template>
<script>
// import * as $ from 'jquery'
import { registerShape } from 'viser-vue'

registerShape('polygon', 'boundary-polygon', {
  draw (cfg, container) {
    if (cfg.points && cfg.points.length) {
      const attrs = {
        stroke: '#fff',
        lineWidth: 1,
        fill: cfg.color,
        fillOpacity: cfg.opacity
      }
      const points = cfg.points
      const path = [
        ['M', points[0].x, points[0].y],
        ['L', points[1].x, points[1].y],
        ['L', points[2].x, points[2].y],
        ['L', points[3].x, points[3].y],
        ['Z']
      ]
      attrs.path = this.parsePath(path)
      const polygon = container.addShape('path', {
        attrs
      })

      if (cfg.origin._origin.lastWeek) {
        const linePath = [['M', points[2].x, points[2].y], ['L', points[3].x, points[3].y]]
        // 最后一周的多边形添加右侧边框
        container.addShape('path', {
          zIndex: 1,
          attrs: {
            path: this.parsePath(linePath),
            lineWidth: 1,
            stroke: '#404040'
          }
        })
        if (cfg.origin._origin.lastDay) {
          container.addShape('path', {
            zIndex: 1,
            attrs: {
              path: this.parsePath([['M', points[1].x, points[1].y], ['L', points[2].x, points[2].y]]),
              lineWidth: 1,
              stroke: '#404040'
            }
          })
        }
      }
      container.sort()
      return polygon
    }
  }
})

const scale = [
  {
    dataKey: 'day',
    type: 'cat',
    values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  },
  {
    dataKey: 'week',
    type: 'cat'
  },
  {
    dataKey: 'commits',
    sync: true
  }
]

const axis1Opts = {
  dataKey: 'week',
  position: 'top',
  tickLine: null,
  line: null,
  label: {
    offset: 12,
    textStyle: {
      fontSize: 12,
      fill: '#666',
      textBaseline: 'top'
    },
    formatter: val => {
      if (val === '2') {
        return '5月'
      } else if (val === '6') {
        return '6月'
      } else if (val === '10') {
        return '7月'
      } else if (val === '15') {
        return '8月'
      } else if (val === '19') {
        return '9月'
      } else if (val === '24') {
        return '10月'
      }
      return ''
    }
  }
}

const axis2Opts = {
  dataKey: 'day',
  grid: null
}

const padding = [window.innerHeight / 3, 20, window.innerHeight / 3, 80]

export default {
  name: 'Heatmap',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      scale,
      height: 400,
      padding,
      axis1Opts,
      axis2Opts
    }
  }
}
</script>

<style lang="less" scoped>
</style>
