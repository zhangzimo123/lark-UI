<template>
  <div v-if="!showSearchContent" class="showSearchContent">
    <div v-if="searchResultList && searchResultList.length>0" class="recent-contacts-container tab-content-container">
      <div v-for="(item, index) in searchResultList" :key="index" @click="showChat(item)">
        <recent-contacts-item :contactsInfo="item" :activated="item.id === activeChat"></recent-contacts-item>
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
</style>
