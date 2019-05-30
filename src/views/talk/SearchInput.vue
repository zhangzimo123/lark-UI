<template>
  <div class="search-bar-input">
    <a-input
      placeholder="消息/联系人/群组"
      style="width: 200px;"
      v-model="searchObj.searchValue"
      @focus="searchInputOnFocus"
      @input="searchValueChange"
    />
    <span class="search-icon" v-if="!showSearchContent" @click="cleanSearchValue">✖</span>
    <a-icon class="search-icon" v-if="showSearchContent" type="search" />
  </div>
</template>

<script>

export default {
  name: 'SearchInput',
  components: {

  },
  props: {

  },
  data () {
    return {
      showSearchContent: true,
      searchObj: {
        searchValue: ''
      },
      searchResultList: []
    }
  },
  computed: {

  },
  created () {
    this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
  },
  methods: {
    // searchInputOnBlur () {
    // console.log('onBlur')
    // if (!this.searchObj.searchValue) {
    // this.showSearchContent = true
    // this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
    // }
    // },
    searchInputOnFocus () {
      console.log('onFocus')
      if (!this.searchObj.searchValue) {
        this.searchResultList = []
        this.$store.commit('SET_SEARCH_RESULT_LIST', this.searchResultList)
      }
      this.showSearchContent = false
      this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
    },
    cleanSearchValue () {
      console.log('clean')
      this.searchObj.searchValue = ''
      this.showSearchContent = true
      this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
    },
    searchValueChange (e) {
      console.log('this.searchObj.searchValue', this.searchObj.searchValue)
      console.log(' searchValueChange this', this)
      const value = e.target.value
      const strArr = []
      const searchArr = []
      const chatList = this.$store.state.chat.recentChatList
      this.searchResultList = []
      for (const item of chatList) {
        strArr.push(item.name)
      }
      if (strArr && value) {
        for (let i = 0; i < strArr.length; i++) {
          if (strArr[i].indexOf(value) >= 0) {
            searchArr.push(strArr[i])
          }
        }
      }
      for (const searchArrItem of searchArr) {
        for (const chatListItem of chatList) {
          if (searchArrItem === chatListItem.name) {
            this.searchResultList.push(chatListItem)
          }
        }
      }
      console.log('this.searchResultList', this.searchResultList)
      this.$store.commit('SET_SEARCH_RESULT_LIST', this.searchResultList)
    }
  },
  activated: function () {

  },
  mounted: function () {

  }
}
</script>

<style lang="less">
  .search-icon{
    padding: 0 5px 0 5px;
  }
  .search-bar-input {
    background-color: white;
    border: 2px solid #eeeeee;

    .ant-input{
      border: 1px solid #fff!important;
    }
  }
</style>
