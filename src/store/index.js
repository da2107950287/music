import Vue from 'vue'
import Vuex from 'vuex'
// import chat from "./chat";
import login from "./login"
import test from "./test"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow:false,
    accLeaTime: null,//累计学习时间 单位分钟
    headportrait:'',
    nickname:'',
    token:'',
    vip:'',
    integral:null,
    sex:'',
    status:null
    // token:'',
  },
  getters:{
    loading(state){
      return state.isShow;
    },
    learnTime(state){
    return state.accLeaTime;
    },
    token(state){
      return state.token;
    },
    isShow(state){
      return state.isShow
    }
  },
  mutations: {
    showLoading(state){
      state.isShow=true;

    },
    hideLoading(state){
      state.isShow=false;
    },
    setUserInfo(state,payload){
      state.accLeaTime=payload.accLeaTime;
      state.headportrait=payload.headportrait;
      state.nickname=payload.nickname;
      state.token=payload.token;
      state.vip=payload.vip;
      state.integral=payload.integral,
      state.sex=payload.sex;
      state.status=payload.status;
    },
    setToken(state,payload){
      state.token=payload.token;
    }
  },
  actions: {
    showLoading({commit}){
     
      commit('showLoading')
    },
    hideLoading({commit}){
      commit('hideLoading')
    },
    // setToken(context,payload){
    //   context.commit('setToken',payload)
    // }
  },
  modules: {
    // chat,
    login,
    test

  }
})
