<template>
    <div class="newSongs">
        <MySongs v-for="(item, index) in newSongs" :key="index" :item="item.song">
            <span class="songId" slot="songId">{{ index | addling }}</span>
        </MySongs>
    </div>
</template>
<script>
import MySongs from "./MySongs.vue";
export default {
   name:"newSongs",
   data() {
      return {
          newSongs:[]
      }
   },
   created() {
    this.myHttp.get('/apis/personalized/newsong?limit=10',(res)=>{
      console.log(res.data.result)
      this.newSongs = res.data.result;
        // this.songWriter = res.data.songs[0].ar.map(v=>v.name).join('/') ;
      // this.personalizeds = res.data.result;
    })
   },
    filters:{
        addling(val){
            if(val<10){
                return '0'+val;
            }
            return val;
        }
    },
    components:{
        MySongs
    },
}
</script>
<style lang='less'>
.newSongs{
    display: flex;
    flex-wrap: wrap;
    color: rgba(255, 255, 255, .8);
    .my-song{
        width: 50%;
    }
    
.my-song:nth-child(4n+1){
    background: rgba(255, 255, 255, .1);
}
.my-song:nth-child(4n){
    background: rgba(255, 255, 255, .1);
}
}
</style>