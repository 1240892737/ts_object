<template>
  <div class="searchResult">
    <p class="songCount"> 搜索“<span style="color: #78C9EF;">{{ $route.params.search }}</span>”，找到{{ songCount }}歌曲</p>
    <PlaySongList :songs="songs" :searchFlag="true" :searchName="this.$route.params.search"></PlaySongList> <!-- search  是否检索文字 -->
  </div>
</template>
<script>
import PlaySongList from '../playlist/PLaySongList';
export default {
  name: 'searchResult',
  data () {
    return {
        songs:[],
        songCount: 0,
    }
  },
  methods: {
    //搜索歌曲
    SearchSong(newVal){
        this.myFun.setlocalLog(newVal);//保存至local记录
        this.myHttp.get('/apis/search?keywords='+newVal,res=>{
            let ids = res.data.result.songs.map(index=>index.id);
            this.songCount = res.data.result.songCount;
            this.myHttp.getSongDetail(ids,res1=>{
                this.songs = res1.data.songs;
            })
        })
    }
  },
  watch: {
    '$route.params.search':function(newVal,oldVal){
        this.SearchSong(newVal)
    }
  },
  created() {
    this.SearchSong(this.$route.params.search);
  },
  components:{
    PlaySongList
  }
}
</script>

<style lang='less'>
.songCount{
    line-height: 70px;
    text-align: left;
    text-indent: 20px;
}
</style>
