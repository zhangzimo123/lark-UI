<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '300px'}"
    >
      <div slot="title">
        <a-row>
          <a-col>
            <span style="color: #333333;font-weight:bold">
              {{ title }}
            </span>
            <categoryTools v-model="selectedType" :array="typeArray" @changed="fetchData"></categoryTools>
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
          <!--<a-icon type="close" />-->
          <!--<a-icon type="plus" style="color: #516efc"/>-->
          <img style="width: 14px;height: 14px;" :src=" require('@/assets/more.jpg')" />
        </a>
      </a-popover>
      <div style="height:205px;overflow-y:auto;overflow-x: hidden">
        <a-row type="flex" v-for="(row,index) in showList" :key="'item'+index" class="row-magin">
          <a-col :span="15">
            <i class="ivu-tag-dot-inner"></i>
            <a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
            <span style="color: #666666" class="content-adpat">{{ row.content }}</span>
          </a-col>
          <a-col :span="6">
            <a-progress style="color: #666666" :percent="row.percent" />
          </a-col>
          <a-col :span="3">
            <span style="color: #999999" class="right">{{ row.date }}</span>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>
<script>
import CategoryTools from '../category-tools'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    CategoryTools
  },
  data () {
    return {
      title: '仿真台',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      typeArray: [
        { type: 1, name: '新创建', show: true, color: '#516EFC' },
        { type: 2, name: '进行中', show: true, color: '#f49D2a' },
        { type: 3, name: '已完成', show: true, color: '#e8e8e8' }
      ],
      typeMap: {},
      selectedType: 0,
      selectedRow: {},
      showDetails: false
    }
  },
  created () {
    this.fetchToolStatus()
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
    fetchToolStatus () {
      const vm = this
      vm.setStatusMap()
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
  }
  .content-adpat{
    width: 50%;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
</style>
