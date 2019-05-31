<template>
  <!-- 聊天记录的抽屉 -->
  <a-drawer
    title="群公告"
    placement="right"
    :getContainer="mountEle"
    :wrapStyle="{marginTop: '64px'}"
    :width="448"
    :closable="false"
    @close="onClose"
    :visible="activeOption=='groupNotice'">

    <p class="notice-p">{{item.content}}</p>
    <span class="notice-s">发布时间 : {{item.createTime}}</span>
    
  </a-drawer>
</template>

<script>
// var time = this.getNowFormatDate()
import axios from 'axios'
axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5cef9a806bbb7d72047ec887/drawer/notice'
export default {
  name: 'GroupNotice',
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
      time:'',
      item:{}
    }
  },
  watch: {
    activeOption (newValue) {
      if (newValue === 'groupNotice') {
        console.log('在这里加载数据')
      }
    }
  },
  computed: {
  },
  created () {
    this.getNowFormatDate()
    this.getContent()
  },
  mounted () {},
  methods: {
    /** 抽屉关闭时触发closeDrawer事件 */
    onClose () {
      this.$emit('closeDrawer')
    },
    getNowFormatDate() {//获取当前时间
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
      var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
      var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
          + " "  + date.getHours()  + seperator2  + date.getMinutes()
          + seperator2 + date.getSeconds();
      this.time = currentdate
      console.log('tag', this.time)
    },
    getContent(){
      axios.get('/drawer/notice').then((data)=>{
        // console.log('tag', data.data)
        this.item = data.data
        console.log('11111', data)
      })
    }
  }
}
</script>

<style lang='less' scope>
  .notice-p{
     height:508px;
     border-bottom: 1px solid #cccccc;
     font-size: 20px
  }
  .notice-s{
    float: right
  }
</style>
