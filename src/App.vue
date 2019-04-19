<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'

export default {
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
      console.log('deviceType', deviceType)
    })
  }
}
</script>
<style>
  #app {
    height: 100%;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    border-radius: 5px;
    -webkit-border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #c3c3c3;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track:hover {
    background-color: #f0f2f5;
  }
</style>
