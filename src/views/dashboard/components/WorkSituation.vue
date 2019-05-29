<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '420px'}"
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
      <a-popover
        placement="bottomLeft"
        slot="extra"
        trigger="hover">
        <template slot="content">
          <a-row>
            <a-col>
              <a @click="$emit('remove')" style="color: #666666;margin-right:12px;"><img style="width: 14px;height: 14px;margin-right: 5px;margin-left: 5px;" :src=" require('@/assets/more-icon.png')" /><span style="margin-left: 5px">更多</span></a>
            </a-col>
            <a-divider type="horizontal " style="margin-top: 8px;margin-bottom: 8px" />
            <a-col>
              <a @click="$emit('remove')" style="color: #666666;margin-right:12px;"><img style="width: 14px;height: 14px;margin-right: 5px;margin-left: 5px;" :src=" require('@/assets/remove-icon.png')" /><span style="margin-left: 5px">移除卡片</span></a>
            </a-col>
          </a-row>
        </template>
        <a href="#">
          <!--<a-icon type="plus" style="color: #516efc"/>-->
          <img style="width: 14px;height: 14px;" :src=" require('@/assets/more.jpg')" />
        </a>
      </a-popover>
      <div>
        <heat-map title="本年度工作情况" :data="data.content"></heat-map>
      </div>
    </a-card>
  </div>
</template>
<script>
import HeatMap from '@/components/chart/Heatmap'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: '工作情况',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      modal: false,
      rowDetails: '',
      list: []
    }
  },
  components: {
    HeatMap
  },
  methods: {

  }
}
</script>
<style scoped>
</style>
