import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import myHttp from "./http/http";
import MyFun from "../public/function";


Vue.config.productionTip = false;
Vue.prototype.myHttp = myHttp;
Vue.prototype.myFun = MyFun;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
