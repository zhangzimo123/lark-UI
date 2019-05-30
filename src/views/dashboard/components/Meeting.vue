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
            <a href="#"><a-icon type="plus-circle" class="createMeetClass" title="创建会议" @click="createMeeting"/></a>
            <categoryTools v-model="selectedType" :array="typeArray"></categoryTools>
            <create-meeting :createMeeted="createMeet" @createMeeted="createMeeted"></create-meeting>
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
        <a-row v-for="(row,index) in showList" :key="'item'+index" class="row-magin">
          <i class="ivu-tag-dot-inner"></i>
          <a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
          <span style="color: #666666" class="content-adpat" @click="visibleModal(row)" >{{ row.name }}</span>
          <span style="color: #999999" class="right">{{ row.date }}</span>
          <a-modal
            v-model="modal"
            footer=""
            title="会议详细">
            <a-row class="row-magin">
              <a-col>会议名称:&nbsp;{{ rowDetails.name }}</a-col>
            </a-row>
            <a-row class="row-magin">
              <a-col>开始时间:&nbsp;{{ rowDetails.date }}</a-col>
            </a-row>
            <a-row class="row-magin">
              <a-col>结束时间:&nbsp;{{ rowDetails.terminalTime }}</a-col>
            </a-row>
            <a-row class="row-magin">
              <a-col>会议地点:&nbsp;{{ rowDetails.locale }}</a-col>
            </a-row>
            <a-row class="row-magin">
              <a-col>会议人员:&nbsp;{{ rowDetails.member }}</a-col>
            </a-row>
            <a-row class="row-magin">
              <a-col>会议说明:&nbsp;{{ rowDetails.description }}</a-col>
            </a-row>
          </a-modal>
        </a-row>
      </div>
      <div v-if="data.content.size==0" style="margin: 40px auto 0 auto;text-align: center;" class="card-content">
        <a-icon type="file-exclamation" theme="twoTone" :style="fontSize"/>
        <p class="description">卡片暂无内容</p>
      </div>
    </a-card>
  </div>
</template>
<script>
import categoryTools from '../category-tools'
import createMeeting from '../create-meeting'
import '../modal-mask.css'

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
      title: '会议室',
      showTableHeader: true,
      selectedType: 0,
      buttonEdit: false,
      modal: false,
      rowDetails: {},
      typeArray: [
        {
          id: 1,
          type: 1,
          name: '未开始',
          color: '#516EFC',
          colorType: 'primary',
          show: true
        },
        {
          id: 2,
          type: 2,
          name: '进行中',
          color: '#f49D2a',
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
    categoryTools,
    createMeeting
  },
  created () {
    this.setToolStatus()
  },
  computed: {
    showList () {
      const vm = this
      return this.data.content.filter(item => {
        return vm.selectedType === 0 || vm.selectedType === item.type
      }).slice(0, 5)
    }
  },
  methods: {
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
    margin-top: 5px;
    float: right;
    margin-right: 15px;
    color: #516efc;
  }
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
    top: -7px;
  }
  .row-tag{
    font-size: 12px;
    position: relative;
    top: -5px;
  }
  .content-adpat{
    width: 55%;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
</style>
