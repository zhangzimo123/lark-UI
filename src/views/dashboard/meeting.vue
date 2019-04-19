<template>
  <div>
    <a-card
      :headStyle="headStyle"
      :bordered="true"
      :style="{ minHeight: '300px'}">
      <div slot="title">
        <a-row>
          <a-col>
            {{ title }}
            <categoryTools :array="typeArray" @changed="fetchData"></categoryTools>
            <a-button class="creatMeeting" size="small">创建会议</a-button>
          </a-col>
        </a-row>
      </div>
      <a-popover
        placement="left"
        slot="extra"
        trigger="click">
        <template slot="content">
          <a>移除卡片</a>
        </template>
        <a href="#">
          <a-icon type="tool"/>
        </a>
      </a-popover>
      <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
        <a-tag :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
        <span @click="modal = true">{{ row.name.length> 24 ? row.content.replace(/^(.{22})(.*)$/,'$1...') : row.content }}</span>
        <span class="right">{{ row.date }}</span>
      </a-row>
      <a-modal
        v-model="modal">
        <!--<div slot="header" class="news-modal-title">-->
        <!--<div class="news-modal-title-ladder"></div>-->
        <!--<div class="news-modal-title-font">· 会议详情 ·</div>-->
        <!--</div>-->
        <!--<div slot="close" class="news-modal-title-close-fix">-->
        <!--<div class="news-modal-title-close">×</div>-->
        <!--</div>-->
        <!--<p>{{ row.name }}</p>-->
      </a-modal>

      <div v-if="list.size==0" style="margin: 40px auto 0 auto;text-align: center;" class="card-content">
        <a-icon type="file-exclamation" theme="twoTone" :style="fontSize"/>
        <p class="description">卡片暂无内容</p>
      </div>
    </a-card>
  </div>
</template>
<script>
import { getMeetings } from '../../api/dashboard'
import categoryTools from './category-tools'

export default {
  data () {
    return {
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      title: '会议室',
      showTableHeader: true,
      selectedType: 0,
      buttonEdit: false,
      modal: false,
      typeArray: [
        // { type: 1, name: '未开始', show: true },
        // { type: 2, name: '进行中', show: true },
        // { type: 3, name: '已结束', show: true }
        {
          id: 1,
          type: 1,
          name: '未开始',
          color: 'blue',
          colorType: 'primary',
          show: true
        },
        {
          id: 2,
          type: 2,
          name: '进行中',
          color: 'orange',
          colorType: 'waring',
          show: true
        },
        {
          id: 3,
          type: 3,
          name: '已结束',
          color: '#e8e8e8',
          colorType: 'default',
          show: true
        }
      ],
      typeMap: {},
      list: [],
      createMeet: false,
      meetingDetails: false
    }
  },
  components: {
    getMeetings,
    categoryTools
  },
  created () {
    this.fetchData()
    this.setToolStatus()
  },
  computed: {},
  methods: {
    fetchData (type) {
      if (type === undefined) {
        type = 0
      }
      var vm = this
      getMeetings(type).then((data, status) => {
        vm.list = data.content.filter(item => {
          return item.type === type || type === 0
        })
        // vm.list = [].concat(data.content.splice(0, 6))
      })
    },
    setToolStatus () {
      const m = {}
      this.typeArray.forEach(item => {
        m['type-' + item.type] = item
      })
      this.typeMap = Object.assign({}, m)
    },
    typeColor (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.color : '#c5c8ce'
    },
    typeName (type) {
      const o = this.typeMap['type-' + type]
      return o ? o.name : ''
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
  .creatMeeting{
    float: right;
    margin-right: 15px;
  }
  .news-modal-title-close {
    border-radius: 50px;
    width: 18px;
    height: 18px;
    background-color: white;
    color: #105a9f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }

  .news-modal-title-ladder {
    width: 135px;
    border-width: 0 10px 8px 10px;
    border-style: none solid solid;
    border-color: transparent transparent #105a9f;
    position: absolute;
    top: -8px;
  }
  .news-modal-title {
    background-color: #105a9f;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .news-modal-title {
    background-color: #105a9f;
    height: 28px;
    display: flex;
    align-items: center;
  }

  .news-modal-title-font {
    font-size: 18px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    margin-left: 15px;
    position: absolute;
    top: 0px;
  }

  .news-modal {
    display: flex;
    align-items: center;
  }

  .news-modal .ivu-modal-content {
    border: 2px solid #105a9f;
    border-top: 0px;
  }

  .news-modal .ivu-modal-header {
    padding: 0px;
  }

  .news-modal-title-close-fix {
    display: flex;
    align-items: center;
    height: 28px;
  }

  .news-modal .ivu-modal-close {
    top: 0px;
  }

  .news-modal-title-close {
    border-radius: 50px;
    width: 18px;
    height: 18px;
    background-color: white;
    color: #105a9f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }

  .news-modal-title-ladder {
    width: 135px;
    border-width: 0 10px 8px 10px;
    border-style: none solid solid;
    border-color: transparent transparent #105a9f;
    position: absolute;
    top: -8px;
  }

  .news-modal-content {
    padding: 50px 120px 50px 120px;
    height: 676px;
    overflow: auto
  }

  .news-modal-content-title {
    font-size: 24px;
    color: rgb(51, 51, 51);
    font-weight: bold;
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
  }

  .news-modal-content-info {
    font-size: 14px;
    color: rgb(153, 153, 153);
    font-family: "Microsoft YaHei";
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    margin: 24px 0px 24px 0px;
  }

  .news-modal-content-pic {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  .news-modal-content-main {
    font-size: 16px;
    color: rgb(136, 136, 136);
    font-family: "Microsoft YaHei";
    display: flex;
    justify-content: center;
    margin-bottom: 26px;
    letter-spacing: 1px;
    text-indent: 28px;
  }
</style>
