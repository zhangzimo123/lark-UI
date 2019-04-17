<template>
  <div>
    <a-row v-for="(item,index) in tableData" :key="'item'+index" class="row-magin">
      <span class="row-content">{{ item.name.length> 24 ? item.name.replace(/^(.{22})(.*)$/,'$1...') : item.name  }}</span>
      <a-tag  class="right" color="gold">{{ item.tag }}</a-tag>
    </a-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '待办事项',
      showTableHeader: true,
      tableData: [
        {
          id: 1,
          user: '马达芸',
          type: 1,
          name: '10点30分于810室召开关于科室4月工作例会',
          content: '10点30分于810室召开关于科室4月工作例会',
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
          name: '“10点30分于810室召开关于科室4月工作例会',
          content: '“10点30分于810室召开关于科室4月工作例会',
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
          name: '同仿真技术部门进行项目对接',
          content: '同仿真技术部门进行项目对接',
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
          name: '周四出差进行需求调研并撰写需求分析报告',
          content: '周四出差进行需求调研并撰写需求分析报告',
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
          name: '3日上午进行关于XXX技术解决方案研讨',
          content: '3日上午进行关于XXX技术解决方案研讨',
          percent: 65,
          icon: 'car',
          read: false,
          imageUrl: 'images/index/ship.png',
          tag: '标签',
          date: '12-05',
          unreadCount: 7,
          time: '11:30'
        }
      ]
    }
  },
  created () {
  },
  methods: {
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
