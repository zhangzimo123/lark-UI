<template>
  <div>
    <Card class="panel-card   rightAngle">
      <div class="panel-card-header" slot="title">
        <span class="panel-card-title">{{ title }}</span>
        <category-tools :array="typeArray" @changed="fetchData"/>
        <span class="panel-card-extra">
          <i-button class="card-head-button" type="text" size="small" @click="createMeeting">
            <Icon :size="15" type="ios-add-circle-outline"/>创建会议
          </i-button>
          <create-meeting :createMeeted="createMeet" @createMeeted="createMeeted"></create-meeting>
          <i-button type="text" class="panel-card-extra-button" @click="totalMeeting">全部</i-button>
        </span>
      </div>
      <div>
        <Row class="panel-content-row" v-for="(row,index) in list" :key="'item'+index">
          <i class="ivu-tag-dot-inner"></i>
          <Tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</Tag>
          <span class="row-content as-link meeting-content" @click="visibleDetails">{{ row.name }}</span>
          <span class="datetime right">{{ row.date }}</span>
          <Modal title="详细信息" v-model="meetingDetails" :footer-hide="false" :styles="{top: '20%'}">
            <p>{{ row.name }}</p>
          </Modal>
        </Row>
      </div>
    </Card>
  </div>
</template>
<script>
import CategoryTools from './common/category-tools'
import createMeeting from '@/view/module/meeting/components/create-meeting'
import { getMyToolSetting, showToolSetting } from '@/api/setting'
import { MeetingLatest } from '@/api/meeting'
import './message.less'

export default {
  components: {
    CategoryTools,
    createMeeting
  },
  data () {
    return {
      selectedType: 0,
      list: [],
      total: 0,
      size: 10,
      buttonEdit: false,
      typeArray: [
        { type: 1, name: '未开始', show: true },
        { type: 2, name: '进行中', show: true },
        { type: 3, name: '已结束', show: true }
      ],
      typeMap: {},
      createMeet: false,
      meetingDetails: false
    }
  },
  created () {
    this.fetchData()
    this.fetchToolStatus()
  },
  computed: {
    showTypeArray () {
      return this.typeArray.filter(item => {
        return item.show
      })
    }
  },
  methods: {
    fetchData (type) {
      if (type === undefined) {
        type = 0
      }
      var vm = this
      MeetingLatest([type, vm.size]).then((data) => {
        vm.list = [].concat(data.content)
        vm.total = data.total
      })
    },
    fetchToolStatus () {
      const vm = this
      getMyToolSetting('meeting').then(({ data, status }) => {
        vm.typeArray = [].concat(data.content)
        vm.setStatusMap()
      })
    },
    setStatusMap () {
      const m = {}
      this.typeArray.forEach(item => {
        m['type-' + item.type] = item
      })
      this.typeMap = Object.assign({}, m)
    },
    typeName (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.name : ''
    },
    typeColor (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.color : '#c5c8ce'
    },
    checkChange (index, type) {
      const v = !type.show
      showToolSetting(type.id, v).then(({ data, status }) => {
        type.show = v
      })
    },
    completeEdit () {
      this.buttonEdit = false
      this.selectedType = 0
      this.fetchData()
    },
    //  创建会议
    createMeeting () {
      this.createMeet = true
    },
    totalMeeting () {
      this.$router.push({
        path: '/all-meeting'
      })
    },
    visibleDetails () {
      // this.meetingDetails = true
    },
    createMeeted (val) {
      this.createMeet = val
    }
  }
}
</script>
<style scoped>
  .meeting-content {
    width: 50%;
  }
</style>
