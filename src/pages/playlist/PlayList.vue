<template>
  <div class="playList recommend">
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
      playlist:'',
      songs:[],
    }
  },
  methods: {
    playLists(){
      this.$store.dispatch('setSongList');
    }
  },
  created() {
    let uids = [];
    // console.log(this.$route.params.id)
    this.myHttp.getPlayList(this.$route.params.id,(res)=>{
      this.playlist = res.data.playlist;
      // console.log(res.data.privileges)
      for (const i in res.data.privileges) {
          if (res.data.privileges.hasOwnProperty(i)) {
              uids.push(res.data.privileges[i].id);
          }
      }
      this.songs = res.data.playlist.tracks;
    })
  },
  components:{
    PlayName,PLaySongList
  }
}
</script>

<style lang='less'>
</style>
