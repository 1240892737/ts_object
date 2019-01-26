<template>
  <transition name="shade" v-if="isShow">
    <div class="shade">
      <div class="tabber">
        <div class="message">
          <div class="Myimg" v-if="!Myimg">
            <img src="../../public/mascot1.jpg" alt="" class="headImg">
            <div class="login-btn" @click="openLogin">登录</div>
          </div>
          <div class="Myimg" v-else>
            <img :src="Myimg" alt="" class="headImg">
            <div class="login-name">欢迎你,{{uidName}}!</div>
          </div>
        </div>
        <span class="iconfont close" @click="closeTabber">&#xe6b7;</span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      aa:'',
      bb:'',
      Myimg: '',
      uidName:'',
    }
  },
  props:{
    isShow:{
      type: Boolean,
      default: true
    }
  },
  methods: {
    isOnline(){
      var uid = window.localStorage.getItem('uid');
      if(uid){
        this.myHttp.get('/apis/user/detail?uid='+uid,(res)=>{
          console.log(res.data);
          this.$store.dispatch('setOnline',res.data.profile);
          this.Myimg = this.$store.avatarUrl;
          this.uidName = this.$store.nickname;
        })
      }
    },
    openLogin(){
      this.$emit('openLogin',true)
    },
    closeTabber(){
      this.$emit('setShow',false)
    },
  },
  components:{
    
  },
  created(){
    // this.myHttp.getSongUrl([405998841,33894312],function(res){
    //   console.log(res)
    // });
    this.isOnline();
  },
  mounted() {
    var th = this;
    this.myHttp.get('/apis/playlist/detail?id=24381616',(res,req)=>{
      // console.log(res.data.playlist.coverImgUrl)
      th.aa = res.data.playlist.coverImgUrl;
    })
    // this.myHttp.get('/apis/song/url?id=24381618',(res,req)=>{
    //   console.log(res.data.data[0])
    //   // th.bb = res.data.playlist.coverImgUrl;
    // })
    window.addEventListener('click',(e)=>{
      if(e.target.className == 'shade'){
        // console.log(th.isShow)
        th.$emit('setShow',false)
        this.$emit('loginSuccess')
      }
    })
  },
  destroyed() {
    window.removeEventListener('click',(e)=>{
      if(e.target.className == 'shade'){
        // console.log(th.isShow)
        th.$emit('setShow',false)
        this.$emit('loginSuccess')
      }
    });
  }
}
</script>

<style lang='less'>
@import "../less/index.less";
  .shade{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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
      .headImg{
        display: block;
        width: 120px;
        height: 120px;
        margin: 20px auto;
        border-radius: 50%;
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
