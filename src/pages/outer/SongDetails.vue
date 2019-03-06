<template>
  <div class="songDetails recommend">
    <div class="songDetails-content">
        <div :class="{'songDeta-saucer':true,'songDeta-songPLay':songPlay}">
            <div class="songDisc">
                <img :src="songDetails.al.picUrl" alt="" class="songDisc-songImg">
            </div>
            <img src="../../assets/songDisc4.png" alt="" class="pin-buckle">
        </div>
        <div class="songText">
            <h5 class="song-name">{{ songDetails.name }}<span class="text-badge">普通音质</span></h5>
            <div class="songtext-box">
                <ul class="songTextss" ref="songTextss">
                    <li class="text-item" v-for="(item,index) in songText" :key="index" :class="{'active':activeSongText==index}">{{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
    <p class="lookComment" v-if="!commentShow" @click="openComment">查看评论</p>
    <Comment v-show="commentShow" type='song' ref="comment" :obj="{'simisongShow':true,'type':0}"></Comment>
    <div class="close" @click="closeSongDetail(false)">
      <span class="iconfont icon-amplification_icon"></span>
    </div>
  </div>
</template>
<script>
import Comment from "../../components/Comment.vue";
export default {
  name: "songDetails",
  data() {
    return {
      songDetails: [{}],
      songTimer:null,
      songText:null,
      activeSongText:'',
    };
  },

  methods: {
    openComment(){
      this.$emit('openComment')
    },
    //处理歌词问题
    getLyric(lyric) {
      lyric = lyric.replace(/\n/g, "<br/>");
      let lyricaa = lyric.split("<br/>");
    
      let timer=[], songText = [];
      lyricaa.map(res => {
        //   console.log(res)
        let v = res.split("]");
        if(v[1]==''){
            if(v[0].indexOf(":")){
                songText.push('~~~');
                timer.push(this.timeTranstion(v[0].replace("[",'')));
            }else{
                songText.push(v[0].replace("[",''));
                timer.push(0);
            }
        }else{
          if(v.length != 2){
            v.map((item,index)=>{
              if(index != v.length - 1){
                timer.push(this.timeTranstion(v[index].replace("[",'')));
                songText.push(v[v.length - 1]);
              }
            })
          }else{
            songText.push(v[1])
            timer.push(this.timeTranstion(v[0].replace("[",'')));
          }
          
        }
      });
      //切出重复的歌词
      let obj = {},objArr = [];
      for(let i=0;i<timer.length;i++){
        obj[1] = songText[i];
        obj[2] = timer[i];
        objArr.push(obj);
        obj = {};
      }
      objArr.sort((a,b)=>{
        return a[2]-b[2];
      })
      this.songTimer = objArr.map(res=>res[2]);
      this.songText = objArr.map(res=>res[1]);
      // console.log(this.songTimer,this.songText);
    },
    //00:00转换成秒速
    timeTranstion(timer){
        let minute = parseInt(timer.split(':')[0]);
        let second = parseFloat(timer.split(':')[1]);
        if(minute == 0) return second;
        else {
            let num = parseFloat(minute * 60) + second;
            return num;
        }
    },
    //更新歌词
    updataSong() {
      this.myHttp.getSongDetail(this.$store.state.songId, res => {
        // console.log(res.data.songs)
        if (res.data.songs.length == 1) {
          this.songDetails = res.data.songs[0];
        }
      });
      this.myHttp.get("/apis/lyric?id=" + this.$store.state.songId, res => {
        // console.log(res.data)
        // console.log(res.data.lrc.lyric)
        // console.log('lrc' in res.data)
        if(!('lrc' in res.data)){
            this.songText = ["纯音乐,请欣赏"];
            this.songTimer = ['0'];
        }else this.getLyric(res.data.lrc.lyric);
        
        this.currentTimeWatch(this.currentTime,this.currentTime);
        setTimeout(res=>{
            this.textCenter();
        },200);
      });
      this.$refs.comment.firstFunction();
    },
    //居中歌词
    textCenter(){
        let songTextss = this.$refs.songTextss;
        let active = songTextss.getElementsByClassName('active');
        if(active){
          let activeTop = active[0].offsetTop - 287/2 + 35;
          // console.log(activeTop)
          songTextss.style.top = -activeTop + 'px';
        }
    },
    //设置歌词居中
    currentTimeWatch(newVal,oldVal){
        // console.log(newVal)
        for(let i=0;i<this.songTimer.length;i++){
            // if(newVal>this.songTimer[i]&&i>this.activeSongText){
            if(newVal<this.songTimer[i+1]+0.2){
                if(this.activeSongText != i && this.activeSongText!='') this.textCenter();
                this.activeSongText = i;
                if(Math.abs(newVal-oldVal)>1) {
                    setTimeout(res=>{
                        this.textCenter();
                    },0)
                }
                // console.log(i)
                return;
            }
        }
    },
    closeSongDetail(flag){
      this.$store.commit('setSongDetailShow',false);
    }
  },
  created() {
    this.updataSong();
  },
  computed: {
    songPlay() {
      return this.$store.state.songPlay;
    }
  },
  watch: {
    "$store.state.songId": function(newVal, oldVal) {
      this.updataSong();
    },
    "currentTime": function(newVal,oldVal){
        // console.log(newVal)
        this.currentTimeWatch(newVal,oldVal)
    }
  },
  props: ["currentTime",'commentShow'],
  components:{
    Comment
  },
};
</script>

<style lang='less'>
@import url(../../less/index.less);
.songDetails {
    color: rgba(255, 255, 255, .7);
  .close{
    position: fixed;
    top: 100px;
    right: 55px;
    color: #444;
    background: rgba(255, 255, 255, .8);
    padding: 4px 10px;
    border-radius: 2px;
    font-size: 20px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, .3);
    cursor: pointer;
  }
  .close:hover{
    background: rgba(255, 255, 255, .95);
  }
}
.songDetails-content {
  display: flex;
}
//唱片部分
.songDeta-saucer {
  width: 307px;
  height: 307px;
  padding: 60px 0;
  position: relative;
  .songDisc {
    position: absolute;
    width: 307px;
    height: 307px;
    background: url("../../assets/songDisc1.png") no-repeat center center;
    background-size: 100%;
    border-radius: 50%;
    box-shadow: 4px 4px 10px #666, 0 0 0 8px rgba(255, 255, 255, 0.4);
    animation: rotation 36s linear infinite;
    animation-play-state: paused;
  }
  .songDisc-songImg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 208px;
    height: 208px;
    margin: -104px 0 0 -104px;
    border-radius: 104px;
  }
  .pin-buckle {
    position: absolute;
    left: 50%;
    top: -10px;
    width: 153px;
    height: 56px;
    transform-origin: 0 0;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.15))
      drop-shadow(1px 1px 15px rgba(0, 0, 0, 0.15))
      drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.15));
    -webkit-filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.15))
      drop-shadow(1px 1px 15px rgba(0, 0, 0, 0.15))
      drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.15));
    animation: pinBuckle-out 0.6s ease-in-out;
    animation-fill-mode: forwards;
  }
}
//播发时候的样式
.songDeta-songPLay {
  .songDisc {
    animation-play-state: running;
  }
  .pin-buckle {
    animation: pinBuckle-levea .6s ease-in-out;
    animation-fill-mode: forwards;
  }
}
//歌曲介绍
.songText {
  flex: 1;
  padding: 60px 0;
  margin-left: 20px;
  .song-name{
      margin: 10px 0;
  }
  .songtext-box{
    height: 287px;
    position: relative;
    -webkit-mask-image: linear-gradient(180deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.6) 15%,#fff 25%,#fff 75%,hsla(0,0%,100%,.6) 85%,hsla(0,0%,100%,0));
    overflow: hidden;
  }
  .songTextss{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: top .4s ease-in-out;
    .text-item{
        list-style: none;
        margin: 20px 0;
    }
    .active{
        color: @bg_wo;
    }
  }
}
@keyframes rotation {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
@keyframes pinBuckle-levea {
  from {
    transform: rotateZ(0);
    top: -10px;
  }
  to {
    transform: rotateZ(38deg);
    top: -15px;
  }
}
@keyframes pinBuckle-out {
  to {
    transform: rotateZ(0);
    top: -10px;
  }
  from {
    transform: rotateZ(38deg);
    top: -15px;
  }
}
</style>
