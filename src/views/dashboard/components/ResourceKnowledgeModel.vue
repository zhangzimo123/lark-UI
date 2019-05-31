<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '300px'}">
      <div slot="title">
        <a-row>
          <a-col>
            <span style="color: #333333;font-weight:bold">
              {{ title }}
            </span>
            <a-radio-group
              defaultValue="0"
              type="button"
              v-model="selectedType"
              @change="fetchData"
              size="small">
              <a-radio-button :value="0" >{{ "资源池" }}</a-radio-button>
              <a-radio-button :value="1">{{ "模型库" }}</a-radio-button>
              <a-radio-button :value="2">{{ "知识角" }}</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
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
              <a @click="$emit('remove')" style="color: #516efc">移除卡片</a>
            </a-col>
          </a-row>
        </template>
        <a href="#">
          <!--<a-icon type="close" />-->
          <!--<a-icon type="plus" style="color: #516efc"/>-->
          <img style="width: 14px;height: 14px;" :src=" require('@/assets/more.jpg')" />
        </a>
      </a-popover>
      <div v-if="this.typeMap==0"><resource :data="data.resource" @myChart="myChart"></resource></div>
      <div v-if="this.typeMap==1"><model :data="data.model"></model></div>
      <div v-if="this.typeMap==2"><knowledge :data="data.knowledge"></knowledge></div>
    </a-card>
  </div>
</template>
<script>
import resource from './Resource'
import model from './Model'
import knowledge from './Knowledge'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      headStyle: { height: '52px', 'border-bottom': 'none' },
      title: '资源池',
      rowDetails: {},
      selectedType: 0,
      typeMap: 0,
      list: []
    }
  },
  components: {
    resource,
    model,
    knowledge
  },
  computed: {},
  methods: {
    fetchData (event) {
      if (event.target.value === 0) {
        this.typeMap = 0
        this.title = '资源池'
      } else if (event.target.value === 1) {
        this.typeMap = 1
        this.title = '模型库'
      } else if (event.target.value === 2) {
        this.title = '知识角'
        this.typeMap = 2
      }
    },
    myChart (data) {
      this.$emit('myChartSize', data)
    }
  }
}
</script>
<style scoped>
</style>
