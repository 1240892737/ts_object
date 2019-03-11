<template>
  <div class="log-item">
    <p class="myFirst" :data-name='first.name' @click="toMyapp">
        <span v-html="myFun.searchName(first.name,searchTxt)"></span>
        <span v-if="type!='artists' && (!first.alias||first.alias.length)" class="introduce"><span v-for="(item,index) in first.alias" :key="index" v-html="' ('+myFun.searchName(item,searchTxt)+') '"></span></span>
        <span v-if="type!='artists' && (!first.artists||first.artists.length)"> - <span v-for="(item,index) in first.artists" :key="index" v-html="myFun.searchName(item.name,searchTxt)+' '"></span></span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'logItemHigh',
  data () {
    return {

    }
  },
  methods: {
    toMyapp(){
        let store = this.$store;
        if(this.type == 'songs'){ //歌曲
            this.$store.commit('setSongId',this.first.id);
            console.log(this.first)
            // window.sessionStorage.setItem("playList",JSON.stringify(this.myFun.songsCopy(this.first)));
            console.log(this.myFun.songsCopy(this.first))
            this.myFun.setPlayList('sess',this.myFun.songsCopy(this.first))
            this.$layer.msg('添加歌单了~');
            return;
        }
        if(this.type == 'artists'){ //歌手
            // this.$store.commit('setSongId',this.first.id);
            this.$layer.msg('功能还不支持！！！')
            return;
        }
        if(this.type == 'albums'){ //专辑
            // this.$store.commit('setSongId',this.first.id);
            this.$layer.msg('功能还不支持！！！')
            return;
        }
        if(this.type == 'mvs'){ //视频
            // this.$store.commit('setSongId',this.first.id);
            this.$layer.msg('功能还不支持！！！')
            return;
        }
        if(this.type == 'playlists'){ //歌单
            this.$router.push({name:'playList',params:{'id': this.first.id}});
            return;
        }
        // window.cli
    },
  },
  mounted() {
    //   console.log(this.type)
  },
  props:['type','first','searchTxt']
}
</script>

<style lang='less' scope>
.log-item{
    font-size: 14px;
}
.introduce{
    color: #999;
}
.myFirst{
    text-indent: 10px;
}
</style>
