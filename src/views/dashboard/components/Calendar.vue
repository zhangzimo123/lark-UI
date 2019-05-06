<!--<template>-->
  <!--<Card class=" rightAngle" style="height: 400px">-->
    <!--<div class="panel-card-header" slot="title">-->
      <!--<span class="panel-card-title panel-card-title-position">{{ title }}</span>-->
      <!--<span class="panel-card-extra">-->
        <!--<i-button-->
          <!--type="text"-->
          <!--class="card-all"-->
        <!--&gt;全部</i-button>-->
      <!--</span>-->
      <!--<span v-show="eventIconRow" class="cal-icon-row">-->
        <!--<img v-show="editIconRow" class="cal-icon" src="@/assets/images/icon/edit.jpg" @click="editItem" />-->
        <!--<img class="cal-icon" src="@/assets/images/icon/delete.jpg" @click="deleteItem" />-->
        <!--<img class="cal-icon" src="@/assets/images/icon/add.jpg" @click="addItem" />-->
      <!--</span>-->
      <!--<Modal v-model="addOrEditItemModal" class="cal-item-modal" :styles="{top: '30%',width:'720px'}" >-->
        <!--<div slot="header" class="cal-item-modal-header">-->
          <!--<span class="cal-item-modal-title">-->
            <!--<img class="cal-item-modal-clock-icon" src="@/assets/images/icon/clock.png"/>-->
            <!--{{ calModalTitle }}-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="cal-item-modal-box">-->
          <!--<div class="cal-item-modal-left">-->
            <!--<div class="cal-item-modal-date">待办事项日期</div>-->
            <!--<div><DatePicker v-model="itemDate" type="date" placeholder="待办事项日期" style="width: 200px"></DatePicker></div>-->
          <!--</div>-->
          <!--<div class="cal-item-modal-right">-->
            <!--<div class="cal-item-modal-date">起始时间（非必填）</div>-->
            <!--<div>-->
              <!--<DatePicker type="date" placeholder="起始日期" style="width: 200px"></DatePicker>-->
              <!--<span class="cal-item-modal-across">—</span>-->
              <!--<TimePicker type="time" placeholder="终止时间" style="width: 168px"></TimePicker>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="cal-item-modal-detail-box">-->
            <!--<div class="cal-item-modal-detail-title">待办详情</div>-->
            <!--<div class="cal-item-modal-detail-content">-->
              <!--<Input v-model="itemDetailContent" type="textarea" placeholder="输入待办详情" :autosize="{minRows: 5}" />-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div slot="footer">-->
          <!--<Button class="cal-item-modal-cancel" @click="cancelBtn">取消</Button>-->
          <!--<Button class="cal-item-modal-save" @click="saveBtn">保存</Button>-->
        <!--</div>-->
      <!--</Modal>-->
      <!--<Modal-->
        <!--title="提示"-->
        <!--v-model="deleteModal"-->
        <!--:styles="{top: '30%'}">-->
        <!--<div class="cal-delete-modal-text">是否确认删除{{ deleteData }}待办事项？</div>-->
      <!--</Modal>-->
    <!--</div>-->
    <!--<div style="height:220px;">-->
      <!--<div style="height:220px;">-->
        <!--<vue-cal-->
          <!--class="vuecal&#45;&#45;rounded-theme  vuecal&#45;&#45;blue-theme"-->
          <!--xsmall-->
          <!--hide-view-selector-->
          <!--:time="false"-->
          <!--default-view="month"-->
          <!--style="height: 330px"-->
          <!--:disable-views="['week']"-->
          <!--:events="events"-->
          <!--:locale="locale"-->
          <!--@day-focus="dayFocusEvents('day-focus', $event)"-->
          <!--@event-mouse-enter="eventMouseEnter('event-mouse-enter', $event)"-->
          <!--@event-mouse-leave="eventMouseLeave('event-mouse-leave', $event)"-->
        <!--&gt;-->
        <!--</vue-cal>-->
      <!--</div>-->
    <!--</div>-->
  <!--</Card>-->
