<template>
  <div class="talk-view">
    <a-layout class="talk-layout">
      <a-layout-sider
        class="talk-sider"
        style="flex: 0 0 360px; max-width: 360px; min-width: 360px; width: 360px;"
      >
        <div
          class="demo-infinite-container"
          v-infinite-scroll="handleInfiniteOnLoad"
          :infinite-scroll-disabled="busy"
          :infinite-scroll-distance="10"
        >
          <a-list :dataSource="data">
            <a-list-item slot="renderItem" slot-scope="item" style="padding: 12px">
              <a-list-item-meta :description="item.last" class="talk-item">
                <a slot="title" :href="item.href">{{ item.name.last }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
              <div class="talk-time">10:34</div>
            </a-list-item>
            <div v-if="loading && !busy" class="demo-loading-container">
              <a-spin/>
            </div>
          </a-list>
        </div>
      </a-layout-sider>
      <a-layout style="min-height: 100vh; height: 100%">
        <a-layout-header class="talk-header">header</a-layout-header>
        <a-layout-content style="margin: 24px 24px 0px; height: 100%; padding-top: 64px;"></a-layout-content>
        <!-- <div class="talk-footer-toolbar" style="width: calc(100% - 360px);">111</div> -->
        <a-layout-footer>foot</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { mixin, mixinDevice } from '@/utils/mixin'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  directives: { infiniteScroll },
  name: 'AdvancedForm',
  mixins: [mixin, mixinDevice],
  components: {
    FooterToolBar
  },
  data () {
    return {
      data: [],
      loading: false,
      busy: false
    }
  },
  beforeMount () {
    this.fetchData(res => {
      console.log('这地方')
      console.log(res.result.data)
      this.data = res.result.data
    })
  },
  created () {},
  methods: {
    fetchData (callback) {
      this.$http
        .get('/talk/talk-boxs', {
          // params: Object.assign(parameter, this.queryParam)
        })
        .then(res => {
          callback(res)
        })
    },
    handleInfiniteOnLoad () {
      const data = this.data
      this.loading = true
      if (data.length > 14) {
        this.$message.warning('Infinite List loaded all')
        this.busy = true
        this.loading = false
        return
      }
      this.fetchData(res => {
        this.data = data.concat(res.results)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
// .card {
//   margin-bottom: 24px;
// }
.talk-sider {
  background: #fff;
}
.talk-header {
  background: #fff;
}
// .talk-footer-toolbar{
//     width: 100%;
//     bottom: 0;
//     right: 0;
//     height: 56px;
//     line-height: 56px;
//     -webkit-box-shadow: 0 -1px 2px rgba(0,0,0,.03);
//     box-shadow: 0 -1px 2px rgba(0,0,0,.03);
//     background: #fff;
//     border-top: 1px solid #e8e8e8;
//     padding: 0 24px;
//     z-index: 9;
// }
.talk-view {
  height: calc(100% - 64px);
  margin: -24px;
}
.ant-list-item-meta-description {
  width: 120px;
  word-wrap: break-word; /* 内容存在英语或数字时强制换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置盒子内排列顺序为纵向 */
  -webkit-line-clamp: 1; /* 限制块元素显示的文本的行数 */
}
.talk-time {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  line-height: 22px;
}
</style>
