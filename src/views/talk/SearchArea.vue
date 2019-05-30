<template>
  <div v-if="!showSearchContent" class="showSearchContent">
    <div v-if="searchResultList && searchResultList.length>0" class="recent-contacts-container tab-content-container">
      <div class="search-content-more-title">联系人</div>
      <div v-for="(item, index) in searchResultList" :key="index" @click="showChat(item)">
        <recent-contacts-item :contactsInfo="item" :activated="item.id === activeChat"></recent-contacts-item>
      </div>
    </div>
    <div>
      <div class="search-content-more-title">更多</div>
      <div class="search-chat-record" @click="showSearchRecordModal">
        <img class="search-chat-record-icon" :src="require('@/assets/search-record.jpg')"/>
        <div class="search-chat-record-tip-box">
          <div class="search-chat-record-tip">搜聊天记录</div>
          <div class="search-chat-record-tip-local">查找本地聊天记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  RecentContactsItem
} from '@/components/Talk'
import Utils from '../../../src/utils/utils.js'

export default {
  name: 'SearchArea',
  components: {
    RecentContactsItem
  },
  props: {
    searchResultList: {
      type: Array,
      default: () => []
    },
    showSearchContent: {
      type: Boolean,
      default: () => null
    },
    activeChat: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {
    this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
  },
  methods: {
    showChat (chat) {
      Utils.$emit('showChat', chat)
    },
    showSearchRecordModal () {
      Utils.$emit('openModal')
    }
  },
  activated: function () {

  },
  mounted: function () {

  }
}
</script>

<style lang="less">
  .showSearchContent{
    height: 618px;
  }
  .search-content-more-title{
    background-color: #ccc;
    color: #666;
    font-size: 16px;
    padding: 6px 0 6px 10px;
  }
  .search-chat-record-icon{
    width: 52px;
    height: 52px;
    float: left;
  }
  .search-chat-record-tip-box{
    margin-left: 16px;
    float: left;
  }
  .search-chat-record-tip{
    font-size: 16px;
  }
  .search-chat-record-tip-local{
    font-size: 16px;
    color: #aaa;
  }
  .search-chat-record{
    margin: 16px;
  }
</style>
