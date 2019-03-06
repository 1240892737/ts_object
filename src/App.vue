<template>
  <div id="app">
    <Tabber :myProfile="myProfile" @logonOut="logonOut"></Tabber>
    <Home :myProfile="myProfile"></Home>
    <LoginDia></LoginDia>
  </div>
</template>
<script>
import Tabber from '@/views/Tabber.vue';
import Home from '@/views/Home.vue';
import LoginDia from './components/LoginDia.vue';
export default {
  data() {
    return {
      myProfile:''
    }
  },
  components:{
    Tabber,Home,LoginDia
  },
  computed: {
  },
  methods: {
    isOnline(){
      var th = this;
      var uid = window.localStorage.getItem('uid');
      if(uid){
        this.myHttp.get('/apis/user/detail?uid='+uid,(res)=>{
          th.myProfile = res.data.profile;
        })
      }
    },
    logonOut(){
      this.myProfile = '';
    }
  },
  created() {
    
  },
  mounted() {
    this.isOnline();
    // this.myProfile = {nickname:'asd'}
  },
  watch: {
    '$store.state.uid':function(newVal,oldVal){
      if(newVal){
        this.isOnline();
      }else{
        console.log('登录失败')
      }
    },
    '$route':function(newVal){ //监听路由
      if(newVal.path.indexOf('/recommend')||newVal.path.indexOf('/playlist')){
        this.$store.commit('setSongDetailShow',false);
      }
    }
  },
}
</script>
<style lang="less">
@import "./less/index.less";
@import './assets/iconfont/iconfont.css';
*{margin: 0;padding: 0}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}
.close{
  position: absolute;
  right: 10px;
  top: 10px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 22px;
  cursor: pointer;
}
.recommend{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 100px;
  .songList{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
.text-badge{
  padding: 2px;
  box-shadow: 0 0 0 1px @bg_wo;
  color: @bg_wo;
  margin: 0 2px;
}
.icon-aixin{
  color: @bg_wo;
}
</style>
