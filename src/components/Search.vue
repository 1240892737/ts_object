<template>
  <div class="search-con">
    <input type="text" id="search-input" placeholder="搜索音乐，视频，歌词，电台">
    <span class="iconfont icon-search search-btn"></span>
  </div>
</template>
<script>
export default {
  name: 'search',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style lang='less'>
.search-con{
  display: inline-block;
  position: relative;
}
#search-input{
  width: 250px;
  height: 30px;
  background: rgba(0, 0, 0, .35);
  color: white;
  border-radius: 15px;
  border: none;
  outline: none;
  font-size: 14px;
  text-indent: 14px;
}
#search-input::placeholder{
  color: rgba(255,255,255, .35);
}
.search-btn{
  position: absolute;
  right: 14px;
  top: 50%;
  color: rgba(255,255,255, .35);
  transform: translateY(-50%);
}
</style>
