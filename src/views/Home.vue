<template>
  <div class="home">
    <img class="bg-div" :src="bgUrl" v-if="bgUrl"/>
    <img class="bg-div" src="../../public/mascot2.jpg" v-else/>
    <div class="content">
      <HomeNav :myProfile="myProfile"></HomeNav>
      <PlaySong></PlaySong>
      <router-view/>
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
    }
  },
  components: {
    HelloWorld,HomeNav,PlaySong
  },
  methods: {
  },
  props:['myProfile'],
  computed: {
    bgUrl:function () {
      return this.$store.state.bgUrl;
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
    .fliter_blur(40px);
  }
  .content{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 2;
    background: transparent;
    box-sizing: border-box;
    padding-top: 70px;
    margin-bottom: 100px;
  }
</style>

