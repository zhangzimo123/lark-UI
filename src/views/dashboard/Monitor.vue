<template>
  <div class="lark-monitor">
    <a-spin :spinning="loaded === false" size="large" style="margin-top: 25%;margin-left: 50%" >
    </a-spin>
    <div v-if="loaded" class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="isDesktop() ? 'desktop' : ''">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="52"
        :max-rows="12"
        :is-draggable="true"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="grid in layout"
          dragIgnoreFrom=".ant-card-body"
          :minH="cardSize.minH"
          :maxH="cardSize.maxH"
          :minW="grid.minW"
          :key="grid.id"
          :x="grid.x"
          :y="grid.y"
          :w="grid.w"
          :h="grid.h"
          :i="grid.i"
          @move="moveEvent"
          @moved="movedEvent"
          @resize="resizeEvent"
          @changeLayout="changeLayout"
        >
          <Message
            v-if="grid.is==='message'"
            :headStyle="headStyle"
            :data="monitor[grid.is]"
            @myChartSize="myChartSize"
            @showChatPanel="showChatPanel"
            @remove="grid.show=false">
          </Message>
          <TodoList
            v-if="grid.is==='todo'"
            :headStyle="headStyle"
            :data="monitor[grid.is]"
            @myChartSize="myChartSize"
            @showChatPanel="showChatPanel"
            @remove="grid.show=false">
          </TodoList>
          <MyCollect
            v-if="grid.is==='mycollect'"
            :headStyle="headStyle"
            :data="monitor[grid.is]"
            @myChartSize="myChartSize"
            @showChatPanel="showChatPanel"
            @remove="grid.show=false">
          </MyCollect>
          <Calendar
            v-if="grid.is==='calendar'"
            :headStyle="headStyle"
            :data="monitor[grid.is]"
            @myChartSize="myChartSize"
            @showChatPanel="showChatPanel"
            @remove="grid.show=false">
          </Calendar>
          <WorkSituation
            v-if="grid.is==='worksituation'"
            :headStyle="headStyle"
            :data="monitor[grid.is]"
            @myChartSize="myChartSize"
            @showChatPanel="showChatPanel"
            @remove="grid.show=false">
          </WorkSituation>
        </grid-item>
      </grid-layout>
    </div>
    <!--这个地方放置最近访问-->
    <footer-tool-bar v-if="loaded" :style="{height:'64px', width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <img class="addLinkIcon" :src=" require('@/assets/add-group.png')" @click="showModal" />
      <link-footer :data="linkList" />
    </footer-tool-bar>
    <div>
      <my-chat-panel class="myChatPanel" :myChatPanelIsShow="myChatPanelIsShow" ref="chatPanel" />
      <search-window :searchWindowIsShow="searchWindowIsShow" :tree="tree" />
    </div>
    <setting-drawer :layout="layout" :visible="settingDrawerVisible" @closeToggle="closeToggle"/>
    <a-modal
      :visible="addLinkIconVisible"
      title="新增链接"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
      >
        <a-form-item
          label="图片地址"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-model="img"
            v-decorator="['img',{rules: [{ required: true, message: '请输入图片地址!' }]}]"
          />
        </a-form-item>
        <a-form-item
          label="打开链接"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-model="link"
            v-decorator="['link',{rules: [{ required: true, message: '请输入打开链接!' }]}]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { MonitorData } from '@/api/dashboard'
