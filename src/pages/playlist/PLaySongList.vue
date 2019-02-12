<template>
  <div class="pLaySongList">
    <div class="pLaySongList-title pLaySongList-item">
      <div class="serial-number"></div>
      <div class="pLaySongList-operation">操作</div>
      <div class="pLaySongList-name">音乐标题</div>
      <div class="pLaySongList-singer">歌手</div>
      <div class="pLaySongList-album">专辑</div>
      <div class="pLaySongList-time">时长</div>
    </div>
    <div class="pLaySongList-item pLaySongList-songs" @dblclick.stop="songsDblclick($event)" v-for="(item,index) in songs" :data-id="item.id" :key="index">
      <div class="serial-number">
        <span v-if="item.id != songId">{{ index | padStart}}</span>
        <span class="iconfont icon-shengyin1" v-else></span>
      </div>
      <div class="pLaySongList-operation">
        <span class="iconfont icon-love_icon" v-if="!item.subscribed"></span>
        <span class="iconfont icon-aixin_shixin" v-else></span>
      </div>
      <div class="pLaySongList-name">{{ item.name }}</div>
      <div class="pLaySongList-singer"><span v-for="(item1,index1) in item.ar" :key="index1"><span v-if="index1!=0">/</span>{{ item1.name }}</span></div>
      <div class="pLaySongList-album">{{ item.al.name }}</div>
      <div class="pLaySongList-time">{{ (item.dt/1000)|timerss }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pLaySongList',
  props:["songs"],
  data () {
    return {
    }
  },
  methods: {
    songsDblclick(e){
      let thELement = e.target.parentNode;
      // console.log(thELement)
      for(;;){
        if(thELement.className.indexOf("pLaySongList-songs")!=-1){
          break;
        }else{
          thELement = thELement.parentNode;
        }
      }
      // let a = 
      // let index = null;
      // this.songs.forEach((item,index1)=> {if(item.id==thELement.dataset.id)index = index1});
      // console.log(index)
      this.$store.dispatch("setSongList",this.songs);
      // console.log(thELement)
      this.myHttp.getSongUrl(thELement.dataset.id,(res)=>{
        // console.log(res.data)
        this.$store.commit('setSongId',res.data.data[0].id);
        this.$store.commit('setSongUrl',res.data.data[0].url);
      })
    }
  },
  created() {
    // console.log(this.songs)
  },
  filters:{
    padStart(val){
      let a = parseInt(val);
      if(a<10) return "0"+a;
      return a;
    },
    timerss(currentTime){
      currentTime = Math.floor(currentTime);
      let currentMinute = Math.floor(currentTime/60);
      if(currentMinute<10) currentMinute = '0'+currentMinute;
      let currentSec = Math.floor(currentTime%60);
      if(currentSec<10) currentSec = '0'+currentSec;
      return currentMinute +':'+ currentSec;
    }
  },
  mounted() {
    console.log(this.myFun.timerdispose(227000))
  },
  computed: {
    songId(){
      return this.$store.state.songId;
    }
  },
}
</script>
<style lang='less' scope>
@import "../../less/index.less";
.icon-aixin_shixin{
  color: @bg_wo;
}
.pLaySongList{
  color: rgba(255, 255, 255, .85);
  user-select: none;
  .pLaySongList-item{
    display: flex;
    align-items: center;
    text-align: left;
    padding: 5px 0;
    text-indent: 8px;
    .serial-number{
      width: 5%;
      text-indent: 16px;
    }
    .pLaySongList-operation{
      width: 10%;
    }
    .pLaySongList-name,.pLaySongList-singer,.pLaySongList-album{
      width: 26%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .pLaySongList-time{
      flex: 1;
    }
  }
  .pLaySongList-songs:nth-child(2n+1){
    background: rgba(255,255,255,.07);
  }
  .pLaySongList-songs:hover{
    background: rgba(0, 0, 0, .3);
  }
}
.pLaySongList-title{
  font-size: 14px;
  >div{
    height: 20px;
    box-sizing: border-box;
    border: 1px solid rgba(255,255,255, .4);
  }
}
.icon-shengyin1{
  color: @bg_wo;  
}
</style>
