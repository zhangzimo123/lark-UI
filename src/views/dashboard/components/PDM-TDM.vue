<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '306px'}"
    >
      <div slot="title">
        <a-row>
          <a-col>
            <span style="color:#333333;">
              {{ title }}
            </span>
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
          <a-icon type="close" />
        </a>
      </a-popover>
      <div>
        <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
          <i class="ivu-tag-dot-inner"></i>
          <a :href="row.link" target="_blank">
            <span style="color: #666666">{{ row.name }}</span>
          </a>
          <span style="color:#999999;" class="right">{{ row.date }}</span>
        </a-row>
      </div>
    </a-card>
  </div>
</template>
<script>
import { getPdmtdm } from '../../../api/pdmtdm'
export default {
  data () {
    return {
      title: 'PDM-TDM',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      showTableHeader: true,
      list: []
    }
  },
  components: {

  },
  created () {
    this.fetchData()
  },
  computed: {
    cardList () {
      return this.list.filter((item, index) => { return index < 8 })
    },
    showTypeArray () {
      return this.typeArray.filter(item => { return item.show })
    }
  },
  methods: {
    imageSrc (icon) {
      return this.publicPath + 'images/index/' + icon + '.jpg'
    },
    fetchData () {
      var vm = this
      getPdmtdm().then((data) => {
        console.log(data)
        vm.list = [].concat(data.content.splice(0, 5))
        console.log(data)
      })
    },
    openLink (row) {

    },
    toManagerPage () {
      this.$router.push({ path: '/data-manager' })
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
    top: -2px;
  }
</style>
