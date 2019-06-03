<template>
  <div class="search-bar-input">
    <a-input-search
      size="small"
      placeholder="消息/联系人/群组"
      style="width: 200px"
      v-model="searchObj.searchValue"
      @focus="searchInputOnFocus"
      @input="searchValueChange"
    />
  </div>
</template>

<script>
import Utils from '../../../src/utils/utils.js'
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
      searchResultList: [],
      searchGroupResultList: [],
      searchContactsResultList: [],
      contactsList: []
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
      this.contactsList = []
      if (!this.searchObj.searchValue) {
        this.searchResultList = []
        this.$store.commit('SET_SEARCH_RESULT_LIST', this.searchResultList)
      }
      this.showSearchContent = false
      this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
      const contactsTree = this.$store.state.chat.contactsTree
      this.formatList(contactsTree)
    },
    cleanSearchValue () {
      console.log('clean')
      Utils.$emit('changePane', '1')
      this.searchObj.searchValue = ''
      this.showSearchContent = true
      this.searchResultList = []
      this.searchGroupResultList = []
      this.searchContactsResultList = []
      this.$store.commit('SET_SEARCH_RESULT_LIST', this.searchResultList)
      this.$store.commit('SET_SEARCH_GROUP_RESULT_LIST', this.searchGroupResultList)
      this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
      this.$store.commit('SET_SEARCH_CONTACTS_RESULT_LIST', this.searchContactsResultList)
    },
    searchValueChange (e) {
      console.log('this.searchObj.searchValue', this.searchObj.searchValue)
      console.log('searchValueChange this', this)
      const value = e.target.value
      const chatList = this.$store.state.chat.recentChatList
      const groupList = this.$store.state.chat.groupList
      this.searchResultList = this.searchForContactsOrGroups(value, chatList)
      this.searchGroupResultList = this.searchForContactsOrGroups(value, groupList)
      this.searchContactsResultList = this.searchForContactsOrGroups(value, this.contactsList)
      this.$store.commit('SET_SEARCH_RESULT_LIST', this.searchResultList)
      this.$store.commit('SET_SEARCH_GROUP_RESULT_LIST', this.searchGroupResultList)
      this.$store.commit('SET_SEARCH_CONTACTS_RESULT_LIST', this.searchContactsResultList)
    },
    // 根据搜索值在联系人与群组中匹配对应的
    searchForContactsOrGroups (value, list) {
      const strArr = []
      const searchArr = []
      const searchResultList = []
      for (const item of list) {
        if (item.name) {
          strArr.push(item.name)
        }
        if (item.title) {
          strArr.push(item.title)
        }
      }
      if (strArr && value) {
        for (let i = 0; i < strArr.length; i++) {
          if (strArr[i].indexOf(value) >= 0) {
            searchArr.push(strArr[i])
          }
        }
      }
      for (const searchArrItem of searchArr) {
        for (const chatListItem of list) {
          if (searchArrItem === chatListItem.name) {
            searchResultList.push(chatListItem)
          }
          if (searchArrItem === chatListItem.title) {
            searchResultList.push(chatListItem)
          }
        }
      }
      console.log('searchResultList searchResultList', searchResultList)
      return searchResultList
    },
    // 将联系人树平铺 只要联系人
    formatList (list) {
      for (const value of list) {
        if (value.scopedSlots.title === 'userNode') {
          this.contactsList.push({
            icon: value.icon,
            key: value.key,
            scopedSlots: value.scopedSlots,
            title: value.title
          })
        }
        if (value.children) {
          this.formatList(value.children)
        }
      }
      console.log('this.contactsList:', this.contactsList)
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
</style>
