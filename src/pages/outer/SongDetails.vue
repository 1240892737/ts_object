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
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'songDetails',
  data () {
    return {
        songDetails:[{}],
        playsongDetail: false,
    }
  },
  
  methods: {},
  created() {
    // console.log(this.$store.state.songId);
    this.myHttp.getSongDetail(this.$store.state.songId,res=>{
        console.log(res.data)
        if(res.data.songs.length==1){
            this.songDetails = res.data.songs[0];
        }
    })
  },
  computed: {
    songPlay(){
        return this.$store.state.songPlay;
    }
 },
  watch: {
    '$store.state.songId':function(newVal,oldVal){
    //   console.log(this.$store.state.songId)
      this.myHttp.getSongDetail(this.$store.state.songId,res=>{
        console.log(res.data)
        if(res.data.songs.length==1){
            this.songDetails = res.data.songs[0];
        }
      });
    }
  },
}
</script>

<style lang='less'>
.songDetails{
}
.songDetails-content{
    display: flex;
}
//唱片部分
.songDeta-saucer{
    width: 307px;
    height: 307px;
    padding: 60px 0;
    position: relative;
    .songDisc{
        position: absolute;
        width: 307px;   
        height: 307px;
        background: url("../../assets/songDisc1.png") no-repeat center center;
        background-size: 100%;
        border-radius: 50%;
        box-shadow: 4px 4px 10px #666,0 0 0 8px rgba(255, 255, 255, .4);
        animation: rotation 36s linear infinite;
        animation-play-state:paused;
    }
    .songDisc-songImg{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 208px;
        height: 208px;
        margin: -104px 0 0 -104px;
        border-radius: 104px;
    }
    .pin-buckle{
        position: absolute;
        left: 50%;
        top: -10px;
        width: 153px;
        height: 56px;
        transform-origin: 0 0;
        filter: drop-shadow(1px 1px 2px rgba(0,0,0,.15)) drop-shadow(1px 1px 15px rgba(0,0,0,.15)) drop-shadow(1px 1px 5px rgba(0,0,0,.15));-webkit-filter: drop-shadow(1px 1px 2px rgba(0,0,0,.15)) drop-shadow(1px 1px 15px rgba(0,0,0,.15)) drop-shadow(1px 1px 5px rgba(0,0,0,.15));
        animation:  pinBuckle-out .6s ease-in-out;
        animation-fill-mode: forwards;
    }
}
//播发时候的样式
.songDeta-songPLay{
    .songDisc{
        animation-play-state:running;
    }
    .pin-buckle{
        animation: pinBuckle-levea .6s ease-in-out;
        animation-fill-mode: forwards;
    }
}
//歌曲介绍
.songText{
    flex: 1;
        padding: 60px 0;
}
@keyframes rotation{
    from{transform: rotateZ(0deg);}
    to{transform: rotateZ(360deg);}
}
@keyframes pinBuckle-levea{
    from{transform: rotateZ(0);top: -10px;}
    to{transform: rotateZ(38deg);top: -15px;}
}
@keyframes pinBuckle-out{
    to{transform: rotateZ(0);top: -10px;}
    from{transform: rotateZ(38deg);top: -15px;}
}
</style>
