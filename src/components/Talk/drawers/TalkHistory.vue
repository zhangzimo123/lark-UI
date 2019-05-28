<template>
  <!-- 聊天记录的抽屉 -->
  <a-drawer
    title="聊天记录"
    placement="right"
    :getContainer="mountEle"
    :wrapStyle="{marginTop: '64px'}"
    :width="448"
    :closable="false"
    @close="onClose"
    :visible="activeOption=='talkHistory'">

    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script>
export default {
  name: 'TalkHistory',
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
    return {}
  },
  watch: {
    activeOption (newValue) {
      if (newValue === 'talkHistory') {
        console.log('在这里加载数据')
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {},
  methods: {
    /** 抽屉关闭时触发closeDrawer事件 */
    onClose () {
      this.$emit('closeDrawer')
    }
  }
}
</script>

<style>

</style>
