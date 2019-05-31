<template>
  <!-- 标记信息的抽屉 -->
  <!-- <a-drawer
    title="标记信息"
    placement="right"
    :getContainer="mountEle"
    :wrapStyle="{marginTop: '64px'}"
    :width="448"
    :closable="false"
    @close="onClose"
    :visible="activeOption=='markMessage'">

    <a-input-search
      placeholder="input search text"
      @search="onSearch"
      enterButton
    />

    <a-list
        itemLayout="horizontal"
        :dataSource="data"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
            description=""
          >
           
            <p slot="title" class="message-p" @click="isCurrent()" :class="{'current':flag}"> {{item.title}} </p>
            
          </a-list-item-meta>
            <span>{{time}}</span>

        </a-list-item>
      </a-list>
  </a-drawer> -->
  <a-drawer
    title="标记信息"
    placement="right"
    :getContainer="mountEle"
    :wrapStyle="{marginTop: '64px'}"
    :width="448"
    :closable="false"
    @close="onClose"
    :visible="activeOption=='markMessage'">
    <a-input-search
      class="a-input"
      placeholder="input search text"
      @search="onSearch"
      enterButton
    />

    <div class="history_cotent" v-for="item in items[0]" :key="item.id">
      <img :src="item.avatar" class="content_l" alt="">
      <div class="content_r">
        <h3>{{item.name}}</h3>
        <p @click="isCurrent()" :class="{'current':flag}">{{item.lastMessage}}</p>
      </div>
      <div class="history_right">
        <span>2013-2-2 22:22</span>
        <div class="secret">
          <a-tag color="orange" v-if="item.Concentrated === 'secret'">保密</a-tag>
          <a-tag color="red" v-if="item.Concentrated === 'top-secret'">绝密</a-tag>
          <a-tag color=""  v-if="item.Concentrated === 'no-secret'">无秘</a-tag>  
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script>
// let p = document.getElementsByClassName('message-p')
// const data = [
//   {
//     title: 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
//   },
//   {
//     title: 'sss',
//   },
  
// ]
// export default {
//   name: 'MarkMessage',
//   props: {
//     /** 抽屉挂载的元素 */
//     mountEle: {
//       type: String,
//       default: '.conv-box',
//       required: false
//     },
//     activeOption: {
//       type: String,
//       default: '',
//       required: true
//     }
//   },
//   data () {
//     return {
//       data,
//       time:'',
//       flag:true
//     }
//   },
//   watch: {
//     activeOption (newValue) {
//       if (newValue === 'markMessage') {
//         console.log('在这里加载数据')
//       }
//     }
//   },
//   computed: {
//   },
//   created () {
//     this.getNowFormatDate()
//   },
//   mounted () {},
//   methods: {
//     /** 抽屉关闭时触发closeDrawer事件 */
//     onClose () {
//       this.$emit('closeDrawer')
//     },
//     onSearch (value) {
//       console.log(value)
//     },
//     getNowFormatDate() {//获取当前时间
//       var date = new Date();
//       var seperator1 = "-";
//       var seperator2 = ":";
//       var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
//       var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
//       var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
//           + " "  + date.getHours()  + seperator2  + date.getMinutes()
//           + seperator2 + date.getSeconds();
//       this.time = currentdate
//       console.log('tag', this.time)
//     },
//     isCurrent(){
//       this.flag = !this.flag
//       console.log('tag', this.show)
     
//     }
//   }
// }
import axios from 'axios'
export default {
  name: 'MarkMessage',
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
      flag:true,
      items:[],
      color:""
    }
  },
  watch: {
    activeOption (newValue) {
      if (newValue === 'markMessage') {
        console.log('在这里加载数据')
      }
    }
  },
  computed: {
  },
  created () {
    this.getHistory()
  },
  mounted () {
    // this.whatColor()
  },
  methods: {
    /** 抽屉关闭时触发closeDrawer事件 */
    onClose () {
      this.$emit('closeDrawer')
    },
    isCurrent(){
      this.flag = !this.flag
    },
    getHistory(){
      var itemData = this.items
      axios.get("/drawer/history").then((data)=>{
        let datas = data.data.data
        // console.log('222', items)
        let dataa = datas.map((item,index,array)=>{          
          return item
        })
        this.items.push(dataa)
      })
    },
    onSearch (value) {
      console.log(value)
    },
 
  }
}
</script>

<style lang='less' scope>
  // .message-p{
  //   width: 200px;
  // }
  // .current{
  //   display: -webkit-box;
  //   word-break: break-all;
  //   -webkit-line-clamp: 2;
  //   -webkit-box-orient: vertical;
  //   overflow: hidden;
  //   user-select:none;
  // }
  .current{
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    user-select:none;
  }
  .a-input{
    margin-bottom: 20px;
  }
  .history_cotent{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #cccccc;
    .content_l{
      width: 30px;
      height: 30px;
      // background-image: url("./file.jpg");
      background-size: 30px 30px;
      position: absolute;
      top:10px;
      left: 0;
    }
    .content_r{
      display: inline-block;
      margin-left: 40px;
      h3{
        margin-bottom: 0;
      }
       p{
          width: 250px;
          border-radius: 5px;
        }
    }
    .history_right{
        float: right;

      span{
        display: block
      }
      .secret{
        margin-top: 20px;
        float: right;
        
      }
    }
  }
</style>
