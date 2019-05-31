<template>
  <div style="height:205px;overflow-y:auto">
    <a-row class="row-magin" v-for="(row,index) in list" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <!--<a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>-->
      <span style="color: #666666" class="content-adpat">{{ row.name }}</span>
      <span class="right" color="#999999">{{ row.date }}</span>
    </a-row>
  </div>
</template>
<script>
import { knowledgeData } from '@/api/knowledge'
export default {
  data () {
    return {
      title: '知识角',
      selectedType: 0,
      typeArray: [
        { type: 1, name: '最新', show: true },
        { type: 2, name: '最热', show: true }
      ],
      knowledgeDetails: false,
      knowledgeDetailsContent: '',
      list: []
    }
  },
  created () {
    this.fetchKnowledge()
  },
  methods: {
    typeName (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.name : ''
    },
    typeColor (type) {
      if (type === 1) {
        return '#91d5ff'
      } else if (type === 2) {
        return '#ffd591'
      } else if (type === 3) {
        return '#ffbb96'
      } else {
        return '#c5c8ce'
      }
    },
    fetchKnowledge () {
      const vm = this
      knowledgeData().then(data => {
        vm.list = data.knowledge.content.slice(0, 5)
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
  .row-tag{
    font-size: 12px;
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
