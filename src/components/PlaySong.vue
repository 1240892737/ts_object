<template>
  <div class="playSong">
    <div class="songDetail">
      <div class="songImg" @click="toSongDetails">
        <img :src="songImg" class="songImgUrl">
        <div class="songShade">
          <span class="iconfont icon-amplification_icon"></span>
        </div>
      </div>
      <div class="song">
        <div class="songName">{{ songName }}</div>
        <div class="songWriter">{{ songWriter }}</div>
      </div>
    </div>
    <!-- 上一首/下一首 -->
    <div class="handleSong">
      <div class="prevSong song-btn" @click="nextPrevSong(-1)"><span class="iconfont icon-zshangyishou"></span></div>
      <div class="pause song-btn" @click="pause_btn(pause)">
        <span class="iconfont icon-zbofang" v-show="!pause"></span>
        <span class="iconfont icon-zzanting" v-show="pause"></span>
      </div>
      <div class="nextSong song-btn" @click="nextPrevSong(1)"><span class="iconfont icon-zxiayishou"></span></div>
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
      <span class="iconfont icon-shengyin songOrder" @click="toggleMuted"></span>
      <div ref="audioVolume" class="sumVolume" @click="audioVolume($event)">
        <div class="nowVolume" :style="{width: songVolume +'%'}"><span class="nowBtn"></span></div>
      </div>
    </div>
    <!-- 播放顺序 -->
    <span @click="setSongOrder" :class="{'iconfont':true,'songOrder':true,'icon-suijibofang':songOrder==3,'icon-danquxunhuan':songOrder==2,'icon-xunhuanbofang':songOrder==1}"></span>
    <!-- 播发列表 -->
    <div class="song-number" @click="openList"><span class="song-number-text">{{ sessionLength }}</span></div>
    <nowPLay v-if="nowPlay"></nowPLay>
    <!-- preload在页面加载加载音频 -->
    <audio :src="songUrl" type="audio/mp3" autoplay="autoplay" loop class="audioWo" ref="myAudio"></audio>
  </div>
