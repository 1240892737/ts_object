<template>
  <div class="my-song">
    <slot name="songId"></slot>
    <span class="imgUrl"><img :src="item.album.blurPicUrl" alt=""><span class="play" @click="playSong"><span class="iconfont icon-zbofang"></span></span></span>
    <div class="song-title">
        <div class="song-name">{{item.name}}</div>
        <div class="song-writer" v-if="item.artists.length <= 1">{{ item.artists[0].name }}</div>
        <span class="song-writer" v-else v-for="(item1,index1) in item.artists" :key="index1">{{ item1.name }}/</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mySong',
  data () {
    return {
    }
  },
  methods: {
    playSong(){
        this.myHttp.getSongUrl(this.item.id,res=>{
            this.$store.commit("setSongUrl",res.data.data[0].url)
            this.$store.commit("setSongId",this.item.id)
        });
    }
  },
  props:["item"]
}
</script>

<style lang='less'>
.my-song{
    width: 100%;
    display: flex;
    text-align: left;
    .imgUrl{
        position: relative;
        width: 50px;
        height: 50px;
        img{
            width: 100%;
            height: 100%;
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
        opacity: .8;
        cursor: pointer;
        .iconfont{
            font-size: 20px;
            color: rgba(255, 255, 255, .8);
        }
    }
    .play:hover{
        opacity: 1;
    }
    .song-title{
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;    
    }
    .song-writer{
        width: 100%;
    }
}
.my-song:hover{
    background: rgba(255, 255, 255, .4);
}
</style>
