<template>
  <div class="songItem" @click="getPlayList(listId)">
    <div class="item-content">
        <slot name="img-list"></slot>
        <div class="list-text-item">
            <slot name="list-text"></slot>
        </div>
        <div class="playCounts"><span class="iconfont icon-erji"></span>{{playCount | playCounts}}</div>
        <div class="icon-btns" @click.stop="playLists">
            <span class="iconfont icon-zbofang"></span>
        </div>
    </div>
    <slot name="list-title"></slot>
  </div>
</template>
<script>
export default {
  name: 'songLists',
  data () {
    return {
        
    }
  },
  methods:{
    playLists(){
        this.myHttp.get('/apis/playlist/detail?id='+this.listId,(res)=>{
            window.localStorage.setItem('playLists',res.data.playlist.id)
            window.sessionStorage.setItem("playList",JSON.stringify(res.data.privileges));
            this.$store.dispatch('setSongList');
        })
    },
    getPlayList(uid){
        this.$router.push({
            path: `/playlist/${uid}`
        });
    }
  },
  filters: {
    playCounts: function (value) {
        if (!value) return ''
        if(value>100000){
            return Math.floor(value/10000) + '万';
        }
        return Math.floor(value);
    }
  },
  props:["listId","playCount"],
}
</script>

<style lang='less'>
@import url(../less/index.less);
.songItem{
    width: 16.666%;
    box-sizing: border-box;
    padding: 10px;
    position: relative;
    color: white;
    text-align: left;
    .item-content{
        width: 100%;
        border-radius: 2px;
        position: relative;
        overflow: hidden;
    }
    .img-list{
        width: 100%;
    }
    .list-title{
        color: rgba(255, 255, 255, 0.7);
    }
    .list-title:hover{
        color: rgba(255, 255, 255, 0.9);
    }
    .list-text-item{
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border;
        padding: 12px;
        transform: translateY(-100%);
        transition: transform .2s ease-in-out;
        background: rgba(0, 0, 0, .4);
    }
    .list-text{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .playCounts{
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        font-size: 14px;
        box-sizing: border;
        padding: 5px 10px;
        background: linear-gradient(to right,transparent,rgba(0, 0, 0, .5));
    }
    .icon-erji{
        margin-right: 2px;
        font-size: 12px;
    }
    .icon-btns{
        position: absolute;
        right: 7%;
        bottom: 10%;
        width: 16%;
        height: 16%;
        border-radius: 50%;
        background: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
        display: none;
        cursor: pointer;
        .box-shadow(0 0 0 1px rgba(255,255,255,.6));
    }
    .item-content:hover{
        .playCounts{
            display: none;
        }
        .list-text-item{
            transform: translateY(0);
        }
        .icon-btns{
            display: flex;
        }
    }
}
</style>
