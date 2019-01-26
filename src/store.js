import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    online:false,
    uid:'',
    nickname:'',
    avatarUrl:''
  },
  mutations: {
  },
  actions: {
    setOnline(th,res){
      var res = res || '';
      let storage=window.localStorage;
      if(storage.getItem("uid")){
        this.online = true;
        this.uid = storage.getItem("uid");
        this.nickname = res.nickname;
        this.avatarUrl = res.avatarUrl;
      }else{
        this.online = false;
        this.uid = '';
      }
    },
  }
});
