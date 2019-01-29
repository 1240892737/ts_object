<template>
    <span :class="{'iconfont':true,'icon-btn':true,iconClass}"></span>
</template>
<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  props:{'iconClass':{
      type:string,
      default:'icon-browse'
  }},
  methods: {}
}
</script>

<style lang='less'>
.icon-btn{
    width: 24px;
    height: 24px;
}
</style>