import { mixin, mixinDevice } from '@/utils/mixin'
import FooterToolBar from '@/components/FooterToolbar'
import MyChatPanel from '@/components/ChatBox/MyChatPanel'
import SearchWindow from '@/components/ChatBox/SearchWindow'
import VueGridLayout from 'vue-grid-layout'
import Discuss from './components/Discuss.vue'
import Meeting from './components/Meeting'
import TodoPlanTask from './components/TodoPlanTask'
import ResourceKnowledgeModel from './components/ResourceKnowledgeModel.vue'
import Simulation from './components/Simulation.vue'
import Datas from './components/Datas.vue'
import Stat from './components/Stat.vue'
import Calendar from './components/Calendar.vue'
import PDMTDM from './components/PDM-TDM.vue'
import Tool from './components/Tool.vue'
import HotNewsWindows from './components/HotNewsWindows'
import HotNews from './components/HotNewsWindows/HotNews'
import NewsWindow from './components/HotNewsWindows/NewsWindow'
import MyCollect from './components/MyCollect'
import Message from './components/Message'
import TodoList from './components/TodoList'
import LinkFooter from './components/Link.vue'
import WorkSituation from './components/WorkSituation.vue'
import Utils from '../../../src/utils/utils.js'
import SettingDrawer from './components/SettingDrawer.vue'
import './components/monitor.less'
// 工作台看板模拟数据
var layoutCards = [
  { 'x': 0, 'y': 0, 'w': 6, 'h': 7, 'i': '0', 'title': '消息', is: 'message', show: true, minW: 4 },
  { 'x': 6, 'y': 0, 'w': 6, 'h': 7, 'i': '1', 'title': '待办', is: 'todo', show: true, minW: 4 },
  { 'x': 0, 'y': 5, 'w': 6, 'h': 7, 'i': '2', 'title': '我的收藏', is: 'mycollect', show: true, minW: 4 },
  { 'x': 6, 'y': 5, 'w': 6, 'h': 7, 'i': '3', 'title': '日历墙', is: 'calendar', show: true },
  { 'x': 0, 'y': 10, 'w': 12, 'h': 7, 'i': '4', 'title': '工作情况', is: 'worksituation', show: true, minW: 4 }
  // { 'x': 6, 'y': 5, 'w': 6, 'h': 5, 'i': '5', 'title': '资源池', is: 'resource-knowledge-model', show: true, minW: 4 },
  // { 'x': 0, 'y': 10, 'w': 6, 'h': 5, 'i': '6', 'title': '仿真台', is: 'simulation', show: false, minW: 4 },
  // { 'x': 6, 'y': 10, 'w': 6, 'h': 5, 'i': '7', 'title': '数据板', is: 'datas', show: false, minW: 4 },
  // { 'x': 0, 'y': 15, 'w': 12, 'h': 5, 'i': '8', 'title': '统计板', is: 'stat', show: false, minW: 12 },
  // { 'x': 0, 'y': 20, 'w': 6, 'h': 5, 'i': '9', 'title': 'PDM-TDM', is: 'PDMTDM', show: false, minW: 4 },
  // { 'x': 6, 'y': 20, 'w': 6, 'h': 5, 'i': '10', 'title': '工具仓', is: 'tool', show: false, minW: 4 },
  // { 'x': 0, 'y': 25, 'w': 12, 'h': 5, 'i': '11', 'title': '热点咨讯', is: 'HotNewsWindows', show: false, minW: 12 }
]
var historyLayout = [
  { 'x': 0, 'y': 0, 'w': 6, 'h': 5, 'i': '0', 'title': '消息', is: 'message' },
  { 'x': 6, 'y': 0, 'w': 6, 'h': 5, 'i': '1', 'title': '待办', is: 'todo' },
  { 'x': 0, 'y': 5, 'w': 6, 'h': 5, 'i': '2', 'title': '我的收藏', is: 'mycollect' },
  { 'x': 6, 'y': 5, 'w': 6, 'h': 5, 'i': '3', 'title': '日历墙', is: 'calendar' },
  { 'x': 0, 'y': 10, 'w': 12, 'h': 5, 'i': '4', 'title': '工作情况', is: 'worksituation' }
]
// 工作台看板模拟数据
export default {
  name: 'Monitor',
  mixins: [mixin, mixinDevice],
  data () {
    return {
      loaded: false,
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      fontSize: { fontSize: '52px' },
      resourceSize: '',
      visible: false,
      settingDrawerVisible: false,
      layout: layoutCards,
      cardSize: { maxH: 5, minH: 5, maxW: 12, minW: 3 },
      myChatPanelIsShow: false,
      searchWindowIsShow: false,
      hisGridI: -1,
      curBox: '',
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
                      },
                      {
                        title: '旺仔研究员5',
                        key: '0-1-0-2-2',
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
      },
      monitor: {},
      linkList: {
        content: [
          {
            img: require('@/assets/links/abaqus.png')
          },
          {
            img: require('@/assets/links/actran.png')
          },
          {
            img: require('@/assets/links/adams.png')
          },
          {
            img: require('@/assets/links/ansoft.png')
          },
          {
            img: require('@/assets/links/ansys.png')
          },
          {
            img: require('@/assets/links/Arbortext.png')
          },
          {
            img: require('@/assets/links/e3.png')
          }
        ],
        total: 20
      },
      addLinkIconVisible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      img: '',
      link: ''
      // items: generateItems(50, i => ({ id: i, data: 'Draggable' + i }))
    }
  },
  components: {
    Discuss,
    Meeting,
    ResourceKnowledgeModel,
    LinkFooter,
    FooterToolBar,
    MyChatPanel,
    Simulation,
    WorkSituation,
    // plan,
    // task,
    TodoPlanTask,
    Datas,
    Stat,
    Calendar,
    PDMTDM,
    Tool,
    HotNewsWindows,
    HotNews,
    NewsWindow,
    MyCollect,
    Message,
    TodoList,
    // TreeCustom,
    // Container,
    // Draggable,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    //    meeting,
    //    todo,
    SearchWindow,
    SettingDrawer
  },
  created () {
    this.fetchMonitor()
  },
  mounted () {
    const self = this
    if (self.$route.params.setFlag) {
      self.settingDrawerVisible = self.$route.params.setFlag
    }
    if (self.$route.params.messageFlag) {
      self.myChatPanelIsShow = self.$route.params.messageFlag
    }
    Utils.$on('message', function (msg) {
      console.log(msg)
      self.openMyChatPanel()
    })
    Utils.$on('set', function (msg) {
      console.log(msg)
      self.toggle()
    })
  },
  methods: {
    fetchMonitor () {
      const vm = this
      MonitorData([]).then(data => {
        vm.monitor = Object.assign({}, data.data)
        vm.loaded = true
        console.log('vm.monitor', vm.monitor)
      })
    },
    // onDrop (dropResult) {
    //   this.items = applyDrag(this.items, dropResult)
    // }
    openMyChatPanel () {
    // this.myChatPanelIsShow = true
      this.myChatPanelIsShow = !this.myChatPanelIsShow
    },
    toggle () {
      this.settingDrawerVisible = true
    },
    closeToggle () {
      this.settingDrawerVisible = false
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
    },
    showChatPanel (param) {
      this.$refs.chatPanel.showChat(param)
      console.log('param:', param)
    },
    /*
      * 移动方法
      * */
    watchitem: function (item) {
      if (this.curBox !== item.i) {
        for (let j = 0; historyLayout[j] !== undefined; j++) {
          if (historyLayout[j].i === item.i) {
            item.x = historyLayout[j].x
            item.y = historyLayout[j].y
          }
        }
      }
      return item
    },
    toChangePosition: function (i) {
      const layout = this.layout
      const hisLayout = historyLayout
      for (let j = 0; j < layout.length; j++) {
        if (layout[j].i === i) {
          const item = layout[j] // 最新数组
          for (let k = 0; k < hisLayout.length; k++) {
            if (hisLayout[k].i === i) {
              const hisItem = hisLayout[k]
              const beforeX = hisItem.x
              const beforeY = hisItem.y
              for (let n = 0; n < hisLayout.length; n++) {
                if (item.x === hisLayout[n].x && item.y === hisLayout[n].y) {
                  this.hisGridI = hisLayout[n].i
                  layout[this.hisGridI].x = beforeX
                  layout[this.hisGridI].y = beforeY
                  hisLayout[n].x = layout[this.hisGridI].x
                  hisLayout[n].y = layout[this.hisGridI].y
                }
              }
              // const beforeX = hisItem.x
              // const beforeY = hisItem.y
              // const afterX = item.x
              // const afterY = item.y
              hisItem.x = item.x
              hisItem.y = item.y
            }
          }
        }
      }
    },
    moveEvent: function (i, newX, newY, e) {
      // this.curBox = i
      // console.log(e)
      console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    movedEvent: function (i, newX, newY, e) {
      this.toChangePosition(i)
      // console.log(e)
      console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    resizeEvent: function (i, newH, newW, newHPx, newWPx) {
      console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx)
      this.resourceSize.resize()
      // if (i === '2') {
      //   this.cardSize.minW = 4
      // }
      // if (i === '4') {
      //   this.cardSize.minW = 4
      // }
      // if (i === '6') {
      //   this.cardSize.minW = 12
      // }
      // if (i === '9') {
      //   this.cardSize.minW = 12
      // }
    },
    myChartSize (data) {
      console.log(data)
      this.resourceSize = data
    },
    changeLayout (index, flag) {
      this.layout[index].show = flag
    },
    showModal () {
      this.addLinkIconVisible = true
      this.form.setFieldsValue({
        'img': '',
        'link': ''
      })
    },
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        this.confirmLoading = true
        if (!err) {
          setTimeout(() => {
            this.addLinkIconVisible = false
          }, 2000)
        }
        this.confirmLoading = false
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.addLinkIconVisible = false
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
    top: 25px;
    right: 211px;
    z-index: 999;
    /*background: rgba(105,105,105,0.75);*/
    border-radius: 25px;
    display: flex;
    align-items: center;
    /*padding: 5px 18px 5px 5px;*/
  }
  .myWorkSetButton{
    position: fixed;
    top: 21px;
    right: 250px;
    z-index: 999;
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
<style scoped>

  .panel-content-row {
    height: 35px;
    padding: 5px 0 8px 0;
    margin: -4px 0 8px 0;
  }

  .panel-content-row > .row-content {
    width: 70%;
    text-overflow: ellipsis;
     -o-text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }
  .ant-card-body-inner{
    padding: 0 !important;
    margin: 0 !important;
  }
  .ant-card-list-item {
    padding: 5px 0 4px 0 !important;
  }

  .row-title {
    color: #17233d;
    font-size: 18px;
  }

  .row-content {
    color: #515a6e;
    font-size: 18px;
  }

  .panel-content-row > .row-tag {
    position: relative;
    bottom: 10px;
  }

  .panel-content-row > .ivu-col > .row-tag {
    position: relative;
    bottom: 1px;
  }

  .row-tag {
    font-size: 16px;
  }

  div.circle {
    border-radius: 10px;
  }

  .datetime {
    color: #999999;
  }

  .as-link {
    cursor: pointer;
  }

  .right {
    float: right;
    margin-right: 10px;
  }

  .panel-content-row > .ivu-tag-dot-inner {
    margin: 5px 5px 10px 0;
  }
  .ivu-tag {
    font-size: 16px;
  }
  .panel-content-row > .ivu-col > .ivu-tag-dot-inner {
    margin: 8px 5px 3px 0;
  }

  .ivu-tag-dot-inner {
    background-color: #00a5e2;
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
    font-size: 12px;
    line-height: 32px;
    margin-right: 8px;
    position: relative;
    top: 1px;
  }
  /*
   研讨厅徽标数
   */
  /*.ant-badge-count {*/
  /*top: -6px;*/
  /*height: 12px;*/
  /*border-radius: 10px;*/
  /*min-width: 1px;*/
  /*margin-right: 6px;*/
  /*width: 8px;*/
  /*background: #f5222d;*/
  /*color: #fff;*/
  /*line-height: 10px;*/
  /*!*text-align: center;*!*/
  /*!* padding: 0 6px; *!*/
  /*font-size: 8px;*/
  /*font-weight: normal;*/
  /*white-space: nowrap;*/
  /*-webkit-box-shadow: 0 0 0 1px #fff;*/
  /*box-shadow: 0 0 0 1px #fff;*/
  /*z-index: 10;*/
  /*}*/
  .ant-badge-count {
    top: -10px;
    height: 15px;
    border-radius: 10px;
    min-width: 15px;
    background: #f5222d;
    color: #fff;
    line-height: 15px;
    text-align: center;
    padding: 0 0 0 0;
    font-size: 12px;
    font-weight: normal;
    white-space: nowrap;
     -webkit-box-shadow: 0 0 0 1px #fff;
    box-shadow: 0 0 0 1px #fff;
    z-index: 10;
  }
  .ant-card-head {
    /* background: transparent; */
    /* border-bottom: 1px solid #e8e8e8; */
    padding: 0 12px;
    /* border-radius: 2px 2px 0 0; */
    zoom: 1;
    margin-bottom: -1px;
    min-height: 48px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .ant-radio-group {
    font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 12px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
     -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-block;
    line-height: unset;
  }
  .ant-card-body {
    padding: 16px;
    zoom: 1;
  }
  .addLinkIcon{
    width: 66px;
    height: 66px;
    border: 2px solid #2eabff;
    padding: 10px;
    border-radius: 10px;
    /*box-shadow: 0 0 5px #2eabff;*/
    margin: 10px 10px 5px 10px;
    float: left;
  }
</style>
