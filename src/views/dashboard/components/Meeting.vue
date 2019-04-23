<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ minHeight: '300px'}">
      <div slot="title">
        <a-row>
          <a-col>
            {{ title }}
            <categoryTools :array="typeArray" @changed="fetchData"></categoryTools>
            <a-button class="createMeetClass" size="small" @click="createMeeting">创建会议</a-button>
            <create-meeting :createMeeted="createMeet" @createMeeted="createMeeted"></create-meeting>
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
      <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
        <i class="ivu-tag-dot-inner"></i>
        <a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
        <span @click="visibleModal(row)" >{{ row.name.length> 22 ? row.name.replace(/^(.{20})(.*)$/,'$1...') : row.name }}</span>
        <span class="right">{{ row.date }}</span>
        <a-modal
          v-model="modal"
          footer=""
          title="会议详细">
          <p>{{ rowDetails.name }}</p>
        </a-modal>
      </a-row>
      <div v-if="list.size==0" style="margin: 40px auto 0 auto;text-align: center;" class="card-content">
        <a-icon type="file-exclamation" theme="twoTone" :style="fontSize"/>
        <p class="description">卡片暂无内容</p>
      </div>
    </a-card>
  </div>
</template>
<script>
import { getMeetings } from '../../../api/dashboard'
import categoryTools from '../category-tools'
import createMeeting from '../create-meeting'
import '../modal-mask.css'

export default {
  data () {
    return {
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      title: '会议室',
      showTableHeader: true,
      selectedType: 0,
      buttonEdit: false,
      modal: false,
      rowDetails: {},
      typeArray: [
        // { type: 1, name: '未开始', show: true },
        // { type: 2, name: '进行中', show: true },
        // { type: 3, name: '已结束', show: true }
        {
          id: 1,
          type: 1,
          name: '未开始',
          color: 'blue',
          colorType: 'primary',
          show: true
        },
        {
          id: 2,
          type: 2,
          name: '进行中',
          color: 'orange',
          colorType: 'waring',
          show: true
        },
        {
          id: 3,
          type: 3,
          name: '已结束',
          color: '#e8e8e8',
          colorType: 'default',
          show: true
        }
      ],
      typeMap: {},
      list: [],
      createMeet: false,
      meetingDetails: false
    }
  },
  components: {
    getMeetings,
    categoryTools,
    createMeeting
  },
  created () {
    this.fetchData()
    this.setToolStatus()
  },
  computed: {},
  methods: {
    fetchData (type) {
      if (type === undefined) {
        type = 0
      }
      var vm = this
      getMeetings(type).then((data, status) => {
        vm.list = data.content.filter(item => {
          return item.type === type || type === 0
        })
        // vm.list = [].concat(data.content.splice(0, 6))
      })
    },
    setToolStatus () {
      const m = {}
      this.typeArray.forEach(item => {
        m['type-' + item.type] = item
      })
      this.typeMap = Object.assign({}, m)
    },
    typeColor (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.color : '#c5c8ce'
    },
    typeName (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.name : ''
    },
    //  创建会议
    createMeeting () {
      this.createMeet = true
    },
    createMeeted (val) {
      this.createMeet = val
    },
    visibleModal (row) {
      this.modal = true
      this.rowDetails = row
    }

  }
}
</script>
<style scoped>
  .right {
    float: right;
    margin-right: 3px;
  }

  .row-magin {
    margin-bottom: 12px;
  }
  .createMeetClass{
    float: right;
    margin-right: 15px;
  }
  .ivu-tag-dot-inner {
    height: 6px;
    width: 6px;
    background-attachment: scroll;
    background-clip: border-box;
    background-color: rgb(45, 140, 240);
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
    color: rgb(81, 90, 110);
    cursor: pointer;
    display: inline-block;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, \5FAE软雅黑, Arial, sans-serif;
    font-size: 1px;
    margin-right: 8px;
    position: relative;
    top: -2px;
  }
  .row-tag{
    font-size: 12px;
  }
</style>
