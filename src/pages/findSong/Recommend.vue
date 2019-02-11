<template>
  <div class="recommend">
    <TitleSong>
      <div class="title-name" slot="name">推荐歌单</div>
    </TitleSong>
    <div class="songList">
      <SongList v-for="(item,index) in personalizeds" :listId="item.id" :key="index" :playCount="item.playCount">
        <img :src="item.picUrl" alt="" class="img-list" slot="img-list">
        <p class="list-title" slot="list-title">{{ item.name }}</p>
        <p class="list-text" slot="list-text">{{ item.copywriter }}</p>
      </SongList>
    </div>
    recommend
  </div>
</template>
<script>
import SongList from '@/components/SongList.vue';
import TitleSong from '@/components/TitleSong.vue';
export default {
  name: '',
  data () {
    return {
      personalizeds:'',
    }
  },
  methods: {
    
  },
  created() {
    this.myHttp.get('/apis/personalized?limit=12',(res)=>{
      // console.log(res.data)
      this.personalizeds = res.data.result;
    })
  },
  components:{
    SongList,TitleSong,
  }
}
</script>

<style lang='less'>
.recommend{
  .songList{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>