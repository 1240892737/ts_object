<template>
  <div :class="{'option-item':!title,'active':active,'option-title':title}" @click="getPlaySong">
    <slot name="iconfont"></slot>
    <slot name="text"></slot>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      active:false,
    }
  },
  methods: {
    getPlaySong(){
      if(this.item){
        this.$router.push({
          path: `/playlist/${this.item.id}`
        });
        this.$store.dispatch("setTabberShow",false);
      }
    },
    setActive(){
      if(this.item){
        if(this.item.id == this.$route.params.id) this.active=true;
      }
    }
  },
  created(){
    this.setActive();
  },
  props:{item:{
    default:'',
  }
  ,title:{
    default:false,
    type:Boolean,
  }},
}
</script>

<style lang='less'>
@import url(../../less/index.less);
.option-item,.option-title{
    display: flex;
    align-items: center;
    margin: 8px 20px 8px 50px;
    position: relative;
    overflow: hidden;
    padding: 6px 0;
    .iconfont{
        margin-right: 6px;
    }
    .text{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
}
.option-item{
  cursor: pointer;
}
.option-item.active{
  color: @bg_wo;
}
.option-item::after{
  content: "";
  position: absolute;
  left: -100%;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: @bg_wo;
  transition: left .4s ease-in-out;
}
.option-item:hover::after{
  left: 0;
}
.option-title{
    margin: 8px 10px 8px 28px;
    color: rgba(0, 0, 0, .8);

}
</style>
