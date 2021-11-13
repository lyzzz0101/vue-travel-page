import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//把路由例项挂载
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
