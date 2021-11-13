//配置路由相关的资讯
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import store from "@/store";
//安装外挂
Vue.use(VueRouter);
//建立VueRouter的物料
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  }, //webpackChunkName:这为该路由分割出单独的js块,懒加载:只有访问的时候才会加载该js块，使SPA更轻更小
  {
    path: "/destination/:slug",
    name: "destinationDetails",
    props: true,
    component: () =>
      import(/* webpackChunkName:"details" */ "@/views/DestinationDetails"),
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName:"ExperienceDetails" */ "@/views/ExperienceDetails"
          ),
      },
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        (destination) => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "notFound" });
      }
    },
  },
  {
    path: "/404",
    alias: "*", //与/404组成同义词
    name: "notFound",
    component: () =>
      import(/* webpackChunkName:"NotFound" */ "@/views/NotFound"),
  },
];
//配置路由和元件之间的对应关系
const router = new VueRouter({
  mode: "history", //去掉难看的#
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }

        return false; //如果返回false，则保持当前的position
      }
    }
  },
});
//把router物件传到Vue例项中
export default router;
