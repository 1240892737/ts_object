<template>
  <div class="comments">
    <div class="comment">
        <div class="header-comment">听友评论<span class="comment-total">(已有{{ comments.total }}条评论)</span></div>
        <div class="text">精彩评论</div>
        <ul class="wonderful-comment" v-if="comments.hotComments">
            <li class="comment-item" v-for="(item,index) in comments.hotComments" :key="index" v-if="index<10">
                <img :src="item.user.avatarUrl" alt="" class="comment-img">
                <div class="comment-text">
                    <p class="comment-txt"><i class="comment-name" :data-id="item.commentId">{{ item.user.nickname }}:</i>{{ item.content }}</p>
                    <div class="comment-reply" v-for="(item1,index1) in item.beReplied" :key="index1">
                        <i class="comment-name" :data-id="item1.user.userId">@{{ item1.user.nickname }}:</i>{{ item1.content }}
                    </div>
                    <div class="comment-detail">
                        <p class="comment-time">{{ myFun.timeDays(item.time) }}</p>
                        <div class="comment-praise"><span :class="{'iconfont icon-praise_icon':true,'active':item.liked}"></span>({{ item.likedCount }})</div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="text">最新评论</div>
        <ul class="wonderful-comment" v-if="comments.hotComments">
            <li class="comment-item" v-for="(item,index) in comments.comments" :key="index" v-if="index<10">
                <img :src="item.user.avatarUrl" alt="" class="comment-img">
                <div class="comment-text">
                    <p class="comment-txt"><i class="comment-name">{{ item.user.nickname }}:</i>{{ item.content }}</p>
                    <div class="comment-detail">
                        <p class="comment-time">{{ myFun.timeDays(item.time) }}</p>
                        <div class="comment-praise"><span :class="{'iconfont icon-praise_icon':true,'active':item.liked}"></span>({{ item.likedCount }})</div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="simi-song">
        <div class="simi-song-item">
            <div class="header-comment">包含这首歌的歌单</div>
        </div>
        <div class="simi-song-item">
            <div class="header-comment">相似歌曲</div>
            <MySongs v-for="(item,index) in simiSong" :key="index" :item='item'></MySongs>
        </div>
        <div class="simi-song-item">
            <div class="header-comment">喜欢这首歌的人</div>
            <div class="like-users" v-for="(item,index) in simiUser" :key="index">
                <div class="like-names">
                    <img :src="item.avatarUrl" alt="" class="like-imgs">
                    <span class="like-name">{{ item.nickname }}</span>
                </div>
                <p>{{ item.recommendReason }}</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import MySongs from './MySongs.vue';
export default {
  name: 'comment',
  data () {
    return {
        comments:[],
        simiSong:[],
        simiUser:[],
    }
  },
  methods: {
    firstFunction(){
        if(this.type == "song"){
            this.myHttp.get(`/apis/comment/music?id=${this.$store.state.songId}`,res=>{
                console.log(res.data);
                this.comments = res.data;
                // console.log(this.myFun.timeDays(res.data.hotComments[0].time))
            })
            setTimeout(()=>{
                this.getSimiSong();
            },400);
        }
    },
    // getUsers(){
    //     if(this.comments){
    //         let id = this.comments.comments.map((res,index)=>{index<10?return res.})

    //     }
    //     this.myHttp.get(`/apis/user/detail?id=${}`,res=>{
    //         console.log(res.data);
    //         this.comments = res.data;
    //         // console.log(this.myFun.timeDays(res.data.hotComments[0].time))
    //     })
    // }
    getSimiSong(){
        this.myHttp.get(`/apis/simi/song?id=${this.$store.state.songId}`,res=>{
            console.log(res.data);
            this.simiSong = res.data.songs;
            // this.comments = res.data;
            // console.log(this.myFun.timeDays(res.data.hotComments[0].time))
        })
        this.myHttp.get(`/apis/simi/user?id=${this.$store.state.songId}`,res=>{
            console.log(res.data);
            this.simiUser = res.data.userprofiles;
            // this.comments = res.data;
            // console.log(this.myFun.timeDays(res.data.hotComments[0].time))
        })
    }
  },
  created(){
    this.firstFunction();
  },
  props:["type"],
  components:{
    MySongs
  }
}
</script>

<style lang='less'>
@import "../less/index.less";
//最大的div
.comments{
    display: flex;
    justify-content: space-around;
    text-align: left;
    .simi-song{
        width: 280px;
        margin-left: 20px;
    }
    .header-comment{
        font-size: 24px;
        color: rgba(255, 255, 255, .7);
        border-bottom: 1px solid rgba(210, 210, 210, .6);
        margin: 12px 0;
        padding-bottom: 6px;
    }
    .simi-song-item{
        margin-bottom: 40px;
        .like-users{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 8px 0;
            .like-imgs{width: 40px;height: 40px;border-radius: 50%;margin-right: 5px;}
            .like-names{display: flex;align-items: center;}
        }
    }
    .my-song{
        margin: 6px 0;
        border-radius: 2px;
    }
    .my-song:hover{
        background: rgba(0, 0, 0, .25);
    }
}
.comment{
    flex: 1;
    box-sizing: border-box;
    padding: 0 20px;
    .comment-total{font-size: 14px;color: rgba(255, 255, 255, .65);margin-left: 16px;}
    .text{
        font-size: 18px;
        border-bottom: 1px solid rgba(210, 210, 210, .3);
        margin: 20px 0;
        padding-bottom: 6px;
    }
    //精彩评论
    .wonderful-comment{
        .comment-item{
            display: flex;
            justify-content: center;
            margin: 12px 0;
        }
        .comment-img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, .2);
            margin-right: 2%;
        }
        .comment-text{
            flex: 1;
        }
        .comment-txt{
            color: rgba(255, 255, 255, .85);
        }
        .comment-name{
            font-style: normal;
            color: #36B3FF;
        }
        .comment-detail{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: rgba(210, 210, 210, .85);
        }
        .comment-praise.active{
            color: @bg_wo;
        }
        .comment-reply{
            background: rgba(200, 200, 200, .2);
            text-indent: 16px;
            padding: 6px;
            margin: 5px 0;
        }
    }
}
</style>
