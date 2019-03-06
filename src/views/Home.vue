<template>
  <div class="home">
    <img class="bg-div" :src="bgUrl" v-if="bgUrl"/>
    <img class="bg-div" src="../../public/mascot2.jpg" v-else/>
    <div class="content">
      <HomeNav :myProfile="myProfile"></HomeNav>
      <PlaySong @toSongDetails="toSongDetails" @setCurrentTime="setCurrentTime" @songChange='commentShow=false'></PlaySong>
      <SongDetails :commentShow="commentShow" v-show="SongDetailShow" :currentTime="currentTime" ref="SongDetails" @openComment="openComment"></SongDetails>
      <router-view v-show="!SongDetailShow"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HomeNav from "@/components/HomeNav.vue";
import PlaySong from "@/components/PlaySong.vue";
export default {
  name: "home",
  data() {
    return {
      currentTime:null,
      commentShow:false,//评论显示
    }
  },
  components: {
    HelloWorld,HomeNav,PlaySong,
    SongDetails:()=>import(/* webpackChunkName: "group-foo" */ "@/pages/outer/SongDetails.vue"),
  },
  methods: {
    toSongDetails(res){
      console.log(this.SongDetailShow)
      if(res) this.$refs.SongDetails.updataSong();
      this.$store.commit('setSongDetailShow',res);
    },
    setCurrentTime(currentTime){
      this.currentTime = currentTime;
    },
    openComment(){
      this.commentShow = true;
    }
  },
  props:['myProfile'],
  computed: {
    bgUrl:function () {
      return this.$store.state.bgUrl;
    },
    SongDetailShow:function () {
      return this.$store.state.SongDetailShow;
    }
  },
};
</script>
<style lang="less" scope>
@import '../less/index.less';
.home{
  background: transparent;
}
  .bg-div{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .fliter_blur(30px);
  }
  .content{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    background: transparent;
    box-sizing: border-box;
    padding-top: 50px;
    padding-bottom: 100px;
    background: rgba(0, 0, 0, .3);
  }
</style>

