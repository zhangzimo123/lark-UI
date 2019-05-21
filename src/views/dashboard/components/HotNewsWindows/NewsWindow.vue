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
      placement="left"
      slot="extra"
      trigger="click">
      <template slot="content">
        <a @click="$emit('remove')" style="color: #516efc">移除卡片</a>
      </template>
      <a href="#">
        <a-icon type="close" style="color: #516efc"/>
      </a>
    </a-popover>

    <div style="height:205px;overflow-y:auto;overflow-x: hidden">
      <a-row v-for="(row,index) in showList" :key="'item'+index" class="row-magin">
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
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: '咨讯窗',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      list: [],
      detailsModal: false,
      detailsNews: {}
    }
  },
  computed: {
    showList () {
      return this.data.content.slice(0, 5)
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
