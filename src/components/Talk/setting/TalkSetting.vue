<template>
  <div class="talk-setting" ref="settingDrawer">
    <a-drawer
      title="Create a new account"
      :mask="showMask"
      :width="360"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :getContainer="() => $refs.settingDrawer"
      :style="{}"
    >
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button
          :style="{marginRight: '8px'}"
          @click="onClose"
        >
          Cancel
        </a-button>
        <a-button @click="onClose" type="primary">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: true
    }
  },
  methods: {
    onClose () {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>
