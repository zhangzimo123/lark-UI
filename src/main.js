import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from '@/utils/request' // axios 不建议引入到 Vue 原型链上

import './core/use'
import bootstrap from './core/bootstrap'
import '@/permission' // permission control
import '@/utils/filter' // global filter



Vue.config.productionTip = false

Vue.use(VueAxios, router)
Vue.prototype.publicPath = process.env.BASE_URL

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')

//定义全局变量 SocketGlobal
import socketApi from './api/socketApi'
Vue.prototype.SocketGlobal = new socketApi()