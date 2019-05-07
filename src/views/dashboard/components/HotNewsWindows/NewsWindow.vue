<template>
  <a-card
    :headStyle="headStyle"
    :bordered="true"
    :style="{ height: '305px'}"
  >
    <div slot="title">
      <a-row>
        <a-col>
          {{ title }}
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
    <div style="height:205px;overflow-y:auto;overflow-x: hidden">
      <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
        <i class="ivu-tag-dot-inner"></i>
        <span>{{ row.name }}</span>
        <span class="right">{{ row.date }}</span>
      </a-row>
    </div>
    <div v-if="list.size==0" style="margin: 40px auto 0 auto;text-align: center;" class="card-content">
      <a-icon type="file-exclamation" theme="twoTone" :style="fontSize"/>
      <p class="description">卡片暂无内容</p>
    </div>
  </a-card>
</template>
<script>
import { getNews } from '../../../../api/news'
export default {
  data () {
    return {
      title: '咨讯窗',
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      list: [],
      detailsModal: false,
      detailsNews: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      var vm = this
      getNews().then((data) => {
        vm.list = [].concat(data.content).slice(0, 6)
      })
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
</style>
