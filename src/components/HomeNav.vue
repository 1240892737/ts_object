<template>
  <div class="homeNav">
    <div class="navLeft">
        <div class="logo111"><span class="iconfont icon-list_icon" @click="setTabber"></span><img src="../../public/logo1.png"  @click="toIndex"></div>
        <Search></Search>
    </div>
    <div class="navRight">
        <div class="message-nav" v-if="myProfile.length!=0">
            <img :src="myProfile.avatarUrl" class="nav-header">
            <div class="nav-name" @click="setTabber">{{myProfile.nickname}}<span class="iconfont icon-moreunfold"></span></div>
        </div>
        <div class="message-nav" v-else>
            <div class="nav-name" @click="setLogin">请登录</div>
        </div>
    </div>
  </div>
</template>
<script>
import Search from '../components/Search.vue';
export default {
  name: '',
  data () {
    return {
    }
  },
  created() {
  },
  props:['myProfile'],
  watch: {
      myProfile:function(a){
        this.myProfile = a;
      }
  },
  methods: {
    setTabber(){
      this.$store.dispatch('setTabberShow',true);
    },
    setLogin(){
        this.$store.commit('SET_LOGINSHOW',true);
    },
    toIndex(){
        this.$router.push('/');
    }
  },
  components:{
    Search
  },
  
}
</script>

<style lang='less'>
@import '../less/index.less';
.homeNav{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background: @bg_wo;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    .iconfont{
        color: rgba(255, 255, 255, .8);
        cursor: pointer;
    }
    .iconfont:hover{
        color: white;
    }
}
.navLeft{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logo111{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 0 40px;
    }
}
.navRight{
    .message-nav{
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: rgba(255, 255, 255, .8);
        font-size: 14px;
        cursor: pointer;
        margin: 0 10px;
        .nav-header{
            width: 30px;
            height: 30px;
            border-radius: 15px;
        }
        .nav-name{
            margin: 0 10px;
        }
    }
    .message-nav:hover{
        color: white;
        .iconfont{
            color: white;
        }
    }
}
</style>
