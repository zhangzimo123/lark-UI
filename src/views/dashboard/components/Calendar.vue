<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ height: '420px'}">
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
        trigger="hover">
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
      <div>
        <vue-cal
          class="vuecal--rounded-theme  vuecal--blue-theme"
          xsmall
          hide-view-selector
          :time="false"
          default-view="month"
          style="height: 330px"
          :disable-views="['week']"
          :events="events"
          :locale="locale"
        >
        </vue-cal>
      </div>

    </a-card>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
  components: {
    VueCal },
  data () {
    return {
      title: '日历墙',
      locale: 'zh-cn',
      headStyle: { height: '52px', 'border-bottom': 'none' },
      events: [
        {
          start: '2019-04-01',
          end: '2019-04-01',
          title: '愚人节',
          content: '<i class ="v-icon material-icons">今天是愚人节 </i>',
          class: 'blue-event'
        },
        {
          start: '2019-04-01',
          end: '2019-04-01',
          title: '会议召开',
          content: '<i class ="v-icon material-icons"> 下午有会议召开 </i>',
          class: 'blue-event'
        },
        {
          start: '2019-3-1',
          end: '2019-3-2',
          title: 'PLAN C',
          content: '<i class ="v-icon material-icons"> PLAN B CONTENT </i>',
          class: 'blue-event'
        }
      ],
      addOrEditItemModal: false,
      calModalTitle: '',
      deleteModal: false,
      eventIconRow: false,
      editIconRow: false,
      deleteData: '',
      itemDate: '',
      itemDetailContent: ''
    }
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
