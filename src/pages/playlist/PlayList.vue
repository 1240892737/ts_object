<template>
  <div class="playList recommend"  @click="myLikeSong">
    <PlayName :playlist="playlist" @playlis_play="playLists"></PlayName>
    <PLaySongList :songs="songs"></PLaySongList>
  </div>
</template>
<script>
import PlayName from '@/components/PlayName.vue';
import PLaySongList from './PLaySongList.vue';
export default {
  name: 'playList',
  data () {
    return {
      playlist:[],
      songs:[],
    }
  },
  methods: {
    playLists(){
      this.$store.dispatch('setSongList');
    },
    myLikeSong(){
      
    },
    getSongList(){
      let uids = [];
      // console.log(this.$route.params.id)
      this.myHttp.getPlayList(this.$route.params.id,(res)=>{
        this.playlist = res.data.playlist;
        // console.log(res.data)
        for (const i in res.data.privileges) {
            if (res.data.privileges.hasOwnProperty(i)) {
                uids.push(res.data.privileges[i].id);
            }
        }
        this.songs = res.data.playlist.tracks;
      })
    }
  },
  created() {
    this.getSongList();
  },
  watch:{
    '$route.params.id': function(to, from) { //监听路由是否变化
      if(this.$route.params.id){//判断id是否有值
        //调数据
        this.getSongList();
      }
    }
  },
  components:{
    PlayName,PLaySongList
  }
}
</script>

<style lang='less'>
</style>
