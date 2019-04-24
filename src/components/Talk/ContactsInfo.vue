<template>
  <!-- contacts info component -->
  <div class="contacts-info">

    <!-- tips without contacts selected -->
    <div v-if="Object.keys(selected).length == 0" class="unselected-tip">
      <a-icon type="user" style="fontSize: 160px; color: #d7d9db" />
      <p>未选中联系人</p>
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
  .contacts-info {
    height: 100%;
    text-align: center;
  }

  .unselected-tip {
    padding-top: 20%;
    color: #a5a7a9;
    font-size: 16px;
  }
</style>
