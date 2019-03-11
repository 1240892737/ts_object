<template>
  <div class="now-play">
    <div class="now-header">
        <span class="iconfont icon-guanbi close"></span>
        <div class="btn-group">
            <div class="now-btn">播放列表</div>
            <div class="local-btn">历史记录</div>
        </div>
    </div>
    <div class="now-content">
        <logItem v-if="Object.keys(nowList).length != 0" v-for="(item,index) in nowList" :key="index">

        </logItem>
    </div>
  </div>
</template>
<script>
import logItem from '../Search/LogItem';
export default {
  name: 'nowPlay',
  data () {
    return {
        nowList:[]
    }
  },
  created() {
    this.nowList = this.myFun.getSess('playList');
  },
  methods: {},
  components:{
    logItem
  }
}
</script>

<style lang='less'>
.now-play{
    position: absolute;
    right: 8px;
    bottom: 85px;
    width: 100%;
    max-width: 450px;
    height: 350px;
    background: rgba(255, 255, 255, .95);
    border-radius: 8px;
    .now-header{
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .close{position: absolute;top: 0;right: 0;}
    }
    .now-content{
        height: 310px;
        overflow: auto;
    }
}
</style>
