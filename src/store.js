import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    online:false,
    uid:'',
    tabberShow: false,
    loginShow: false,
    bgUrl:"../../public/mascot2.jpg",
    songUrl:'',
    songId:'',
  },
  mutations: {
    SET_TABBERSHOW(state,res){
      state.tabberShow = res;
    },
    SET_LOGINSHOW(state,res){
      state.loginShow = res;
    },
    setOnline(state){
      let storage = window.localStorage;
      if(storage.getItem("uid")){
        state.online = true;
        state.uid = storage.getItem("uid");
      }else{
        state.online = false;
        state.uid = '';
      }
    },
    setSongUrl(state,songUrl){
      state.songUrl = songUrl;
    },
    setSongId(state,songId){
      state.songId = songId;
    }
    
  },
  actions: {
    successLogin(state){
      state.commit('SET_LOGINSHOW',false);
      state.commit('SET_TABBERSHOW',false);
      state.commit('setOnline');
    },
    setTabberShow(context,res){
      context.commit('SET_TABBERSHOW',res)
    }
  }
});
