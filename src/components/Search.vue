<template>
  <div class="search-con">
    <input type="text" id="search-input" @blur="SwitchTip(false)" @keypress="inputKey" @keypress.enter="toresult" @focus="SwitchTip(true)" ref="searchInput" placeholder="搜索音乐，视频，歌词，电台" v-model="searchTxt" autocomplete="off">
    <span class="iconfont icon-search_icon search-btn" @click="toresult"></span>
    <Search-tip v-show="tipShow" @onfocus="onfocus"></Search-tip>
  </div>
</template>
<script>
import SearchTip from '../pages/Search/SearchTip';
export default {
  name: 'search',
  data () {
    return {
      searchTxt:'',
      tipShow:false,
      timer1: null,
      timer2: null,//防抖
    }
  },
  methods: {
    SwitchTip(flag){
      clearTimeout(this.timer1);
      this.timer1 = setTimeout(()=>{
        this.tipShow = flag;
      },150);
    },
    onfocus(){
      this.$refs.searchInput.focus();
    },
    //搜索建议
    inputKey(){

    },
    // 打开搜索
    toresult(){
      let searchValue = this.$refs.searchInput.value;
      if(searchValue != '') this.$router.push({name:'searchResult',params:{'search': searchValue}});
    }
  },
  components:{
    SearchTip,
  },
  mounted() {
    var searchInput = this.$refs.searchInput;

  },
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
