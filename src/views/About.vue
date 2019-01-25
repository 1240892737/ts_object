<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p> <img :src="aa" alt=""></p>
    <p><audio :src="bb"></audio></p>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      aa:'',
      bb:''
    }
  },
  methods: {
    
  },
  mounted() {
    var th = this;
    this.myHttp.get('/apis/playlist/detail?id=24381616',(res,req)=>{
      // console.log(res.data.playlist.coverImgUrl)
      th.aa = res.data.playlist.coverImgUrl;
    })
    this.myHttp.get('/apis/song/url?id=24381618',(res,req)=>{
      console.log(res.data.data[0])
      // th.bb = res.data.playlist.coverImgUrl;
    })
  },
}
</script>

<style lang='less'>

</style>
