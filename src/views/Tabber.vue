<template>
  <transition name="shade" v-if="tabberShow">
    <div class="shade">
      <div class="tabber">
        <div class="message">
          <div class="Myimg" v-if="!myProfile">
            <img src="../../public/mascot1.jpg" alt="" class="headImg">
            <div class="login-btn" @click="openLogin">登录</div>
          </div>
          <div class="Myimg" v-else>
            <img :src="myProfile.avatarUrl" alt="" class="headImg">
            <div class="login-name">欢迎你,{{myProfile.nickname}}! <span class="logonOut" @click="logonOut">退出</span> </div>
          </div>
          <!-- 选项开始 -->
          <OptionTabber :title="true">
            <p class="text" slot="text">收藏的歌单</p>
          </OptionTabber>
          <OptionTabber v-for="(item,index) in likePlayList" :key="index" :item="item">
            <span slot="iconfont" class="iconfont icon-swticonyinle2"></span>
            <p class="text" slot="text">{{ item.name }}</p>
          </OptionTabber>
        </div>
        <span class="iconfont close icon-close_icon" @click="closeTabber"></span>
      </div>
    </div>
  </transition>
</template>
<script>
import OptionTabber from "../pages/tabber/OptionTabber.vue";
export default {
  name: '',
  data () {
    return {
      aa:'',
      bb:'',
      likePlayList:[]
    }
  },
  props:['myProfile'],
  computed: {
    tabberShow:function(){
      return this.$store.state.tabberShow;
    }
  },
  methods: {
    openLogin(){
      this.$store.commit('SET_LOGINSHOW',true);
    },
    closeTabber(){
      this.$store.commit('SET_TABBERSHOW',false);
    },
    logonOut(){
      this.myHttp.get('/apis/logout',(res)=>{
        if(res.data.code == 200){
          window.localStorage.removeItem('uid');
          this.$store.dispatch('successLogin');
          this.$emit('logonOut')
        }
      })
    },
    myLikeSong(){
      let localUid = window.localStorage.getItem("uid");
      if(this.myFun.isNaN_null(localUid)){
        this.myHttp.get("/apis/user/playlist?uid="+window.localStorage.getItem("uid"),res=>{
          // console.log(res.data);
          this.likePlayList = res.data.playlist;
          // console.log(this.likePlayList)
        })
      }
    }
  },
  components:{
    OptionTabber,
  },
  created(){
    this.myLikeSong();
  },
  mounted() {
    var th = this;
    // this.myHttp.get('/apis/playlist/detail?id=24381616',(res,req)=>{
    //   // console.log(res.data.playlist.coverImgUrl)
    //   th.aa = res.data.playlist.coverImgUrl;
    // })
    // this.myHttp.get('/apis/song/url?id=24381618',(res,req)=>{
    //   console.log(res.data.data[0])
    //   // th.bb = res.data.playlist.coverImgUrl;
    // })
    window.addEventListener('click',(e)=>{
      if(e.target.className == 'shade'){
        // console.log(th.isShow)
        this.$store.commit('SET_TABBERSHOW',false);
      }
    })
  },
  destroyed() {
    window.removeEventListener('click',(e)=>{
      if(e.target.className == 'shade'){
        // console.log(th.isShow)
        this.$store.commit('SET_TABBERSHOW',false);
      }
    });
  }
}
</script>

<style lang='less'>
@import "../less/index.less";
  .shade{
    user-select: none;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    .tabber{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      max-width: 400px;
      .box-shadow(0 1px 5px @bg_wo);
      background: white;
    }
    .Myimg{
      margin-bottom: 20px;
      .headImg{
        display: block;
        width: 120px;
        height: 120px;
        margin: 20px auto;
        border-radius: 50%;
      }
      .logonOut{
        margin-left: 20px;
        color: @bg_wo;
        cursor: pointer;
        font-size: 12px;
      }
    }
  }
  .shade-enter-active{
    transition: all .5s ease-in-out;
  }
  .shade-leave-active{
    transition: all .25s linear;
  }
  .shade-enter,.shade-leave-to{
    transform: translateX(-400px);
  }
  .login-btn{
    width: 90px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    .box-shadow(0 0 0 1px #e3e3e3);
    border-radius: 6px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    background: transparent;
  }
  .login-btn:hover{
    color: white;
    .box-shadow(none);
    background: @bg_wo;
  }
</style>
