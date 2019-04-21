<template>
  <!-- group info component -->
  <div class="group-info">

    <div v-if="Object.keys(selected).length == 0" class="unselected-tip">
      <h1>未选中群组</h1>
    </div>

    <div v-else class="selected-info">
      <h1>群组信息</h1>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GroupInfo',
  props: {
    // the selected group
    selected: {
      type: Object,
      default: () => ({}),
      required: true
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
