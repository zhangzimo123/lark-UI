<template>
  <div>
    <a-row v-for="(row,index) in list" :key="'item'+index" class="row-magin">
      <a-tag :color="typeColor(row.type)">{{ typeName(row.type) }}</a-tag>
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
    getMeetings
  },
  created () {
    this.fetchData()
    this.setToolStatus()
  },
  computed: {
  },
  methods: {
    fetchData () {
      var vm = this
      getMeetings().then((data, status) => {
        console.log(data)
        vm.list = [].concat(data.content.splice(0, 6))
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
  .row-magin{
    margin-bottom: 12px;
  }
</style>
