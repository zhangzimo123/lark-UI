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
              <a-radio-button :value="0" >{{ "待办事项" }}</a-radio-button>
              <a-radio-button :value="1">{{ "计划表" }}</a-radio-button>
              <a-radio-button :value="2">{{ "任务单" }}</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
      <a-popover
        placement="bottomLeft"
        slot="extra"
        trigger="click">
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
      <div v-if="this.typeMap==0"><todo :data="data.todo"></todo></div>
      <div v-if="this.typeMap==1"><plan :data="data.plan"></plan></div>
      <div v-if="this.typeMap==2"><task :data="data.task"></task></div>
    </a-card>
  </div>
</template>
<script>
import todo from './Todo'
import plan from './Plan'
import task from './Task'

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
        this.title = '计划列表 '
      } else if (event.target.value === 2) {
        this.title = '任务列表'
        this.typeMap = 2
      }
    }
  }
}
</script>
<style scoped>
</style>
