<template>
  <!-- contacts info component -->
  <div class="contacts-info">

    <!-- tips without contacts selected -->
    <!-- <div v-if="Object.keys(selected).length == 0" class="unselected-tip">
      <a-icon type="user" style="fontSize: 160px; color: #d7d9db" />
      <p>未选中联系人</p>
    </div> -->

    <!-- selected contacts info -->
    <!-- <div v-else class="selected-info"> -->
    <div class="selected-info">
      <div class="info-wrapper">
        <p>123</p>
      </div>

      <div class="info-wrapper">
        <p>123</p>
      </div>
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

  .selected-info {
    height: 100%;
    padding-top: 15%;
    background-color: aqua;

    .info-wrapper {
      margin: 0 auto;
      width: 350px;
      height: 200px;
      background-color: pink;
    }
  }
</style>
