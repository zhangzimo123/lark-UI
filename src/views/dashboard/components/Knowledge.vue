<template>
  <div style="height:205px;overflow-y:auto">
    <a-row class="row-magin" v-for="(row,index) in list" :key="'item'+index">
      <i class="ivu-tag-dot-inner"></i>
      <!--<a-tag class="row-tag circle" :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>-->
      <span >{{ row.name.length> 28 ? row.name.replace(/^(.{26})(.*)$/,'$1...') : row.name }}</span>
      <span class="right" color="#f50">{{ row.date }}</span>
    </a-row>
  </div>
</template>
<script>
import { getKnowledges } from '@/api/knowledge'
export default {
  components: {
  },
  data () {
    return {
      title: '知识角',
      showTableHeader: true,
      selectedType: 0,
      typeArray: [
        { type: 1, name: '最新', show: true },
        { type: 2, name: '最热', show: true }
      ],
      list: [],
      knowledgeDetails: false,
      knowledgeDetailsContent: ''
    }
  },
  created () {
    this.fetchData()
  },
  filters: {
  },
  methods: {
    fetchData (type) {
      if (type === undefined) {
        type = 0
      }
      var vm = this
      getKnowledges(type).then((data) => {
        vm.list = data.content.slice(0, 6)
      })
    },
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
  .row-tag{
    font-size: 12px;
  }
</style>
