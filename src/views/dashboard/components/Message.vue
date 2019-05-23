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
              <a-radio-button :value="0" >{{ "研讨" }}</a-radio-button>
              <a-radio-button :value="1">{{ "邮件" }}</a-radio-button>
              <a-radio-button :value="2">{{ "其他" }}</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
      <a-popover
        placement="left"
        slot="extra"
        trigger="click">
        <template slot="content">
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
          <a-icon type="plus" style="color: #516efc"/>
        </a>
      </a-popover>
      <div v-if="this.typeMap==0"><Discuss :data="data.discuss" ></Discuss></div>
      <div v-if="this.typeMap==1"><Mail :data="data.mail"></Mail></div>
      <div v-if="this.typeMap==2"><OtherMessage :data="data.othermessage"></OtherMessage></div>
    </a-card>
  </div>
</template>
<script>
import Discuss from './Discuss'
import Mail from './Mail'
import OtherMessage from './OtherMessage'

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
      title: '消息',
      rowDetails: {},
      selectedType: 0,
      typeMap: 0,
      list: []
    }
  },
  components: {
    Discuss,
    Mail,
    OtherMessage
  },
  computed: {},
  methods: {
    fetchData (event) {
      if (event.target.value === 0) {
        this.typeMap = 0
        this.title = '研讨'
      } else if (event.target.value === 1) {
        this.typeMap = 1
        this.title = '邮件'
      } else if (event.target.value === 2) {
        this.title = '其他'
        this.typeMap = 2
      }
    }
  }
}
</script>
<style scoped>
</style>
