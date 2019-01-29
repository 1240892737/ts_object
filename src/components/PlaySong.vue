<template>
  <div class="playSong">
    <div class="songDetail">
      <div class="songImg">
        <img src="" class="songImgUrl">
        <div class="songShade">
          <span class="iconfont icon-amplification_icon"></span>
        </div>
      </div>
      <div class="song">
        <div class="songName">adsaaaaaaaaaaaaa</div>
        <div class="songWriter">asd</div>
      </div>
    </div>
    <div class="handleSong">
      <div class="prevSong song-btn"><span class="iconfont icon-zshangyishou"></span></div>
      <div class="pause song-btn" @click="pause_btn">
        <span class="iconfont icon-zbofang" v-show="!pause"></span>
        <span class="iconfont icon-zzanting" v-show="pause"></span>
      </div>
      <div class="nextSong song-btn"><span class="iconfont icon-zxiayishou"></span></div>
    </div>
    <div class="songPlan">
      <div class="nowTime">{{ currentTime }}</div>
      <div class="progress" @click="progressClick($event)" ref="progress">
        <div class="nowProgress" :style="{width: progressW+'%'}"><span class="nowBtn"></span></div>
      </div>
      <div class="sumTime">{{ duration }}</div>
    </div>
    <!-- 音量大小 -->
    <div class="songVolume">
      <span class="iconfont icon-shengyin songOrder"></span>
      <div ref="audioVolume" class="sumVolume" @click="audioVolume($event)">
        <div class="nowVolume" :style="{width: songVolume +'%'}"><span class="nowBtn"></span></div>
      </div>
    </div>
    <!-- 播放顺序 -->
    <span class="iconfont icon-suijibofang songOrder"></span>
    <!-- preload在页面加载加载音频 -->
    <audio :src="songUrl" type="audio/mp3" autoplay="autoplay" class="audioWo" ref="myAudio"></audio>
  </div>
</template>
<script>
export default {
  name: 'playSong',
  data () {
    return {
      pause:false,
      currentTime: '00:00',
      duration: '04:00',
      progressW: '0',
      songVolume: '50',
    }
  },
  methods: {
    pause_btn(){
      var self = this;
      if(self.pause){
        this.$refs.myAudio.pause();
      }else{
        this.$refs.myAudio.play();
      }
      self.pause = !self.pause;
    },
    myAudioPlan(myAudio){
      // console.log(myAudio.currentTime)
      let currentString = this.timerdispose(myAudio.currentTime);
      let duration = this.timerdispose(myAudio.duration);
      let progressW = (myAudio.currentTime/myAudio.duration).toFixed(4)*100;
      // console.log(currentString)
      // if(this.duration!=duration){
      //   this.duration = duration;
      // }
      if(currentString != this.currentTime){
        this.currentTime = currentString;
        this.progressW = progressW;
      }
      //播放结束
      if(myAudio.duration-1 <= myAudio.currentTime){
        this.pause_btn();
      }
    },
    timerdispose(currentTime){
      currentTime = Math.floor(currentTime);
      let currentMinute = Math.floor(currentTime/60);
      if(currentMinute<10) currentMinute = '0'+currentMinute;
      let currentSec = Math.floor(currentTime%60);
      if(currentSec<10) currentSec = '0'+currentSec;
      return currentMinute +':'+ currentSec;
    },
    progressClick(e){
      let myAudio = this.$refs.myAudio;
      let progress = this.$refs.progress;
      let currentX = e.clientX-progress.parentNode.offsetLeft-47;
      // this.progressW*myAudio.duration;
      this.progressW = (currentX/progress.clientWidth).toFixed(4)*100;
      // console.log(this.progressW * myAudio.duration)
      myAudio.currentTime = (this.progressW * myAudio.duration/100).toFixed(2);
      this.pause = false;
      this.pause_btn();
    },
    audioVolume(e){
      let myAudio = this.$refs.myAudio;
      let audioVolume = this.$refs.audioVolume;
      let currentX = e.clientX-audioVolume.parentNode.offsetLeft-58;
      // this.progressW*myAudio.duration;
      this.songVolume = (currentX/audioVolume.clientWidth).toFixed(4)*100;
      console.log(this.songVolume)
      // console.log(this.progressW * myAudio.duration)
      myAudio.volume = (this.songVolume/100).toFixed(2);
    }
  },
  computed: {
    songUrl:function(){
      if(this.$refs.myAudio){
        let myAudio = this.$refs.myAudio;
        this.duration = this.timerdispose(myAudio.duration);
      }
      return this.$store.state.songUrl;
    }
  },
  created() {
    this.myHttp.getSongUrl('33894312',(res)=>{
      console.log(res.data.data[0])
      this.$store.commit('setSongUrl',res.data.data[0].url);
    });
  },
  mounted() {
    var myAudio = this.$refs.myAudio;
    if(myAudio != null){
      myAudio.load();
      myAudio.oncanplay = () => {  
        this.duration = this.timerdispose(myAudio.duration);
      }
      myAudio.ontimeupdate = ()=>{
        this.myAudioPlan(myAudio)
      };
      myAudio.pause();
    }
  },
}
</script>

