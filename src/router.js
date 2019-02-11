import Vue from "vue";
import Router from "vue-router";
// import Recommend from "@/pages/Recommend.vue";
import FindSong from "@/pages/findSong/FindSong.vue";
const Recommend =()=>import(/* webpackChunkName: "group-foo" */ "@/pages/findSong/Recommend.vue");
const SongSheet =()=>import(/* webpackChunkName: "group-foo" */ "@/pages/findSong/SongSheet.vue");
const PlayList =()=>import(/* webpackChunkName: "group-foo" */ "@/pages/playlist/PlayList.vue");
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "findSong",
      component: FindSong,
      redirect:'/recommend',
      children: [
        {
          path: "recommend",
          name: "recommend",
          component: Recommend
        },
        {
          path: "songSheet",
          name: "songSheet",
          component: SongSheet
        },
      ]
    },
    {
      path: "/playlist/:id",
      name: "playList",
      component: PlayList,
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
