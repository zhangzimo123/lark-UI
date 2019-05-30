<template>
  <div style="height:205px;">
    <a-row v-for="(item,index) in showList" :key="'item'+index" class="row-magin">
      <i class="ivu-tag-dot-inner"></i>
      <span @click="visibleModal(item)" class="content-adpat" style="color: #666666;" >{{ item.name }}</span>
      <span style="color: #999999" class="right">{{ item.time }}</span>
      <span style="color: #999999" class="right">{{ item.date }}</span>
    </a-row>
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
      title: '其他',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      modal: false,
      rowDetails: '',
      list: []
    }
  },
  created () {
  },
  methods: {
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
  .row-magin{
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