<style lang='less'>
@import url(../less/index.less);
.audioWo{
  position: fixed;
  left: 0;
  top: 0;
}
.playSong{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: white;
  z-index: 3;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 5px 0;
  .songImg{
    display: inline-block;
    position: relative;
    width: 70px;
    height: 70px;
    cursor: pointer;
    margin-left: 5px;
    .songImgUrl{
      width: 70px;
      height: 70px;
    }
    .songShade{
      width: 70px;
      height: 70px;
    }
    .iconfont{
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 35px;
      line-height: 70px;
      background: rgba(0, 0, 0, .25);
      color: rgba(0, 0, 0, .4);
    }
  }
  .songImg:hover .iconfont{
      display: block;
  }
  .songDetail{
    max-width: 200px;
    display: flex;
    justify-content: center;
    border-right: 1px solid rgba(0, 0, 0, .2);
    .song{
      max-width: 100px; 
      line-height: 25px;
      margin: 5px 10px;
      text-align: left;
      .songName{
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .songWriter{
        color: #999999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  //暂停播放
  .handleSong{
    display: inline-block;
    width: 200px;
    margin: 0 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .song-btn{
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: @bg_wo;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      cursor: pointer;
      .iconfont{
        font-size: 28px;
      }
    }
    .pause{
      width: 54px;
      height: 54px;
    }
  }
  .songPlan{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    .progress{
      flex: 1;
      margin: 0 15px;
      height: 6px;
      border-radius: 3px;
      .box-shadow(0 0 1px 1px rgba(0, 0, 0, .1));
      background: #C2C2C4;
      .nowProgress{
        width: 50%;
        height: 6px;
        border-radius: 3px;
        background: linear-gradient(90deg,#C62F2F,#DA6363);
        .box-shadow(0 0 3px 0 #E2E489);
        // transition: width .24s linear;
        position: relative;
      }
    }
  }
  .nowBtn{
    display: inline-block;
    position: absolute;
    right: -7px;
    top: -5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    .box-shadow(0 0 1px 1px rgba(0,0,0,.25));
    cursor: pointer;
  }
  .nowBtn:hover{
    .box-shadow(0 0 1px 1px rgba(0,0,0,.4));
  }
  .nowBtn::before{
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6px;
    height: 6px;
    background: @bg_wo;
    border-radius: 50%;
    transform: translate(-50%,-50%);
  }
  //播放顺序
  .songOrder{
    margin: 0 10px;
    font-size: 20px;
    cursor: pointer;
  }
  //音量控制
  .songVolume{
    width: 20%;
    max-width: 200px;
    margin: 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .songOrder{
      margin: 0 10px 0 30px;
      position: relative;
    }
    .sumVolume{
      flex: 1;
      width: 50%;
      height: 6px;
      border-radius: 3px;
      .box-shadow(0 0 1px 1px rgba(0, 0, 0, .1));
      background: #C2C2C4;
    }
    .nowVolume{
      width: 50%;
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(90deg,#DA6363,#C62F2F);
      .box-shadow(0 0 3px 0 #F0A388);
      // transition: width .1s linear;
      position: relative;
      .nowBtn{
        display: none;
      }
    }
    &:hover .nowVolume .nowBtn{
      display: block;
    }
  }
}
</style>
