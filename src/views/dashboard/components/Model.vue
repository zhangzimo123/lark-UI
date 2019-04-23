<template>
  <div >
    <a-collapse defaultActiveKey="1" v-for="(item,index) in list" :key="index">
      <a-collapse-panel :key="index" :header="item.name">
        {{ item.name }}
        <a-row>
          <a-col :span="12">
            <!--<img :src="publicPath + 'public/model.png'" style="max-width:100%;height:150px;">-->
          </a-col>
          <a-col >
            <div>
              <div>
                <span>{{ item.name }}</span>
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
import { getModels } from '@/api/model'
export default {
  data () {
    return {
      title: '模型库',
      list: [],
      selectedName: 'index-0'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData (callback) {
      var vm = this
      getModels().then((data) => {
        vm.list = data.content.slice(0, 6)
      })
    }
  }
}
</script>
<style scoped>

</style>
