<template>
  <div style="margin-bottom: 64px">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="isDesktop() ? 'desktop' : ''">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="52"
        :max-rows="12"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="grid in layout"
          dragIgnoreFrom=".card-content"
          :minH="cardSize.minH"
          :maxH="cardSize.maxH"
          :minW="cardSize.minW"
          :key="grid.id"
          :x="grid.x"
          :y="grid.y"
          :w="grid.w"
          :h="grid.h"
          :i="grid.i">
          <a-card
            :headStyle="headStyle"
            :loading="loading"
            :bordered="true"
            :title="grid.title"
            :style="{ minHeight: '300px' }">
            <a-popover
              placement="left"
              slot="extra"
              trigger="click">
              <template slot="content">
                <a>移除卡片</a>
              </template>
              <a href="#"><a-icon type="tool" /></a>
            </a-popover>

            <div v-if="talkData.length!=0" class="card-content">
              <a-list
                bordered
                :dataSource="talkData"
              >
                <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
                <div slot="header">Header</div>
                <div slot="footer">Footer</div>
              </a-list>
            </div>
            <div v-else style="margin: 40px auto 0 auto;text-align: center;" class="card-content">
              <a-icon type="file-exclamation" theme="twoTone" :style="fontSize" />
              <p class="description">卡片暂无内容</p>
            </div>
          </a-card>
        </grid-item>
      </grid-layout>
    </div>
    <!--这个地方放置最近访问-->
    <footer-tool-bar :style="{height:'72px', width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">

    </footer-tool-bar>
  </div>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
import FooterToolBar from '@/components/FooterToolbar'
// import { Container, Draggable } from 'vue-smooth-dnd'
// import { applyDrag, generateItems } from './utils'
import VueGridLayout from 'vue-grid-layout'

const talkData = [
]
// 工作台看板模拟数据
var layoutCards = [
  { 'x': 0, 'y': 0, 'w': 6, 'h': 5, 'i': '0', 'title': '研讨信息' },
  { 'x': 6, 'y': 0, 'w': 6, 'h': 5, 'i': '1', 'title': '待办事项' },
  { 'x': 0, 'y': 5, 'w': 6, 'h': 5, 'i': '2', 'title': '我的日程' },
  { 'x': 6, 'y': 5, 'w': 6, 'h': 5, 'i': '3', 'title': '我的资源' },
  { 'x': 0, 'y': 5, 'w': 6, 'h': 5, 'i': '2', 'title': '我的日程' },
  { 'x': 6, 'y': 5, 'w': 6, 'h': 5, 'i': '3', 'title': '我的资源' },
  { 'x': 0, 'y': 5, 'w': 6, 'h': 5, 'i': '2', 'title': '我的日程' },
  { 'x': 6, 'y': 5, 'w': 6, 'h': 5, 'i': '3', 'title': '我的资源' }
]
export default {
  name: 'Monitor',
  mixins: [mixin, mixinDevice],
  data () {
    return {
      loading: true,
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      fontSize: { fontSize: '52px' },
      talkData: talkData,
      visible: false,
      layout: layoutCards,
      cardSize: { maxH: 5, minH: 5, maxW: 12, minW: 3 }
      // items: generateItems(50, i => ({ id: i, data: 'Draggable' + i }))
    }
  },
  components: {
    FooterToolBar,
    // Container,
    // Draggable,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
    // onDrop (dropResult) {
    //   this.items = applyDrag(this.items, dropResult)
    // }
  }
}
</script>

<style lang="less" scoped>
  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;

    &.desktop div[class^=ant-col]:last-child {
      position: absolute;
      right: 0;
      height: 100%;
    }
  }
  .description{
    margin-top: 24px;
    color: gray;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
</style>
