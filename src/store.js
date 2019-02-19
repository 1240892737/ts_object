import Vue from "vue";
import Vuex from "vuex";
import axios from "./http/http";
// import myFun from "../public/function";
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
    songPlay:true,
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
    setSongPlay(state,flag){
      state.songPlay = flag;
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
    setSongList(state,index){
      let songlists = JSON.parse(window.sessionStorage.getItem("playList"));
      let songUrls = songlists.map(v=>v.id);
      // console.log(index)
      if(index == undefined){
        index = Math.floor(Math.random() * songlists.length);
        index = parseInt(index);
        axios.getSongUrl(songUrls,(res)=>{
          state.commit("setSongList",res.data.data);
          state.commit("setSongUrl",res.data.data[index].url);
          state.commit("setSongId",res.data.data[index].id);
          // myFun.setSession({id:res.data.data[index].id,url:res.data.data[index].url})
        });
      }else{
        axios.getSongUrl(index,(res)=>{
          state.commit("setSongUrl",res.data.data[0].url);
          state.commit("setSongId",res.data.data[0].id);
        });
        axios.getSongUrl(songUrls,(res)=>{
          state.commit("setSongList",res.data.data);
        })
      };
      // console.log(index)
      // console.log(songlists)
      // console.log(songlists[index])
      
    },
    setSongs(){
    }
  }
});
