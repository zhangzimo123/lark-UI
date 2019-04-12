<template>
  <div v-if="device=='tablet'" class="option-wrapper">
    <span class="action" @click="handleOption('mini')">
      <a-icon type="minus" />
    </span>
    <span class="action" @click="handleOption('switch')">
      <a-icon type="switcher" />
    </span>
    <span class="action" @click="handleOption('close')">
      <a-icon type="close" />
    </span>
  </div>
</template>

<script>
import { minimizeWindow, switchWindow, closeWindow } from '@/utils/client'
import { mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'WindowOption',
  mixins: [mixinDevice],
  data () {
    return {}
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
