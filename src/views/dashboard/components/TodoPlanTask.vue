<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '300px'}"
      style="overflow-y: auto">
      <div slot="title">
        <a-row>
          <a-col>
            {{ title }}
            <a-radio-group
              defaultValue="0"
              type="button"
              v-model="selectedType"
              @change="fetchData"
              size="small"
              style="float: right;margin-right: 60%">
              <a-radio-button :value="0" >{{ "代办事项" }}</a-radio-button>
              <a-radio-button :value="1">{{ "计划表" }}</a-radio-button>
              <a-radio-button :value="2">{{ "任务单" }}</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
      <a-popover
        placement="left"
        slot="extra"
        trigger="click">
        <template slot="content">
          <a>移除卡片</a>
        </template>
        <a href="#">
          <a-icon type="tool"/>
        </a>
      </a-popover>
      <div v-if="this.typeMap==0"><todo></todo></div>
      <div v-if="this.typeMap==1"><plan></plan></div>
      <div v-if="this.typeMap==2"><task></task></div>
    </a-card>
  </div>
</template>
<script>
import todo from './Todo'
import plan from './Plan'
import task from './Task'

export default {
  data () {
    return {
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      title: '待办事项',
      rowDetails: {},
      selectedType: 0,
      typeMap: 0,
      list: []
    }
  },
  components: {
    todo,
    plan,
    task
  },
  computed: {},
  methods: {
    fetchData (event) {
      if (event.target.value === 0) {
        this.typeMap = 0
        this.title = '待办事项'
      } else if (event.target.value === 1) {
        this.typeMap = 1
        this.title = '计划表 '
      } else if (event.target.value === 2) {
        this.title = '任务单'
        this.typeMap = 2
      }
    }
  }
}
</script>
<style scoped>
</style>
