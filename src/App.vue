<template>
  <div id="app">
    <Tabber ref="tabber" :is-show="tabberShow" @setShow="setTabberShow" @openLogin="openLogin"></Tabber>
    <Home :tabberShow="tabberShow" @setShow="setTabberShow"></Home>
    <LoginDia @success="loginSuccess" @closeDia="openLogin" v-if="loginShow"></LoginDia>
  </div>
</template>
<script>
import Tabber from '@/views/Tabber.vue';
import Home from '@/views/Home.vue';
import LoginDia from './components/LoginDia.vue';
export default {
  data() {
    return {
      tabberShow:false,
      loginShow: false,
    }
  },
  components:{
    Tabber,Home,LoginDia
  },
  methods: {
    loginSuccess(){
      this.tabberShow = false;
      this.loginShow = false;
      this.$refs.tabber.isOnline();
    },
    setTabberShow(res){
      this.tabberShow = res;
    },
    openLogin(res){
      this.loginShow = res;
    },
  },
  created(){
    this.$store.dispatch('setOnline',{});
  }
}
</script>
<style>
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
</style>