</template>
<script>
import nowPLay from '../pages/playlist/nowPlay';
export default {
  name: 'playSong',
  data () {
    return {
      currentTime: '00:00',
      duration: '04:00',
      progressW: '0',
      songVolume: '100',
      songName: 'aaaaa',
      songWriter: 'asd',
      songImg:'',
      songOrder: 1,//1是顺序播放，2是单曲循环，3是随机播放
      timer:null,//节流
      sessionLength:0,//播放歌曲数,
      nowPlay:true,//播放列表显示
    }
  },
  methods: {
    //暂停/播放
    pause_btn(bool){
      var self = this;
      // console.log(bool)
      bool?self.$store.commit("setSongPlay",false):self.$store.commit("setSongPlay",true);
      this.pause?this.$refs.myAudio.play():this.$refs.myAudio.pause();
    },
    // audio播放函数
    myAudioPlan(myAudio){
      // console.log(myAudio.currentTime)
      let currentString = this.myFun.timerdispose(myAudio.currentTime);
      let duration = this.myFun.timerdispose(myAudio.duration);
      let progressW = (myAudio.currentTime/myAudio.duration).toFixed(4)*100;
      if(currentString != this.currentTime){
        this.currentTime = currentString;
        this.progressW = progressW;
      }
      this.$emit("setCurrentTime",myAudio.currentTime.toFixed(2));
      if(myAudio.currentTime>myAudio.duration-0.4) this.nextPrevSong(1,true);
    },
    //音乐进度点击事件
    progressClick(e){
      let myAudio = this.$refs.myAudio;
      let progress = this.$refs.progress;
      let currentX = e.clientX-progress.parentNode.offsetLeft-47;
      // this.progressW*myAudio.duration;
      this.progressW = (currentX/progress.clientWidth).toFixed(4)*100;
      // console.log(this.progressW * myAudio.duration)
      myAudio.currentTime = (this.progressW * myAudio.duration/100).toFixed(2);
      this.pause_btn(false);
    },
    //音量点击事件
    audioVolume(e){
      let audioVolume = this.$refs.audioVolume;
      let currentX = e.clientX-audioVolume.parentNode.offsetLeft-58;
      // this.progressW*myAudio.duration;
      // this.songVolume = (currentX/audioVolume.clientWidth).toFixed(4)*100;
      // console.log(this.progressW * myAudio.duration)
      this.songVolume = (currentX/audioVolume.clientWidth).toFixed(4)*100;
      // console.log(this.songVolume)
      this.setVolume(this.songVolume);
      this.$refs.myAudio.muted = false;//静音关闭
    },
    //设置音量
    setVolume(num){
      console.log(num)
      this.$refs.myAudio.volume = (num/100).toFixed(2);
    },
    //静音和不静音
    toggleMuted(){
      let myAudio = this.$refs.myAudio;
      let muted = myAudio.muted;
      // console.log(myAudio.volume)
      myAudio.muted = !muted;
      !muted?this.songVolume=0:this.songVolume=myAudio.volume * 100;
    },
    //切歌
    closerSong(id){
      // this.$store.commit('setSongUrl',url);
      this.$store.commit('setSongId',id);
      // this.myFun.setSession({id:id,url:url})
    },
    // 下一首歌
    nextPrevSong(w,auto){
      clearTimeout(this.timer);
      // console.log(songList)
      this.timer = setTimeout(()=>{
        let index = 0;
        let songList = this.$store.state.songList;
        if(songList.length == 0){
          songList = JSON.parse(window.sessionStorage.getItem("playList"));
          // this.$store.dispatch("setSongList",songList)
        }
        // console.log(songList)
        let myAudio = this.$refs.myAudio;
        var auto = auto || false;
        myAudio.currentTime = 0;
        this.currentTime = "00:00";
        this.progressW = "0";
        if(this.songOrder == 3){
          index = Math.floor(Math.random() * songList.length);
        }else{
          if(auto && this.songOrder == 2){
            return;
          }else{
            //找出现在歌曲的下标
            songList.forEach((v,i)=>{
              if(v.id == this.$store.state.songId) index = i;
            });
            if(w>0){//下一首
              if(index >= songList.length-1){
                index=0;
              }
              else index++;
            }else{
              if(index == 0) index=songList.length-1;
              else index--
            }
          }
        }
        console.log(index)
        // let indexUrl = songList[index].url;
        let indexId = songList[index].id;
        this.closerSong(indexId);
      },200);
    },
    //修改路径
    setSongOrder(){
      this.songOrder++;
      if(this.songOrder>3) this.songOrder=1;
    },
    //监听songUrl的事件
    songUrlWacth(){
      if(this.$store.state.songId){
        // console.log(this.$store.state.songId)
        this.myHttp.getSongDetail(this.$store.state.songId,(res)=>{
          // console.log(res.data.songs.length)
          if(res.data.songs.length == 1){
            this.songName = res.data.songs[0].name;
            this.songImg = res.data.songs[0].al.picUrl;
            this.songWriter = res.data.songs[0].ar.map(v=>v.name).join('/') ;
            this.$store.commit('setBgUrl',res.data.songs[0].al.picUrl);
            window.localStorage.setItem('songUrl',this.$store.state.songUrl);
            window.localStorage.setItem('songId',this.$store.state.songId);
            // this.closerSong(this.$store.state.songUrl,this.$store.state.songId)
            this.pause_btn(false)
          }
          // console.log(this.$store.state.songList);
        })
      }
    },
    //打开歌曲详情
    toSongDetails(){
      // console.log(this.$store.state.SongDetailShow)
      this.$emit('toSongDetails',!this.$store.state.SongDetailShow);
    },
    //打开播放列表
    openList(){

    }
  },
  computed: {
    songUrl:function(){
      if(this.$refs.myAudio){
        let myAudio = this.$refs.myAudio;
        this.duration = this.myFun.timerdispose(myAudio.duration);
      }
      return this.$store.state.songUrl;
    },
    pause(){
      return this.$store.state.songPlay;
    },
  },
  watch: {
    '$store.state.songId':function(newVal,oldVal){
      this.sessionLength = this.myFun.getSess('playList').length||[];
      if(newVal!=null&&!isNaN(newVal)){
        // console.log(newVal)
        this.myHttp.getSongUrl(newVal,(res)=>{
          // console.log(res.data.data[0].url) 
          this.$store.commit('setSongUrl',res.data.data[0].url)
          this.songUrlWacth();
          this.$emit('songChange');
        })
        return newVal;
      };
      return '';
    },
  },
  created() {
    //保存并且创建第一歌曲记录
    let session = window.sessionStorage;
    let localStorage = window.localStorage;
    this.closerSong(parseInt(localStorage.getItem('songId')));
    //更新歌单
    let playListsId = localStorage.getItem('playLists');
    this.myFun.isNaN_null(localStorage.getItem('playLists'))?playListsId = localStorage.getItem('playLists'):playListsId = '442267551';
    this.myHttp.get('/apis/playlist/detail?id='+playListsId,(res)=>{
      window.sessionStorage.setItem("playList",JSON.stringify(res.data.privileges));
      this.$store.dispatch('setSongList');
    })
  },
  mounted() {
    var myAudio = this.$refs.myAudio;
    if(myAudio != null){
      myAudio.load();
      myAudio.oncanplay = () => {  
        this.duration = this.myFun.timerdispose(myAudio.duration);
      }
      myAudio.ontimeupdate = ()=>{
        this.myAudioPlan(myAudio)
      };
      this.songUrlWacth();
    };
    //用来保存随机播放的路径
  },
  components:{
    nowPLay
  }
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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 5px 0;
  .songImg{
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    cursor: pointer;
    .songImgUrl{
      width: 80px;
      height: 80px;
      margin-left: 1px;
    }
    .songShade{
      width: 80px;
      height: 80px;
      .iconfont{
        color: white;
      }
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
    max-width: 240px;
    display: flex;
    justify-content: center;
    border-right: 1px solid rgba(0, 0, 0, .2);
    .song{
      width: 120px; 
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
  //播发列表的
  .song-number{
    padding: 0 12px;
    width: 30px;
    height: 20px;
    background: url('../assets/Broadcast_list.png') no-repeat left center;
    position: relative;
    cursor: pointer;
    .song-number-text{
      position: absolute;
      left: 18px;
      top: 50%;
      width: 30px;
      height: 15px;
      margin-top: -7px;
      // margin-left: -8px;
      line-height: 16px;
      text-align: center;
      font-size: 12px;
      color: #333;
      background: rgba(0, 0, 0, .2);
      border-radius: 0 20px 20px 0;
    }
  }
  //播放顺序
  .songOrder,{
    margin: 0 8px;
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
