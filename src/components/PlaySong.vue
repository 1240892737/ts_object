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
      <div class="pause song-btn">
        <span class="iconfont icon-zbofang"></span>
        <span class="iconfont icon-zzanting" v-show="false"></span>
      </div>
      <div class="nextSong song-btn"><span class="iconfont icon-zxiayishou"></span></div>
    </div>
    <div class="songPlan">
      <div class="nowTime">00:00</div>
      <div class="progress">
        <div class="nowProgress"><span class="nowBtn"></span></div>
      </div>
      <div class="sumTime">04:00</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'playSong',
  data () {
    return {
    }
  },
  methods: {},
  created() {
    this.myHttp.getSongUrl('33894312',(res)=>{
      console.log(res.data)
      this.myHttp.getSongDetail('33894312',(res1)=>{
        console.log(res1)
      })
    })
  },
}
</script>

<style lang='less'>
@import url(../less/index.less);
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
    float: left;
    display: flex;
    justify-content: center;
    border-right: 1px solid rgba(0, 0, 0, .2);
    .song{
      line-height: 25px;
      margin: 5px 10px;
      text-align: left;
      .songName{
        color: #333333;
        max-width: 100px; 
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .songWriter{
        color: #999999;
        max-width: 100px; 
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
    .progress{
      flex: 1;
      margin: 0 6px;
      height: 6px;
      border-radius: 3px;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
      .nowProgress{
        width: 50%;
        height: 6px;
        border-radius: 3px;
        background: linear-gradient(90deg,#C62F2F,#DA6363);
        .box-shadow(0 0 3px 0 #E2E489);
        transition: width .1s linear;
        position: relative;
      }
      .nowBtn{
        display: inline-block;
        position: absolute;
        right: -5px;
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
    }
  }
}
</style>
