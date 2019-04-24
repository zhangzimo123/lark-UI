<template>
  <!-- group info component -->
  <div class="group-info">

    <div v-if="Object.keys(selected).length == 0" class="unselected-tip">
      <a-icon type="team" style="fontSize: 160px; color: #d7d9db" />
      <p>未选中群组</p>
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
  .group-info {
    height: 100%;
    text-align: center;
  }

  .unselected-tip {
    padding-top: 20%;
    color: #a5a7a9;
    font-size: 16px;
  }
</style>
