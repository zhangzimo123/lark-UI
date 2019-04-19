<template>
  <!-- recent contacts item -->
  <!-- 始终显示 联系人头像、群组或联系人名称
      如果有聊天记录：最新一条聊天记录、最新聊天时间
      如果没有都为空
      显示部分增加一个图标的预留位置 显示一些图标

      操作相关：
        1). 选中之后 背景颜色的变化
        2). 置顶之后 背景颜色的变化
      内容更新：
        1). chatList 列表自动更新
  -->
  <div class="chat-contacts">

  </div>
</template>

<script>
export default {
  name: 'ChatContactsItem',
  props: {
    // contacts information object
    contactsInfo: {
      type: Object,
      default: () => ({}),
      required: true
    },
    activated: {
      type: Boolean,
      default: false,
      required: true
    },
    istop: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
