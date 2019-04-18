<template>
  <div class="search-window-style">
    <div class="search-window-left-part">
      <div class="search-input-box">
        <a-input class="search-input" placeholder="搜索群成员" v-model="searchKeyWords" @change="searchValueChange">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div>
        <a-tree
          :treeData="treeData"
          :defaultSelectedKeys="['0-0-0']"
          @select="this.onSelect"
          @check="this.onCheck"
        >
          <!--<a-icon slot="smile" type="smile-o" />-->
          <!--<a-icon slot="meh" type="smile-o" />-->
          <!--<template slot="custom">-->
          <!--<a-avatar size="small" icon="user"/>-->
          <!--</template>-->
        </a-tree>
      </div>
    </div>
    <div class="search-window-right-part" v-show="contactsData.length>0">
      <div class="control-contacts-tip">请选择需要勾选的联系人</div>
      <div v-for="(item,index) in contactsData" :key="item.key">
        <div class="contacts-item" >
          <img class="contacts-item-img" :src="item.head"/>
          <div class="contacts-item-name">{{item.title}}</div>
          <div class="contacts-item-delete" @click="deleteContactsItem(index)">✖</div>
        </div>
      </div>
      <!--<div class="sureBtn">确认</div>-->
      <div class="foot-btn-box">
        <a-button class="sureBtn">确认</a-button>
        <a-button class="cancelBtn">取消</a-button>
      </div>
    </div>
  </div>

</template>
<script>
import AInput from "ant-design-vue/es/input/Input";
import AButton from "ant-design-vue/es/button/button";
const contactsData = [
  {
    key: '0-0-0',
    title: '旺仔研究员1',
    head: require('@/assets/sjs.jpg'),
    msg:'今天一起去吃午饭吗？'
  },
  {
    title: '旺仔研究员2',
    key: '0-0-1',
    head: require('@/assets/sjs.jpg'),
    msg:'今天一起去吃午饭吗？'
  }
];
const treeData = [
  {
    title: '科工二院一部（20）',
    key: '0-0',
    children: [
      {
        key: '0-0-0',
        title: '旺仔研究员1',
        head:'@/assets/sjs.jpg',
        msg:'今天一起去吃午饭吗？'
      },
      {
        title: '旺仔研究员2',
        key: '0-0-1',
        head:'@/assets/sjs.jpg',
        msg:'今天一起去吃午饭吗？'
      }
    ]
  },
  {
    title: '科工二院二部（20）',
    key: '0-1',
    children: [
      {
        title: '策划部（20）',
        key: '0-1-0' ,
        children: [
          {
            title: '策划部一分部（10）',
            key: '0-1-0-2',
            children: [
              {
                title: '旺仔研究员1',
                key: '0-1-0-2-0',
                head:'@/assets/sjs.jpg',
                msg:'今天一起去吃午饭吗？'
              },
              {
                title: '旺仔研究员2',
                key: '0-1-0-2-1',
                head:'@/assets/sjs.jpg',
                msg:'今天一起去吃午饭吗？'
              }
            ]
          }
        ]
      },
    ]
  }
];

export default {
  components: {
    AButton,
    AInput},
  name: 'SearchWindow',
  data () {
    return {
      treeData,
      contactsData,
      searchKeyWords:""
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    },
    deleteContactsItem(index) {
      console.log("删除 contactsData",this.contactsData);
      console.log("删除 Index",index);
      contactsData.splice(index,1);
    },
    searchValueChange(){
      console.log("searchKeyWords",this.searchKeyWords);
      var len = treeData.length;
      var arr = [];
      for(var i=0;i<len;i++){
        //如果字符串中不包含目标字符会返回-1
        if(treeData[i].title.indexOf(this.searchKeyWords)>=0){
          arr.push(treeData[i]);
        }
      }
      console.log("arr",arr);
    }
  }
}

</script>

<style lang="less">
  .search-input{
    width: 188px;
    font-size: 9px;
    color: #666666;
  }
  .search-window-style{
    /*background-color: white;*/
    box-shadow: -3px -1px 6px -3px #919191;
    padding: 0 7px 0px 7px;
    /*width: 406px;*/
    height: 481px;
  }
  .search-window-style .ant-input{
    background-color: #EEEEEE!important;
  }
  .search-window-left-part{
    /*border-right: 1px solid #EEEEEE;*/
    height: 100%;
    width: 200px;
    float: left;
    overflow: auto;
    background-color: white;
  }
  .search-input-box{
    padding: 15px 0 10px 0;
  }
  .search-window-right-part{
    padding: 15px 10px 15px 0;
    float: left;
    position: relative;
    height: 100%;
    width: 192px;
    border-left: 1px solid #EEEEEE;
    background-color: white;
  }
  .control-contacts-tip{
    margin-left: 21px;
    font-size: 11px;
    color: #666666;
  }
  .contacts-item-img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 20px;
    float: left;
  }
  .contacts-item-name{
    font-size: 11px;
    color: #666666;
    float: left;
  }
  .contacts-item-delete{
    background-color: #D7D7D7;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    position: absolute;
    right: -6px;
    top: 7px;
  }
  .contacts-item{
    margin: 20px 10px 20px 10px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .sureBtn{
    width: 60px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5C95F6;
    color: white;
    margin-left: 31px;
    margin-right: 13px;
    /*position: absolute;*/
    /*bottom: 20px;*/
    /*left: 31px;*/
  }
  .cancelBtn{
    width: 60px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EEEEEE;
    color: #666666;
    /*position: absolute;*/
    /*bottom: 20px;*/
    /*right: 31px;*/
  }
  .foot-btn-box{
    position: absolute;
    bottom: 20px;
    right: 31px;
    display: flex;
    justify-content: center;
  }
</style>