<template>
  <a-row>
    <a-col :span="1" v-for="(item,index) in list" :key="'link-'+index">
      <a-card hoverable style="width:40px;">
        <img slot="cover" :alt="item.name" :src="item.img"/>
        <a-card-meta :title="item.title">
          <template slot="description">{{ item.description }}</template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { LinkList } from '@/api/link'
export default {
  data () {
    return {
      list: [],
      size: 10,
      total: 10
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      var vm = this
      LinkList(vm.size)
        .then((data) => {
          vm.list = [].concat(data.content)
          vm.total = data.total
        })
    }
  }
}
</script>
