// import Vue from 'vue'
import { DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'
import { SECRETLEVEL_ENUM } from './constants'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      fixSidebar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

// 根据密级编码获取密级的过滤器
const mixinSecret = {
  filters: {
    // 人员密级
    peopleSecret: (code) => {
      return code ? SECRETLEVEL_ENUM.get(code).people : SECRETLEVEL_ENUM.get('default')
    },
    // 资源密级
    fileSecret: (code) => {
      return code ? SECRETLEVEL_ENUM.get(code).file : SECRETLEVEL_ENUM.get('default')
    }
  }
}
export { mixin, mixinDevice, mixinSecret }
