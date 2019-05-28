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
            <category-tools :array="typeArray" :editable="false" :showAll="false" @changed="fetchData"/>
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
          <!--<a-icon type="plus" style="color: #516efc"/>-->
          <img style="width: 14px;height: 14px;" :src=" require('@/assets/more.jpg')" />
        </a>
      </a-popover>
      <div style="overflow-y: auto;height: 224px;">
        <div class="tool-icon" v-for="(row,index) in cardList" :key="'item'+index">
          <app-card :file="row"/>
        </div>
      </div>

    </a-card>
  </div>
</template>
<script>
import CategoryTools from '../category-tools'
import AppCard from '../app-card'
export default {
  components: {
    CategoryTools,
    AppCard
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      title: '工具仓',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      showTableHeader: true,
      selectedType: 1,
      typeArray: [
        { type: 1, name: '个人工具', show: true },
        { type: 2, name: '热门工具', show: true },
        { type: 3, name: '最新工具', show: true }
      ],
      list: []
    }
  },
  computed: {
    cardList () {
      return this.data.content.filter((item, index) => {
        return item.type === this.selectedType
      }).slice(0, 8)
    }
  },
  methods: {
    fetchData (type) {
      this.selectedType = type
    },
    loadData (result) {
      this.list = [].concat(result.content)
    }
  }
}
</script>
<style scoped>
  .tool-icon {
    width: 112px;
    height: 112px;
    /*margin: 0px 10px 0px 10px;*/
    margin: 0 4px 0 4px;
    float: left;
  }
</style>
