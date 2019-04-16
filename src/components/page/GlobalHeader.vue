<template>
  <!-- , width: fixedHeader ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'  -->
  <a-layout-header v-if="!headerBarFixed" :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]" :style="{ padding: '0' }">
    <div v-if="mode === 'sidemenu'" class="header">
      <a-icon
        v-if="deviceType==='mobile'"
        class="trigger"
        :type="collapsed ? 'menu-fold' : 'menu-unfold'"
        @click="toggle"></a-icon>
      <a-icon
        v-else
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggle"/>

      <!-- <user-menu></user-menu> -->
      <div class="tools-wrapper">
          <user-menu></user-menu>
          <span class="separation-line action" v-if="device=='tablet'">|</span>
          <window-option></window-option>
        </div>
    </div>
    <div v-else :class="['top-nav-header-index', theme]">
      <div class="header-index-wide">
        <div class="header-index-left">
          <logo class="top-nav-header" :show-title="deviceType !== 'mobile'" />
          <s-menu
            v-if="deviceType !== 'mobile'"
            mode="horizontal"
            :menu="menus"
            :theme="theme"
          ></s-menu>
          <a-icon
            v-else
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"></a-icon>
        </div>
        <!-- <user-menu class="header-index-right"></user-menu> -->
        <div class="tools-wrapper">
          <user-menu></user-menu>
          <span class="separation-line action" v-if="device=='tablet'">|</span>
          <window-option></window-option>
        </div>
      </div>
    </div>

  </a-layout-header>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import WindowOption from '../tools/WindowOption'
import SMenu from '../menu/'
import Logo from '../tools/Logo'


import { mixin, mixinDevice } from '@/utils/mixin.js'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    WindowOption,
    SMenu,
    Logo
  },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    deviceType: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      headerBarFixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (this.autoHideHeader) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 100) {
          this.headerBarFixed = true
        } else {
          this.headerBarFixed = false
        }
      } else {
        this.headerBarFixed = false
      }
    },
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
