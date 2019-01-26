<template>
  <div class="shade">
    <div class="loginDia">
      <div class="login-bg"></div>
      <div class="dia-content">
        <label class="input-group"><span>用户：</span><div><input type="text" v-model="uid" placeholder="输入手机号或者邮箱" class="input_text"><span class="error" v-if="error_log">信息错误</span></div></label>
        <label class="input-group"><span>密码：</span><div><input type="password" @keydown.enter="login_btn" v-model="pwd" class="input_text"><span class="error" v-show="false">信息错误</span></div></label>
        <div class="login-btn" @click="login_btn">登录</div>
      </div>
      <span class="iconfont close" @click="closeLogin">&#xe6b7;</span> 
    </div>
  </div>
</template>
<script>
export default {
  name: 'loginDia',
  data () {
    return {
      uid:'',
      pwd:'',
      error_log:false,
    }
  },
  methods: {
    judge_email(value){
        if (value === '') {
          return false;
        } else {
          var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(!reg.test(value)){
            // console.log('请输入有效的邮箱')
            return false;
          }else{
            return true;
          }
        }
    },
    judge_phone(value){
        if (value === '') {
          return false;
        } else {
          var reg=/^1[3456789]\d{9}$/;
          if(!reg.test(value)){
            return false;
          }else{
            return true;
          }
        }
    },
    login_btn(){
      var th = this;
      // console.log(th.judge_email(th.uid)||th.judge_phone(th.uid))
      var email = th.judge_email(th.uid);
      var phone = th.judge_phone(th.uid);
      if(phone||email){
        th.error_log = false;
        if(th.pwd.length != 0){
          th.error_log = false;
          if(email){
            //邮箱登录
            this.myHttp.getEmail(this.uid,this.pwd,(res)=>{
              window.localStorage.setItem('uid',res.data.account.id);
              this.$store.dispatch('setOnline',res.data.profile);
              this.$emit('success')
            }).catch((error)=>{
              th.error_log = true;
            })
          }else{
            //手机登录
            this.myHttp.getPhone(this.uid,this.pwd,(res)=>{
              window.localStorage.setItem('uid',res.data.account.id)
              this.$store.dispatch('setOnline',res.data.profile);
              this.$emit('success')
            }).catch((error)=>{
              th.error_log = true;
            })
          }
        }
      }else{
        th.error_log = true;
      }
    },
    closeLogin(){
      console.log(1)
      this.$emit('closeDia',false);
    }
  }
}
</script>

<style lang='less' scope>
@import "../less/index.less";
  .loginDia{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 100%;
    max-width: 500px;
    height: 300px;
    border-radius: 6px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.16);
    transform: translate(-50%,-50%);
    .login-bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url(../../public/bg_login.jpg) no-repeat center center;
      .fliter_blur(5px);
    }
    .dia-content{
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2;
      transform: translate(-50%,-50%);
    }
    .input-group{
      width: 400px;
      margin: 10px auto;
      text-align: left;
      display: flex;
      justify-content: center;
      align-items: center;
      .input_text{
        margin-left: 10px;
        padding: 10px;
        border-radius: 6px;
        text-indent: 10x;
        outline: none;
        border: none;
      }
      >span{
        width: 25%;
        text-align: right;
      }
      >div{
        width: 75%;
      }
      .input_text:focus{
        .box-shadow(0 0 0 1px @bg_wo);
      }
    }
    .error{
      margin-left: 10px;
      font-size: 17px;
      color: @bg_wo;
    }
  }
</style>
