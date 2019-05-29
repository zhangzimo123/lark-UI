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
        <a-row v-for="(row,index) in showList" :key="'item'+index" class="row-magin">
          <i class="ivu-tag-dot-inner"></i>
          <a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
          <span style="color: #666666" class="content-adpat">{{ row.name }}</span>
          <span style="color: #999999" class="right">{{ row.time }}</span>
          <span style="color: #999999" class="right">{{ row.date }}</span>
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
      title: '我的收藏',
      showTableHeader: true,
      selectedType: 0,
      buttonEdit: false,
      modal: false,
      rowDetails: {},
      typeArray: [
        {
          id: 1,
          type: 1,
          name: '文件',
          color: '#516EFC',
          colorType: 'primary',
          show: true
        },
        {
          id: 2,
          type: 2,
          name: '图片',
          color: '#f49D2a',
          colorType: 'waring',
          show: true
        },
        {
          id: 3,
          type: 3,
          name: '文本',
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
  components: {},
  created () {
    this.setToolStatus()
  },
  computed: {
    showList () {
      const vm = this
      return this.data.content.filter(item => {
        return vm.selectedType === 0 || vm.selectedType === item.type
      }).slice(0, 8)
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
