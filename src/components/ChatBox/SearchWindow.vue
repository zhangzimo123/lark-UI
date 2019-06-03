<template>
  <div class="search-window-style" v-show="searchWindowIsShow">
    <div class="search-window-left-part">
      <div class="search-input-box">
        <a-input class="search-input" placeholder="搜索群成员" v-model="searchKeyWords" @change="searchValueChange">
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div class="tree-scroll">
        <tree-custom
          :label="tree.title"
          :headImg="tree.head"
          :treeData="tree.children"
          :pkid="tree.key"
          :depth="0"
          :selectStatus="tree.selectStatus"
          @addSelectedData="addSelectedData"
          @deleteSelectedData="deleteSelectedData" />
      </div>
    </div>
    <div class="search-window-right-part">
      <div class="control-contacts-tip">请选择需要勾选的联系人</div>
      <div class="contacts-scroll">
        <div v-for="(item,index) in contactsData" :key="item.key">
          <div class="contacts-item" >
            <img class="contacts-item-img" :src="item.head"/>
            <div class="contacts-item-name">{{ item.title }}</div>
            <div class="contacts-item-delete" @click="deleteContactsItem(item,index)">✖</div>
          </div>
        </div>
      </div>
      <div class="foot-btn-box">
        <a-button class="sureBtn">确认</a-button>
        <a-button class="cancelBtn" @click="closeSearchWindow">取消</a-button>
      </div>
    </div>
  </div>

</template>
<script>
import AInput from 'ant-design-vue/es/input/Input'
import AButton from 'ant-design-vue/es/button/button'
import TreeCustom from '@/components/ChatBox/TreeCustom'
export default {
  components: {
    AButton,
    AInput,
    TreeCustom
  },
  name: 'SearchWindow',
  data () {
    return {
      contactsData: [],
      searchKeyWords: ''
    }
  },
  props: {
    searchWindowIsShow: {
      type: Boolean,
      default: () => false
    },
    tree: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    },
    deleteContactsItem (item, index) {
      this.contactsData.splice(index, 1)
      this.$parent.searchAndChangeSelectStatus(this.tree, item.key, false)
    },
    searchValueChange () {
      console.log('searchKeyWords', this.searchKeyWords)
      var len = this.treeData.length
      var arr = []
      for (var i = 0; i < len; i++) {
        // 如果字符串中不包含目标字符会返回-1
        if (this.treeData[i].title.indexOf(this.searchKeyWords) >= 0) {
          arr.push(this.treeData[i])
        }
      }
      console.log('arr', arr)
    },
    closeSearchWindow () {
      this.$parent.closeSearchWindow()
    },
    addSelectedData (item) {
      this.contactsData.push(item)
      this.$parent.searchAndChangeSelectStatus(this.tree, item.key, true)
    },
    deleteSelectedData (item) {
      for (let i = 0; i < this.contactsData.length; i++) {
        if (item.key === this.contactsData[i].key) {
          this.contactsData.splice(i, 1)
          this.$parent.searchAndChangeSelectStatus(this.tree, item.key, false)
        }
      }
      console.log('contactsData', this.contactsData)
    }
  }
}

</script>

<style lang="less">
  .search-input{
    width: 210px;
    font-size: 9px;
    color: #666666;
  }
  .search-window-style{
    background-color: white;
    box-shadow: -3px -1px 6px -3px #919191;
    padding: 0 7px 0px 7px;
    /*width: 406px;*/
    height: 481px;
    float: left;
    position: fixed;
    z-index: 999;
    top: 160px;
    right: 500px;
  }
  .search-window-left-part{
    /*border-right: 1px solid #EEEEEE;*/
    height: 100%;
    width: 250px;
    float: left;
    /*overflow: auto;*/
    background-color: white;
    margin-left: 10px;
  }
  .tree-scroll{
    height: 420px;
    overflow: auto;
  }
  .search-input-box{
    padding: 15px 0 10px 0;
  }
  .search-window-right-part{
    padding: 15px 10px 15px 0;
    float: left;
    position: relative;
    height: 100%;
    width: 240px;
    border-left: 1px solid #EEEEEE;
    background-color: white;
  }
  .contacts-scroll{
    height: 380px;
    overflow: auto;
    margin: 10px 0 10px 0;
  }
  .control-contacts-tip{
    margin-left: 21px;
    font-size: 13px;
    color: #666666;
  }
  .contacts-item-img{
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin-right: 20px;
    float: left;
  }
  .contacts-item-name{
    font-size: 13px;
    color: #666666;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 130px;
  }
  .contacts-item-delete{
    background-color: #D7D7D7;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    position: absolute;
    right: 0px;
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
