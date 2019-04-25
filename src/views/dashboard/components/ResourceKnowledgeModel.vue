<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '305px'}"
      style="overflow-y:auto">
      <div slot="title">
        <a-row>
          <a-col>
            {{ title }}
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
          <a @click="$emit('remove')">移除卡片</a>
        </template>
        <a href="#">
          <a-icon type="tool"/>
        </a>
      </a-popover>
      <div v-if="this.typeMap==0"><resource></resource></div>
      <div v-if="this.typeMap==1"><model></model></div>
      <div v-if="this.typeMap==2"><knowledge></knowledge></div>
    </a-card>
  </div>
</template>
<script>
import resource from './Resource'
import model from './Model'
import knowledge from './Knowledge'

export default {
  data () {
    return {
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
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
    }
  }
}
</script>
<style scoped>
</style>
