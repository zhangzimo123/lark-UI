import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const msgStore = {
  state: {
    message:{}
  },
  mutations:{
      // 变更状态
    setMsg(state,message){
      state.message = message
    }
  },
  getters:{
    getMsg(){
      return state.message
    }
  },
  actions:{
    SET_MSG(context,message){
      context.commit('setMsg',message)
    }
  }
}

export default msgStore