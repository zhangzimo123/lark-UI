<template>
  <!-- contacts info component -->
  <div class="contacts-info">

    <!-- tips without contacts selected -->
    <div v-if="Object.keys(selected).length == 0" class="unselected-tip">
      <h1>未选中联系人</h1>
    </div>

    <!-- selected contacts info -->
    <div v-else class="selected-info">
      <h1>联系人信息</h1>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ContactsInfo',
  props: {
    // selected contacts
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
