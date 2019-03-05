<template>
  <div class="log-item">
    <p class="myFirst" :data-name='first'>{{ first }}</p>
    <span v-if="icon" class="iconfont icon-guanbi" @click="closeLog"></span>
  </div>
</template>
<script>
export default {
  name: 'logItem',
  data () {
    return {
    }
  },
  methods: {
    closeLog(){
      let local = JSON.parse(window.localStorage.getItem('localLog'));
      for(let i in local){
        if(local[i] == this.first){
          local.splice(i,1);
          i--;
        }
      }
      this.myFun.setLocal('localLog',local);
      this.$emit('setlocalLog');//告诉父组件我已经删除，需要更新
    },
  },
  props:['icon','first']
}
</script>

<style lang='less' scope>
  .log-item{
    height:28px;
    line-height: 28px;
    box-sizing: border-box;
    padding: 0 16px;
    text-align: left;
    position: relative;
    .icon-guanbi{
      display: none;
      position: absolute;
      right: 24px;
      font-size: 14px;
      top: 0px;
      color: #333!important;
    }
  }
  .log-item:hover{
    background: rgba(0, 0, 0, .16);
    .icon-guanbi{
      display: block;
    }
    
  }
</style>
