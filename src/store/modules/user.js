import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
// import { ChatListUtils } from '@/utils/talk/chatUtils'

const user = {
  state: {
    token: {},
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_FLUSH_TOKEN_TIME_ID: function (state, flushTokenTimerId) {
      state.flushTokenTimerId = flushTokenTimerId
    },
    CLEAR_FLUSH_TOKEN_TIME_ID: function (state) {
      clearTimeout(state.flushTokenTimerId)
    },
    // token 是否有效
    SET_TOKEN_STATUS: function (state, tokenStatus) {
      state.tokenStatus = tokenStatus
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      // Vue.ls.set('Access-Token', token.access_token, 7 * 24 * 60 * 60 * 1000)
      // Vue.ls.set('Refresh-Token', token.refresh_token, 7 * 24 * 60 * 60 * 1000)
      // localStorage.setItem('Access-Token', token.access_token)
      // localStorage.setItem('Refresh-Token', token.refresh_token)
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response
          // 判断用户角色
          if (result.userRole && result.userRole.frontPermissionList.length > 0) {
            const role = result.userRole
            role.permissions = result.userRole.frontPermissionList
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.userRole)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles必须是非空数组!'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
          // commit('SET_RECENT_CHAT_LIST', result.chat.chatList)
          // ChatListUtils.setChatList(user.state.info.id, result.chat.chatList)
          resolve(response)
        }).then(() => {

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }

  }
}

export default user
