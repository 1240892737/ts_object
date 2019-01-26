<template>
  <div class="home">
    <button @click="setIsShow">asda</button>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    setIsShow(){
      this.$emit('setShow',true);
    }
  },
  props:['tabberShow']
};
</script>
<style lang="less">

</style>

