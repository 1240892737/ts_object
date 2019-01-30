<template>
  <div class="TitleSong">
    <slot name="name"></slot>
    <div class="title-more" @click="more_btn">更多<span class="iconfont icon-youbian"></span></div>
  </div>
</template>
<script>
export default {
  name: 'titleSong',
  data () {
    return {
    }
  },
  methods: {
    more_btn(){
        console.log(this.titleName)
    }
  },
  props:['titleName']
}
</script>

<style lang='less'>
    .TitleSong{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 10px;
        border-bottom: 1px solid rgba(255,255,255, .5);
        line-height: 36px;
        .title-name{
            font-size: 20px;
            color: #333;
        }
        .title-more{
            color: #666;
            font-size: 14px;
        }
    }
</style>
