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
    :visible="visible">

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
    return {
      visible: false
    }
  },
  watch: {
    activeOption (newVal) {
      this.visible = (newVal === 'talkHistory')
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {},
  methods: {
    onClose () {
      this.$emit('closeDrawer')
    }
  }
}
</script>

<style>

</style>
