<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperImg" :key="index" :data-id="item.targetId" :data-type="item.targetType">
        <img :src="item.imageUrl">
        <!--  v-if="index==0" <img v-lazy="item.imageUrl" v-else> -->
        <span class="banner-name" :style="`background:${item.titleColor}`">{{ item.typeTitle }}</span>
      </swiper-slide>
    </swiper>
    <!--以下看需要添加-->
    <div class="swiper-scrollbar"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css"; ////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "banner",
  data() {
    return {
      swiperOption: {
        loop: true,
        notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        autoplay: {
          delay: 3000, //自动切换的时间间隔，单位ms
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
        },
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
          bulletElement: "li", //设定分页器指示器（小点）的HTML标签。
          hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
          clickable: true //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        },
        centeredSlides: true,
        paginationClickable: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: true,
        mousewheelControl: true,
        observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
      },
      swiperImg: []
    };
  },
  methods: {},
  created() {
    this.myHttp.get("/apis/banner", res => {
      this.swiperImg = res.data.banners;
    });
  },
  mounted() {},
  components: {
    swiper,
    swiperSlide
  },
  mounted() {}
};
</script>
<style lang='less'>
@import "../less/index.less";
.banner {
  width: 100%;
  position: relative;
  .banner-name{
      position: absolute;
      right: 0;
      bottom: 26px;
      height: 30px;
      border-radius: 30px 0 0 30px;
      background: @bg_wo;
      padding: 0 6px;
      text-indent: 6px;
      color: white;
      text-align: center;
      line-height: 30px;
  }
  img{
      width: 100%;
  }
}
.swiper-pagination {
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: 200px !important;
  text-align: center;
  .swiper-pagination-bullet {
    margin: 0 3px;
  }
  .swiper-pagination-bullet-active {
    background: @bg_wo;
  }
}
</style>