<!--</template>-->
<!--<script>-->
<!--// 需要配置webpack的externals，而且需要引入［https://github.com/xiaobinwu/calendar.js］-->
<!--// import { calendar } from 'calendar'-->
<!--import VueCal from 'vue-cal'-->
<!--import 'vue-cal/dist/vuecal.css'-->
<!--import Scroll from 'iview/src/components/scroll/scroll.vue'-->
<!--export default {-->
  <!--components: {-->
    <!--Scroll,-->
    <!--VueCal },-->
  <!--data () {-->
    <!--return {-->
      <!--title: '日历墙',-->
      <!--locale: 'zh-cn',-->
      <!--events: [-->
        <!--{-->
          <!--start: '2019-04-01',-->
          <!--end: '2019-04-01',-->
          <!--title: '愚人节',-->
          <!--content: '<i class ="v-icon material-icons">今天是愚人节 </i>',-->
          <!--class: 'blue-event'-->
        <!--},-->
        <!--{-->
          <!--start: '2019-04-01',-->
          <!--end: '2019-04-01',-->
          <!--title: '会议召开',-->
          <!--content: '<i class ="v-icon material-icons"> 下午有会议召开 </i>',-->
          <!--class: 'blue-event'-->
        <!--},-->
        <!--{-->
          <!--start: '2019-3-1',-->
          <!--end: '2019-3-2',-->
          <!--title: 'PLAN C',-->
          <!--content: '<i class ="v-icon material-icons"> PLAN B CONTENT </i>',-->
          <!--class: 'blue-event'-->
        <!--}-->
      <!--],-->
      <!--addOrEditItemModal: false,-->
      <!--calModalTitle: '',-->
      <!--deleteModal: false,-->
      <!--eventIconRow: false,-->
      <!--editIconRow: false,-->
      <!--deleteData: '',-->
      <!--itemDate: '',-->
      <!--itemDetailContent: ''-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--addItem () {-->
      <!--this.calModalTitle = '添加待办事项'-->
      <!--this.addOrEditItemModal = true-->
      <!--this.itemDetailContent = ''-->
    <!--},-->
    <!--editItem () {-->
      <!--this.calModalTitle = '编辑待办事项'-->
      <!--this.addOrEditItemModal = true-->
    <!--},-->
    <!--deleteItem () {-->
      <!--this.deleteModal = true-->
    <!--},-->
    <!--dayFocusEvents (event, e) {-->
      <!--console.log('dayFocusEvents e:', e)-->
      <!--this.deleteData = this.formatDate(e)-->
      <!--this.itemDate = this.formatDate(e)-->
      <!--this.eventIconRow = true-->
    <!--},-->
    <!--eventMouseEnter (event, e) {-->
      <!--console.log('eventMouseEnter e:', e)-->
      <!--this.editIconRow = true-->
      <!--this.itemDetailContent = e.content.replace(/<.+?>/g, '')-->
    <!--},-->
    <!--eventMouseLeave (event, e) {-->
      <!--console.log('eventMouseEnter e:', e)-->
      <!--this.editIconRow = false-->
    <!--},-->
    <!--formatDate (date) {-->
      <!--const y = date.getFullYear()-->
      <!--let m = date.getMonth() + 1-->
      <!--m = m < 10 ? '0' + m : m-->
      <!--let d = date.getDate()-->
      <!--d = d < 10 ? ('0' + d) : d-->
      <!--return y + '-' + m + '-' + d-->
    <!--},-->
    <!--cancelBtn () {-->
      <!--this.addOrEditItemModal = false-->
    <!--},-->
    <!--saveBtn () {-->
      <!--this.addOrEditItemModal = false-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
  <!--.rightAngle{-->
    <!--border-radius: 0px 0px 0px 0px;-->
  <!--}-->
  <!--#cal {-->
    <!--width: 562px;-->
    <!--font-size: 12px;-->
  <!--}-->
  <!--#top {-->
    <!--height: 40px;-->
    <!--line-height: 40px;-->
    <!--clear: both;-->
  <!--}-->
  <!--input{-->
    <!--padding: 0;-->
  <!--}-->
  <!--.step {-->
    <!--float: right;-->
    <!--font-size: 16px;-->
  <!--}-->
  <!--i{-->
    <!--cursor: pointer;-->
    <!--font-size: 22px;-->
  <!--}-->
  <!--#prev{-->
    <!--margin-right: 10px;-->
  <!--}-->

  <!--.select {-->
    <!--float: left;-->
  <!--}-->
  <!--select{-->
    <!--height: 25px;-->
    <!--width: 100px;-->
  <!--}-->

  <!--#wk {-->
    <!--margin: 0;-->
    <!--padding: 0;-->
    <!--height: 35px;-->
    <!--color: #888;-->
    <!--font-size: 14px;-->
  <!--}-->
  <!--li {-->
    <!--float: left;-->
    <!--width: 80px;-->
    <!--text-align: center;-->
    <!--line-height: 25px;-->
    <!--list-style: none;-->
  <!--}-->
  <!--b{-->
    <!--font-weight: normal;-->
    <!--color: #429e6c;-->
  <!--}-->

  <!--#cm {-->
    <!--padding-bottom: 15px;-->
    <!--border: 1px dashed #eee;-->
    <!--clear: left;-->
    <!--position: relative;-->
  <!--}-->
  <!--.cell {-->
    <!--position: absolute;-->
    <!--width: 42px;-->
    <!--height: 36px;-->
    <!--text-align: center;-->
    <!--margin: 0 0 0 19px;-->
    <!--cursor: pointer;-->
  <!--}-->
  <!--.so{-->
    <!--font: 16px arial;-->
  <!--}-->

  <!--#bm {-->
    <!--text-align: right;-->
    <!--height: 30px;-->
    <!--line-height: 30px;-->
    <!--clear: both;-->
    <!--padding: 5px 0;-->
    <!--font-size: 14px;-->
  <!--}-->
  <!--.heavenly-branch{-->
    <!--color: #429e6c;-->
    <!--float: left;-->
  <!--}-->
  <!--#now-date{-->
    <!--float: right;-->
    <!--padding: 0px 10px;-->
    <!--background-color: #429e6c;-->
    <!--color: #fff;-->
    <!--font-size: 14px;-->
    <!--height: 20px;-->
    <!--line-height: 20px;-->
    <!--margin-top: 6px;-->
    <!--text-decoration: none;-->
    <!--border-radius: 10px;-->
  <!--}-->

  <!--#fd {-->
    <!--display: none;-->
    <!--position: absolute;-->
    <!--border: 1px solid #dddddf;-->
    <!--background: #fff;-->
    <!--color: #333;-->
    <!--padding: 10px;-->
    <!--line-height: 21px;-->
    <!--width: 150px;-->
    <!--border-radius: 10px;-->
  <!--}-->
  <!--/*&:before{*/-->
     <!--/*content: '';*/-->
     <!--/*position: absolute;*/-->
     <!--/*left: -8px;*/-->
     <!--/*width: 0;*/-->
     <!--/*height: 0;*/-->
     <!--/*border-top: 8px solid transparent;*/-->
     <!--/*border-right: 8px solid #dddddf;*/-->
     <!--/*border-bottom: 8px solid transparent;*/-->
   <!--/*}*/-->
  <!--/*&:after{*/-->
     <!--/*content: '';*/-->
     <!--/*position: absolute;*/-->
     <!--/*left: -6px;*/-->
     <!--/*top: 10px;*/-->
     <!--/*width: 0;*/-->
     <!--/*height: 0;*/-->
     <!--/*border-top: 8px solid transparent;*/-->
     <!--/*border-right: 8px solid #fff;*/-->
     <!--/*border-bottom: 8px solid transparent;*/-->
   <!--/*}*/-->
  <!--b{-->
    <!--font-weight: normal;-->
    <!--color: #429e6c;-->
  <!--}-->

<!--</style>-->
