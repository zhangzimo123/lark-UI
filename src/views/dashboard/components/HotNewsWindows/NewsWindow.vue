<template>
  <a-card
    :headStyle="headStyle"
    :bordered="true"
    :style="{ height: '306px'}"
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
        <a-icon type="close" style="color: #516efc"/>
      </a>
    </a-popover>

    <div style="height:205px;overflow-y:auto;overflow-x: hidden">
      <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
        <i class="ivu-tag-dot-inner"></i>
        <span style="color:#666666;" class="content-adpat">{{ row.name }}</span>
        <span style="color:#999999" class="right">{{ row.date }}</span>
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
      headStyle: { height: '52px', 'border-bottom': 'none' },
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
        vm.list = [].concat(data.content).slice(0, 5)
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
  .content-adpat{
    width: 70%;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
</style>
