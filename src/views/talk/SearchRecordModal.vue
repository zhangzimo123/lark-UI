<template>
  <a-modal
    title="搜聊天记录"
    :visible="searchRecordModalVisible"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <div>
      <a-input-search
        placeholder="搜聊天记录"
        style="width: 600px; margin: 0 0 15px 140px;"
      />
    </div>
    <a-divider />
    <div class="result-list">
      <div v-for="(item, index) in searchResultList" :key="index">
        <div class="result-list-info">
          <img class="result-list-avatar" :src="item.avatar"/>
          <div class="result-list-name">{{ item.name }}</div>
          <div class="result-list-count">{{ item.count }}条相关聊天记录</div>
        </div>
        <a-divider />
      </div>
    </div>
  </a-modal>
</template>

<script>
import Utils from '../../../src/utils/utils.js'

export default {
  name: 'SearchRecordModal',
  components: {
  },
  props: {
    searchRecordModalVisible: {
      type: Boolean,
      default: () => null
    }
  },
  data () {
    return {
      confirmLoading: false,
      searchResultList: [
        {
          avatar: require('@/assets/sjs.jpg'),
          name: '小金',
          count: 1
        },
        {
          avatar: require('@/assets/sjs.jpg'),
          name: '小金组',
          count: 10
        },
        {
          avatar: require('@/assets/sjs.jpg'),
          name: '小银组',
          count: 5
        },
        {
          avatar: require('@/assets/sjs.jpg'),
          name: '小雨',
          count: 23
        },
        {
          avatar: require('@/assets/sjs.jpg'),
          name: '小铁',
          count: 6
        },
        {
          avatar: require('@/assets/sjs.jpg'),
          name: '小哈',
          count: 2
        }
      ]
    }
  },
  computed: {

  },
  created () {
    // this.$store.commit('SET_SHOW_SEARCH_CONTENT', this.showSearchContent)
  },
  methods: {
    handleOk () {
      Utils.$emit('openModal')
    },
    handleCancel () {
      Utils.$emit('closeModal')
    }
  },
  activated: function () {

  },
  mounted: function () {

  }
}
</script>

<style lang="less">
  .result-list-avatar{
    width: 46px;
    height: 46px;
    float: left;
    margin-right: 15px;
  }
  .result-list-info{
    padding: 0 0 0 16px;
  }
  .result-list-name{
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 6px;
  }
  .result-list-count{
    font-size: 15px;
    color: #aaa;
  }
  .result-list{
    height: 380px;
    overflow-y:scroll;
    width: 230px;
  }
</style>
