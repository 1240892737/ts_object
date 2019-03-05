<template>
  <div class="search-res" @click="searchTipClick($event)" :style="localLog.length != 0 ? 'width:500px;':'width:250px;'">
    <div class="hot-log">
        <p class="search-title"><span class="iconfont icon-search_icon"></span> 热门搜索</p>
        <Log-item v-for="(item,index) in hotSearch" :key="index" :icon='false' :first='item.first'></Log-item>
    </div>

    <div class="local-log" v-if="localLog.length != 0">
        <p class="search-title"><span class="iconfont icon-search_icon"></span> 本地记录</p>
        <Log-item v-for="(item,index) in localLog" :key="index" :icon="true" :first='item' @setlocalLog="setlocalLog"></Log-item>
    </div>
  </div>
</template>
<script>
import LogItem from './LogItem.vue'
export default {
  name: 'searchResult',
  data () {
    return {
        hotSearch:[],
        localLog:[]
    }
  },
  methods: {
    setlocalLog(){
        if(window.localStorage.getItem('localLog') != null){
            this.localLog = this.myFun.getLocal('localLog');
        }
    },
    searchTipClick(e){
        let target = e.target;
        if(target.className == 'hot-log'||target.className == 'local-log'||target.className == 'iconfont icon-guanbi'||target.className == 'search-title'){
            this.$emit('onfocus');
        }
        if(target.nodeName.toUpperCase()=="P" && target.className == "myFirst"){
            this.$router.push({name:'searchResult',params:{'search': target.dataset.name}});
            setTimeout(()=>{this.setlocalLog()},200);//更新历史记录
        }
    }
  },
  components:{
    LogItem
  },
  created() {
    this.myHttp.getHotSearch((res)=>{
        if(res.data.code == 200){
            this.hotSearch = res.data.result.hots;
        }
    });
    // window.localStorage.setItem('localLog',JSON.stringify(['eee']));
    this.setlocalLog();
  },
}
</script>

<style lang='less'>
.search-res{
    position: absolute;
    left: 0;
    top: 40px;
    height: 350px;
    background: white;
    padding: 8px 0;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, .4);
    transition: width .4s ease-in-out;
    display: flex;
    text-align: left;
    z-index: 2;
    .search-title{
        color: #666;
        margin-bottom: 6px;
        font-size: 14px;
        .iconfont{color: #666;font-size: 14px;}
    }
    .hot-log,.local-log{
        width: 250px;
    }
    .search-title{text-indent: 16px;}
    .local-log{border-left: 1px solid rgba(0, 0, 0, .2);}
}
.search-res::before{
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 40px;
    top: -20px;
    border: 10px solid transparent;
    border-bottom-color: white;
}
</style>
