<template>
  <div class="playSong">
    <div class="songImg">
      <img src="" class="songImgUrl">
      <div class="songShade">
        
      </div>
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
  methods: {}
}
</script>

<style lang='less'>
// @import url(../less/index.less);
.playSong{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: white;
    z-index: 3;
}
</style>
