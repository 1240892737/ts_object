<template>
    <div class="newSongs">
        <div class="newSongList" v-for="(item, index) in newSongs" :key="index">
            <span class="songId">{{ index | addling }}</span>
            <span class="imgUrl"><img v-lazy="item.song.album.blurPicUrl" alt=""><span class="play"><span class="iconfont icon-zbofang"></span></span></span>
            <div class="songTitle">
                <div class="song-name">{{ item.song.album.name }}</div>
                <div class="song-writer">{{ item.song.alias.join('/') }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   name:"newSongs",
   data() {
      return {
          newSongs:[]
      }
   },
   created() {
    this.myHttp.get('/apis/personalized/newsong?limit=10',(res)=>{
    //   console.log(res.data.result)
      this.newSongs = res.data.result;
        // this.songWriter = res.data.songs[0].ar.map(v=>v.name).join('/') ;
      // this.personalizeds = res.data.result;
    })
   },
    filters:{
        addling(val){
            if(val<10){
                return '0'+val;
            }
            return val;
        }
    }
}
</script>
<style lang='less'>
.newSongs{
    display: flex;
    flex-wrap: wrap;
    color: #333;
    .newSongList{
        width: 50%;
        display: flex;
        .imgUrl{
            position: relative;
            width: 50px;
            height: 50px;
            img{
                width: 100%;
            }
        }
        .play{
            position: absolute;
            width: 55%;
            height: 55%;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            box-shadow: 0 0 0 1px white;
            cursor: pointer;
            .iconfont{
                font-size: 20px;
                color: white;
            }
        }
    }
    .newSongList:nth-child(4n+1){
        background: rgba(0, 0, 0, .2);
    }
    .newSongList:nth-child(4n){
        background: rgba(0, 0, 0, .2);
    }
    .newSongList:hover{
        background: rgba(0, 0, 0, .4);
    }
}
</style>