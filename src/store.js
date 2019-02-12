import Vue from "vue";
import Vuex from "vuex";
import axios from "./http/http";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    online:false,
    uid:'',
    tabberShow: false,
    loginShow: false,
    bgUrl:"",
    songUrl:'',
    songId:'',
    songList:[],
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
    },
    setSongList(state,songLists){
      state.songList = songLists;
    },
    randomSong(){

    },
    setBgUrl(state,bgUrl){
      state.bgUrl = bgUrl;
    },
  },
  actions: {
    successLogin(state){
      state.commit('SET_LOGINSHOW',false);
      state.commit('SET_TABBERSHOW',false);
      state.commit('setOnline');
    },
    setTabberShow(context,res){
      context.commit('SET_TABBERSHOW',res)
    },
    
    setSongList(state,songlists,index){
      // console.log(index)
      index = index || Math.floor(Math.random() * songlists.length);
      index = parseInt(index);
      // console.log(songlists)
      window.sessionStorage.setItem("playList",JSON.stringify(songlists));
      // console.log(songlists[index])
      let songUrls = songlists.map(v=>v.id);
      axios.getSongUrl(songUrls,(res)=>{
        state.commit('setSongList',res.data.data)
        state.commit('setSongUrl',res.data.data[index].url)
        state.commit('setSongId',res.data.data[index].id)
        // console.log(songlists[index])
      });
    },
    setSongs(){
      
    }
  }
});
