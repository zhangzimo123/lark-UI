<template>
  <div v-if="device=='tablet'" class="option-wrapper">
    <a-tooltip title="最小化" :mouseLeaveDelay="0">
      <span class="action" @click="handleOption('mini')">
        <a-icon type="minus" />
      </span>
    </a-tooltip>
    <a-tooltip :title="isFullScreen ? '向下还原' : '最大化'" :mouseLeaveDelay="0">
      <span class="action" @click="handleOption('switch')">
        <a-icon type="switcher" />
      </span>
    </a-tooltip>
    <a-tooltip title="关闭" :mouseLeaveDelay="0">
      <span class="action" @click="handleOption('close')">
        <a-icon type="close" />
      </span>
    </a-tooltip>
  </div>
</template>

<script>
import { minimizeWindow, switchWindow, closeWindow, isFullScreen } from '@/utils/client.js'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'WindowOption',
  mixins: [mixinDevice],
  data () {
    return {}
  },
  computed: {
    isFullScreen () {
      return isFullScreen()
    }
  },
  methods: {
    handleOption (option) {
      switch (option) {
        case 'mini':
          minimizeWindow()
          break
        case 'switch':
          switchWindow()
          break
        case 'close':
          closeWindow()
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
