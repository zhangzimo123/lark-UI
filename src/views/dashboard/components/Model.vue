<template>
  <div
    style="height:205px;overflow-y:auto">
    <a-collapse defaultActiveKey="1" accordion="true">
      <a-collapse-panel v-for="(item,index) in list" :key="index" :header="item.name" style="font-size: 12px" >
        <a-row gutter="16">
          <a-col :span="12">
            <img src="../../../../public/model.png" style="max-width:100%;height:110px;">
          </a-col>
          <a-col >
            <div style="color: #666666">
              <div>
                <span >{{ item.name }}</span>
              </div>
              <div >
                <span>{{ item.a }}</span>
              </div>
              <div >
                <span>{{ item.b }}</span>
              </div>
              <div >
                <span>{{ item.c }}</span>
              </div>
              <div >
                <span>{{ item.d }}</span>
              </div>
              <div >
                <span>{{ item.e }}</span>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import { modelData } from '@/api/model'
export default {
  data () {
    return {
      title: '模型库',
      selectedName: 'index-0',
      list: []
    }
  },
  created () {
    this.fetchModel()
  },
  methods: {
    fetchModel () {
      const vm = this
      modelData().then(data => {
        vm.list = data.model.content
      })
    }
  }
}
</script>
<style scoped>

</style>
