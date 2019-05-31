<template>
  <!--群文件的抽屉 -->
  <a-drawer
    title="文件"
    placement="right"
    :getContainer="mountEle"
    :wrapStyle="{marginTop: '64px'}"
    :width="700"
    :closable="false"
    @close="onClose"
    :visible="activeOption=='talkFile'">
    <!-- <input type="text">
    <a-button shape="circle" icon="search" /> -->
    <a-input-search
      placeholder="input search text"
      @search="onSearch"
      enterButton
    />
    <div class="nav_box">
        <ul>
          <li>文件名</li>
          <li>上传者</li>
          <li>上传时间</li>
        </ul>
      </div>
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      itemLayout="horizontal"
      :dataSource="data"
    >
      
      <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore">loading more</a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <!-- <a slot="actions">edit</a> -->
        <span class="file_sp" >{{item.name.title}}</span>
        <a slot="actions">下载</a>
        <a-list-item-meta class="file_name">
          <a class="file_a" slot="title" href="https://vue.ant.design/">{{item.name.last}}</a>
          <a-avatar slot="avatar" :src="item.url" />
        </a-list-item-meta>
        <div class="file_time">{{item.time}}</div>
        <a href="">
          <div class="secret">
          <a-tag color="orange" v-if="item.Concentrated === 'secret'">保密</a-tag>
          <a-tag color="red" v-if="item.Concentrated === 'top-secret'">绝密</a-tag>
          <a-tag color=""  v-if="item.Concentrated === 'no-secret'">无秘</a-tag>  
        </div>
        </a>
      </a-list-item>
    </a-list>
  </a-drawer>
</template>

<script>
import reqwest from 'reqwest'
import infiniteScroll from 'vue-infinite-scroll'
const fakeDataUrl = ' https://www.easy-mock.com/mock/5cef9a806bbb7d72047ec887/drawer/notice/drawer/file'
export default {
  directives: { infiniteScroll },
  name: 'TalkFile',
  props: {
    /** 抽屉挂载的元素 */
    mountEle: {
      type: String,
      default: '.conv-box',
      required: false
    },
    activeOption: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      data: [],
      loading: false,
      busy: false,
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
    }
  },
  watch: {
    activeOption (newValue) {
      if (newValue === 'talkFile') {
        console.log('在这里加载数据')
      }
    }
  },
  methods: {
    onSearch (value) {
      console.log(value)
    },
 
     getData  (callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res)
        },
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.getData((res) => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
     /** 抽屉关闭时触发closeDrawer事件 */
    onClose () {
      this.$emit('closeDrawer')
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getData((res) => {
      this.loading = false
      this.data = res.results
    })
  },
}
</script>

<style lang="less" scope>
  .demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
  .ant-spin-container{
    position: relative;
  }
  .ant-list-item-meta-content{
    width: 100px;
  }
  .file_sp{
    margin-right: 50px;
  }
  .file_name{
    margin-right: 20px
  }
  .file_time{
    margin-right: 50px
  }
  .ant-list-item-meta-title{
    width: 80px;
  }
  .ant-avatar-circle{
    background-image:url('./file.jpg');
    background-size: 20px 2 0px;
  }
  .nav_box{
      width: 100%;
      height: 20px;
    ul{
      width: 100%;  
      li{
        list-style: none;
        width: 50px;
        float: left;
        font-size: 5px;
        &:nth-child(1){
          margin-right: 190px
        }
        &:nth-child(2){
          margin-right: 50px
        }
      }
    }
  }
</style>
