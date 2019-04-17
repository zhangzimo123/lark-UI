<template>
  <div>
    <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
      <a-tag color="#2db7f5">{{ "进行中" }}</a-tag>
      <span>{{ row.name.length> 24 ? row.content.replace(/^(.{22})(.*)$/,'$1...') : row.content }}</span>
      <span class="right">{{ row.date }}</span>
    </a-row>
  </div>
</template>
<script>
import { getMeetings } from '../../api/dashboard'

export default {
  data () {
    return {
      title: '会议室',
      showTableHeader: true,
      selectedType: 0,
      buttonEdit: false,
      typeArray: [
        { type: 1, name: '未开始', show: true },
        { type: 2, name: '进行中', show: true },
        { type: 3, name: '已结束', show: true }
      ],
      typeMap: {},
      list: [
        {
          id: 1,
          user: '马达芸',
          type: 1,
          name: '航天信息与阿里巴巴签署《战略合作框架协议》',
          content: '航天信息与阿里巴巴签署《战略合作框架协议》',
          percent: 45,
          icon: 'car',
          tag: '标签',
          read: true,
          imageUrl: 'images/index/ship.png',
          date: '12-07',
          unreadCount: 3,
          time: '11:30'
        },
        {
          id: 2,
          user: '刘十一',
          type: 1,
          name: '“人工智能+财税”成大势所趋，开启智能化发展新时代',
          content: '“人工智能+财税”成大势所趋，开启智能化发展新时代',
          percent: 30,
          icon: 'car',
          read: true,
          imageUrl: 'images/index/ship.png',
          tag: '标签',
          date: '12-05',
          unreadCount: 4,
          time: '11:30'
        },
        {
          id: 3,
          user: '刘十二',
          type: 1,
          name: '又有新突破，研出一“黑科技”，处理数据速度提升100倍',
          content: '又有新突破，研出一“黑科技”，处理数据速度提升100倍',
          percent: 55,
          icon: 'car',
          read: true,
          imageUrl: 'images/index/ship.png',
          tag: '标签',
          date: '12-05',
          unreadCount: 5,
          time: '11:30'
        },
        {
          id: 4,
          user: '刘十三',
          type: 2,
          name: '今日研制成功堪称制造业领域的“微信”',
          content: '今日研制成功堪称制造业领域的“微信”',
          percent: 15,
          icon: 'car',
          read: false,
          imageUrl: 'images/index/ship.png',
          tag: '标签',
          date: '12-05',
          unreadCount: 6,
          time: '11:30'
        },
        {
          id: 5,
          user: '刘十四',
          type: 3,
          name: '为导弹设计“最强大脑”的航天人——记张奕群研究室党支部',
          content: '为导弹设计“最强大脑”的航天人——记张奕群研究室党支部',
          percent: 65,
          icon: 'car',
          read: false,
          imageUrl: 'images/index/ship.png',
          tag: '标签',
          date: '12-05',
          unreadCount: 7,
          time: '11:30'
        },
        {
          id: 6,
          user: '刘十四',
          type: 3,
          name: '为导弹设计“最强大脑”的航天人——记张奕群研究室党支部',
          content: '为导弹设计“最强大脑”的航天人——记张奕群研究室党支部',
          percent: 65,
          icon: 'car',
          read: false,
          imageUrl: 'images/index/ship.png',
          tag: '标签',
          date: '12-05',
          unreadCount: 7,
          time: '11:30'
        }
      ],
      createMeet: false,
      meetingDetails: false
    }
  },
  components: {
    getMeetings
  },
  created () {
    this.fetchData()
  },
  computed: {
  },
  methods: {
    fetchData () {
      // var vm = this
      // getMeetings().then(({ data, status }) => {
      // console.log('workplace -> call getServiceList()', data)
      // vm.list = [].concat(data.content.splice(0, 6))
      // })
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
  .row-magin{
    margin-bottom: 12px;
  }
</style>
