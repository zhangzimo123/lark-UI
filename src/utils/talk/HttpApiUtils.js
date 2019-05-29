import Vue from 'vue'
import conf from '@/api/index'
import { logout, timeoutFetch, tokenFetch } from './chatUtils'
import { ErrorType } from '@/utils/constants'

class HttpApiUtils {
  constructor () {
    this.timeOutTime = 5000 // 请求超时时间
  }

  /**
   * 初始化信息
   * @returns {Promise<any>}
   */
  initInfo () {
    return timeoutFetch(tokenFetch(conf.getInitUrl(), new FormData()), this.timeOutTime)
  }
  /**
   * 刷新token
   * @param flushTokenTimerId
   */
  flushToken (self) {
    console.log('开始刷新...')
    const apiSelf = this
    const param = new FormData()
    param.set('client_id', 'v-client')
    param.set('client_secret', 'v-client-ppp')
    param.set('grant_type', 'refresh_token')
    param.set('scope', 'select')
    // param.set('refresh_token', localStorage.getItem('Refresh-Token'))
    param.set('refresh_token', Vue.ls.get('Refresh-Token'))
    return timeoutFetch(
      fetch(conf.getTokenUrl(), {
        method: 'POST',
        model: 'cros', // 跨域
        headers: {
          Accept: 'application/json'
        },
        body: param
      }),
      apiSelf.timeOutTime
    )
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          return new Promise((resolve, reject) => {
            reject(ErrorType.FLUSH_TOKEN_ERROR)
          })
        }
      })
      .then(json => {
        self.$store.commit('SET_TOKEN', json)
        self.$store.commit('SET_TOKEN_STATUS', json)
        // 清除原先的刷新缓存的定时器
        self.$store.commit('CLEAR_FLUSH_TOKEN_TIME_ID')
        // 新的刷新token 定时器
        const flushTokenTimerId = setTimeout(function () {
          apiSelf.flushToken(self)
        }, ((json.expires_in - 10) * 1000))
        // 重新设置定时器
        self.$store.commit('SET_FLUSH_TOKEN_TIME_ID', flushTokenTimerId)
      })
      // 非常不幸，如果正好刷新token 时候网络中断，直接退出登录
      .catch(() => {
        logout(self)
      })
  }
}

export default HttpApiUtils
