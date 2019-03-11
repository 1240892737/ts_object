<template>
  <div class="search-res">
    <div class="empty"  @click="searchTipClick($event)" v-if="searchTxt==''" :style="localLog.length != 0 ? 'width:500px;':'width:250px;'">
        <div class="hot-log">
            <p class="search-title"><span class="iconfont icon-search_icon"></span> 热门搜索</p>
            <Log-item v-for="(item,index) in hotSearch" :key="index" :icon='false' :first='item.first'></Log-item>
        </div>

        <div class="local-log" v-if="localLog.length != 0">
            <p class="search-title"><span class="iconfont icon-search_icon"></span> 本地记录</p>
            <Log-item v-for="(item,index) in localLog" :key="index" :icon="true" :first='item' @setlocalLog="setlocalLog"></Log-item>
        </div>
    </div>
    <div class="search-suggest" v-else>
        <div class="suggest-item" v-for="(item,index) in suggestResult.order" :key="index">
            <p class="search-title"><span :class="static2[item]"></span> {{ static1[item] }}</p>
            <Log-item-high v-for="(item1,index1) in suggestResult[item]" :key="index1" :type="item" :first='item1' :searchTxt="searchTxt"></Log-item-high>
        </div>
    </div>
  </div>
</template>
<script>
import LogItem from './LogItem.vue'
import LogItemHigh from './LogItemHigh.vue'
export default {
  name: 'searchResult',
  data () {
    return {
        hotSearch:[],
        localLog:[],
        suggestResult:[],
        static1:{'songs':'单曲','artists':"歌手",'albums':"专辑",'mvs':"视频",'playlists':"歌单"},
        static2:{'songs':'iconfont icon-yinle','artists':"iconfont icon-my_icon",'albums':"iconfont icon-zhuanji",'mvs':"iconfont icon-shipin",'playlists':"iconfont icon-swticonyinle2"}
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
    },
    //获取搜索建议
    getSuggest(){
        // console.log(this.searchTxt)
        if(this.searchTxt == '') return;
        this.myHttp.get('/apis/search/suggest?keywords= '+this.searchTxt,(res)=>{
                // console.log(res.data);
            if(res.data.code == 200){
                this.suggestResult = res.data.result;
                // console.log(this.suggestResult)
            }
        })
    }
  },
  components:{
    LogItem,LogItemHigh
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
  props:['searchTxt'],
}
</script>

<style lang='less' scope>
.search-res{
    position: absolute;
    left: 0;
    top: 40px;
    background: white;
    padding: 8px 0;
    border-radius: 4px;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, .4);
    text-align: left;
    z-index: 2;
    .empty{
        height: 350px;
        display: flex;
        transition: width .4s ease-in-out;
    }
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
    .search-suggest{
        width: 250px;
        height: auto;
        .search-title{
            text-indent: 8px;
            padding: 4px 0;
            background: rgba(0, 0, 0, .05);
        }
    }
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
