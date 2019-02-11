<template>
    <div class="playName">
        <img :src="playlist.coverImgUrl" alt="" class="playlist-img">
        <div class="playlist-more">
            <div class="playlist-title">
                <i class="playlist-icons">歌单</i>
                <strong class="playlist-name">{{ playlist.name }}</strong>
                <div class="playlist-amount">
                    <div class="playCount">
                        <p>歌曲数</p>
                        <p>{{ playlist.trackCount }}</p>
                    </div>
                    <div class="trackCount">
                        <p>播放数</p>
                        <p>{{ playlist.playCount | playCounts }}</p>
                    </div>
                </div>
            </div>
            <div class="creator">
                <img :src="playlist.creator.avatarUrl" alt="" class="creator-img">
                <strong class="creator-name">{{playlist.creator.nickname}}</strong>
                <span class="creator-timer">{{ playlist.trackNumberUpdateTime | days }}创建</span>
            </div>
            <div class="playlist-btns">
                <div class="playlist-play" @click="playlis_play"><span class="iconfont icon-zbofang"></span>播放全部<div class="icons-collect"><span class="iconfont icon-jiahao"></span></div></div>
                <div class="playlist-collect"><span class="iconfont icon-shoucang"></span>收藏({{ playlist.subscribedCount }})</div>
            </div>
            <div class="playlist-label">
                标签：<span class="playlist-tags" v-for="(item,index) in playlist.tags" :key="index"><i>{{ item }}</i>/</span>
            </div>
            <div class="playlist-intro playlist-intro-more" title="点击显示更多" @click="playlistIntroDown($event)">
                简介：{{ playlist.description }} <span @click="playlistIntroUp($event)" style="color:#0C73C2;cursor:pointer;">收起</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: '',
  props:["playlist"],
  data () {
    return {
    }
  },
  methods: {
    playlistIntroDown(e){
        let thElement = e.target;
        if(thElement.classList.contains('playlist-intro-more')){
            thElement.classList.remove('playlist-intro-more');
        }
    },playlistIntroUp(e){
        let thElement = e.target.parentNode;
        console.log(thElement)
        thElement.classList.add('playlist-intro-more')
    },
    playlis_play(){
        console.log(1)
        this.$emit('playlis_play');
    },
  },
  filters: {
      playCounts: function (value) {
        if (!value) return ''
        if(value>100000){
            return Math.floor(value/10000) + '万';
        }
        return Math.floor(value);
    },
    days(value){
        let a = new Date(value)
        let s = `${a.getFullYear()}/${a.getMonth()}/${a.getDay()}`
        // console.log(s)
        return s;
    }
  }
}
</script>

<style lang='less' scope>
@import "../less/index.less";
.playName{
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 10px 0;
    text-align: left;
    color: rgba(255, 255, 255, .85);
    .playlist-title{
        display: flex;
    }
    .playlist-icons{
        display: inline-block;
        padding: 0 5px;
        margin-right: 10px;
        font-style: normal;
        font-size: 14px;
        height: 22px;
        line-height: 22px;
        border-radius: 1px;
        box-shadow: 0 0 0 1px @bg_wo;
        color: @bg_wo;
    }
    .playlist-more{
        width: 75%;
        flex: 1;
        margin-left: 25px;
    }
    .playlist-name{
        font-size: 22px;
        font-weight: 500;
    }
    .playlist-amount{
        display: flex;
        justify-content: space-around;
        width: 160px;
        padding: 0 20px;
        color: #666;
        text-align: right;
        >div{
            padding: 0 10px;
        }
    }
    .playCount{
        border-right: 1px solid #999;
    }
    //按钮
    .playlist-btns{
        display: flex;
        align-items: center;
    }
    .playlist-play,.playlist-collect{
        display: flex;
        align-items: center;
        color: white;
        background: @bg_wo;
        border-radius: 6px;
        padding: 4px 6px;
        margin-right: 10px;
        cursor: pointer;
        font-size: 15px;
        .icon-zbofang{
            font-size: 10px;
            border-radius: 50%;
            box-shadow: 0 0 0 1px white;
            padding: 1px;
            margin: 0 5px 0 3px;
        }
        .icons-collect{
            margin-left: 5px;
            padding-left: 5px;
            border-left: 1px solid rgba(255, 255, 255, .4);
            height: 100%;
        }
    }
    .playlist-play:hover{
        background: @bg_wo,rgba(0, 0, 0, .4);
    }
    .playlist-collect{
        background: white;
        color: #333;
        .icon-shoucang{
            margin: 0 3px;
        }
    }
    //创建
    .creator{
        display: flex;
        align-items: center;
        margin: 10px 0;
        .creator-name{
            font-weight: 500;
            color: rgba(255, 255, 255, .8);;
            margin-left: 3px;
        }
        .creator-timer{
            color: rgba(255, 255, 255, .6);;
            margin-left: 20px;
            font-size: 14px;
        }
    }
    //标签
    .playlist-label{
        margin: 8px 0;
    }
    .playlist-tags{
        i{
            margin: 0 2px;
            color: #0C73C2;
            font-style: normal;
            cursor: pointer;
        }
    }
    .playlist-intro{
    }
    .playlist-intro-more{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.playlist-img{
    display: inline-block;
    width: 25%;
    max-width: 250px;
    max-height: 250px;
    border-radius: 1px;
}
.creator-img{
    width: 100%;
    max-width: 24px;
    border-radius: 50%;
}
</style>
