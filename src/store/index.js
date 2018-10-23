import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
}
const mutations = {
}
const Loading = {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
}
const local = {
  state: {
    local: {},          //用户位置
  },
  mutations:{
    updateLocal(state, local){      //更新用户位置
      state.local = local
    },
  }
}
const token = {
  state: {
    tokenObj : {
      token:'',
      mpToken:''
    },
    token:window.localStorage.getItem("token"),
    mpToken:window.localStorage.getItem("mpToken"),
    upMpToken:null

  },
  mutations: {
    login (state, tokenObj) {
        if(tokenObj.token){
          window.localStorage.setItem("token", tokenObj.token)
          state.token=window.localStorage.getItem("token")
        }
        if(tokenObj.mpToken){
          window.localStorage.setItem("mpToken", tokenObj.mpToken)
          state.mpToken=window.localStorage.getItem("mpToken")
        }
    },
    logout(state){
      state.token=null
      state.mpToken=null
    }
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    Loading,
    local,
    token
  }
})
export default store
