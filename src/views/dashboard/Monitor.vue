<template>
  <div style="margin-bottom: 64px">
    <!--<TreeCustom :label="tree.title" :headImg="tree.head" :treeData="tree.children" :depth="0" />-->
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
          <discuss :headStyle="headStyle" :loading="loading" v-if="grid.is === 'discuss'" />
          <todo-plan-task :headStyle="headStyle" :loading="loading" v-else-if="grid.is === 'todoPlanTask'" />
          <resource :headStyle="headStyle" :loading="loading" v-else-if="grid.is === 'resource'" />
          <Meeting :headStyle="headStyle" :loading="loading" v-else-if="grid.is === 'meeting'" />

        </grid-item>
      </grid-layout>
      <div class="myWorkShopIcon" @click="this.openMyChatPanel" v-show="!myChatPanelIsShow">
        <img class="myWorkShopIconImg" src="@/assets/sjs.jpg"/>
        <span class="myWorkShopIconTitle">我的研讨厅</span>
        <div class="myWorkShopIconInfoTip"></div>
      </div>
    </div>
    <!--这个地方放置最近访问-->
    <footer-tool-bar :style="{height:'72px', width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <link-footer />
    </footer-tool-bar>
    <div>
      <my-chat-panel class="myChatPanel" :myChatPanelIsShow="myChatPanelIsShow" />
      <search-window :searchWindowIsShow="searchWindowIsShow" :tree="tree" />
    </div>
  </div>
</template>

<script>
import './components/style.css'
import { mixin, mixinDevice } from '@/utils/mixin'
import FooterToolBar from '@/components/FooterToolbar'
import MyChatPanel from '@/components/ChatBox/MyChatPanel'
import SearchWindow from '@/components/ChatBox/SearchWindow'
// import TreeCustom from '@/components/ChatBox/TreeCustom'
// import { Container, Draggable } from 'vue-smooth-dnd'
// import { applyDrag, generateItems } from './utils'
import VueGridLayout from 'vue-grid-layout'
import Discuss from './components/Discuss.vue'
import Resource from './components/Resource.vue'
import LinkFooter from './components/Link.vue'
import Meeting from './components/Meeting'
// import plan from './components/Plan'
// import task from './components/Task'
import todoPlanTask from './components/TodoPlanTask'
// 工作台看板模拟数据
var layoutCards = [
  { 'x': 0, 'y': 0, 'w': 6, 'h': 5, 'i': '0', 'title': '研讨厅', is: 'discuss' },
  { 'x': 6, 'y': 0, 'w': 6, 'h': 5, 'i': '1', 'title': '待办事项', is: 'todoPlanTask' },
  { 'x': 0, 'y': 5, 'w': 6, 'h': 5, 'i': '2', 'title': '会议室', is: 'meeting' },
  { 'x': 6, 'y': 5, 'w': 6, 'h': 5, 'i': '3', 'title': '资源池', is: 'resource' }
]
// 工作台看板模拟数据
export default {
  name: 'Monitor',
  mixins: [mixin, mixinDevice],
  data () {
    return {
      loading: true,
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      fontSize: { fontSize: '52px' },
      visible: false,
      layout: layoutCards,
      cardSize: { maxH: 5, minH: 5, maxW: 12, minW: 3 },
      myChatPanelIsShow: false,
      searchWindowIsShow: false,
      tree: {
        title: '',
        key: '0',
        head: '',
        selectStatus: false,
        children: [
          {
            title: '科工二院一部（20）',
            key: '0-0',
            head: '',
            selectStatus: false,
            children: [
              {
                key: '0-0-0',
                title: '旺仔研究员1',
                head: require('@/assets/sjs.jpg'),
                selectStatus: false
              },
              {
                title: '旺仔研究员2',
                key: '0-0-1',
                head: require('@/assets/sjs.jpg'),
                selectStatus: false
              }
            ]
          },
          {
            title: '科工二院二部（20）',
            key: '0-1',
            head: '',
            selectStatus: false,
            children: [
              {
                title: '策划部（20）',
                key: '0-1-0',
                head: '',
                selectStatus: false,
                children: [
                  {
                    title: '策划部一分部（10）',
                    key: '0-1-0-2',
                    head: '',
                    selectStatus: false,
                    children: [
                      {
                        title: '旺仔研究员3',
                        key: '0-1-0-2-0',
                        head: require('@/assets/sjs.jpg'),
                        selectStatus: false
                      },
                      {
                        title: '旺仔研究员4',
                        key: '0-1-0-2-1',
                        head: require('@/assets/sjs.jpg'),
                        selectStatus: false
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
      // items: generateItems(50, i => ({ id: i, data: 'Draggable' + i }))
    }
  },
  components: {
    Discuss,
    Resource,
    LinkFooter,
    Meeting,
    FooterToolBar,
    MyChatPanel,
    // plan,
    // task,
    todoPlanTask,
    // TreeCustom,
    // Container,
    // Draggable,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    //    meeting,
    //    todo,
    SearchWindow
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
    openMyChatPanel () {
      this.myChatPanelIsShow = true
    },
    closeMyChatPanel () {
      this.myChatPanelIsShow = false
    },
    openSearchWindow () {
      this.searchWindowIsShow = true
    },
    closeSearchWindow () {
      this.searchWindowIsShow = false
    },
    searchAndChangeSelectStatus (obj, key, status) {
      const keyValue = key
      const statusValue = status
      if (obj && obj.key === key) {
        obj.selectStatus = status
      }
      if (obj && obj.key !== key) {
        if (obj.children) {
          obj.children.forEach(item => {
            this.searchAndChangeSelectStatus(item, keyValue, statusValue)
          })
        }
      }
    }
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
  .myWorkShopIcon{
    position: fixed;
    bottom: 36px;
    right: 100px;
    z-index: 999;
    background: rgba(105,105,105,0.75);
    border-radius: 25px;
    display: flex;
    align-items: center;
    padding: 5px 18px 5px 5px;
  }
  .myWorkShopIconImg{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .myWorkShopIconTitle{
    font-size: 15px;
    color: white;
    margin-left: 8px;
  }
  .myWorkShopIconInfoTip{
    background-color: red;
    position: absolute;
    z-index: 9999;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 5px;
    left: 35px;
  }
  .myChatPanel{
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
  }
</style>
