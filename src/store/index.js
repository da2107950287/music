import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShow: false,
    dialogFormVisible: false,//登录框
    headportrait: '',//用户头像
    nickname: '',//用户昵称
    token: '',//token
    vip: '',//是否是vip
    integral: null,//用户积分
    sex: '',//用户性别
    status: null,
    userid: "81C632A3B425FBC2",//直播用户id
    configId: "6a6f3d22-243d-4b3c-9e7f-5598c1057842",//环信id
    appid: "wx6dc461db685ab57c",
    secret: "d87ee1a6c1f86ca963fa83e9afa7df4b",
  },
  getters: {
    getUserId(state) {
      return state.userid;
    },
    getConfigId(state) {
      return state.configId;
    },
    getAppid(state) {
      return state.appid;
    },
    getForm(state) {

      return state.dialogFormVisible;
    },
    getSecret(state) {
      return state.secret;
    },
    getHeadportrait(state) {
      //先从state里面获取用户登录信息
      let headportrait = state.headportrait;
      //如果 state 里面获取不到，那么从localStorage里面获取
      if (!headportrait) {
        headportrait = localStorage.getItem('headportrait')
      }
      return headportrait;
    },
    getNickname(state) {
      let nickname = state.nickname;
      if (!nickname) {
        nickname = localStorage.getItem('nickname')
      }
      return nickname;
    },
    getSex(state) {
      let sex = state.sex;
      if (!sex) {
        sex = localStorage.getItem('sex')
      }
      return sex;
    },
    getToken(state) {
      let token = state.token;
      if (!token) {
        token = localStorage.getItem('token')
      }
      return token;
    },
    getUid(state) {
      let uid = state.uid;
      if (!uid) {
        uid = localStorage.getItem('uid')
      }
      return uid;
    },
    // loading(state){
    //   return state.isShow;
    // },
    // learnTime(state){
    // return state.accLeaTime;
    // },
    // token(state){
    //   return state.token;
    // },
    isShow(state) {
      return state.isShow
    }
  },
  mutations: {
    showLoading(state) {
      state.isShow = true;
    },
    hideLoading(state) {
      state.isShow = false;
    },
    setForm(state, payload) {
      console.log(payload)
      state.dialogFormVisible = payload.status;
    },
    setUserInfo(state, payload) {
      state.headportrait = payload.headportrait;
      state.nickname = payload.nickname;
      state.token = payload.token;
      state.vip = payload.vip;
      state.integral = payload.integral;
      state.sex = payload.sex;
      state.status = payload.status;
      localStorage.setItem("headportrait", payload.headportrait);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("nickname", payload.nickname);
      localStorage.setItem("vip", payload.vip);
      localStorage.setItem("sex", payload.sex);
      localStorage.setItem("state", payload.status);
      localStorage.setItem("uid", payload.uid);
    },
    setNickname(state, payload) {
      state.nickname = payload.nickname;
      state.sex = payload.sex;
    }
  },
  actions: {
    showLoading({ commit }) {
      commit('showLoading')
    },
    hideLoading({ commit }) {
      commit('hideLoading')
    },
    setNickname({ commit }, nickname, sex) {
      commit("setNickname", nickname, sex)
    },
    setForm({ commit }, status) {
      commit("setForm", {status})
    }
  },
  modules: {
  }
})
