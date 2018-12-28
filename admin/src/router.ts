import NProgress from "nprogress";
import Vue from "vue";
import Router, { RawLocation, Route } from "vue-router";

import Home from "./views/Home.vue";

import store from "./store";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      component: () => import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      path: "/",
      // tslint:disable-next-line
      children: [
        {
          component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue"),
          path: "/"
        }
      ]
    },
    {
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue"),
      name: "login",
      path: "/login"
    }
  ]
});

router.beforeResolve(async (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
  NProgress.start();

  await store.dispatch("session/refresh");
  const session = await store.getters["session/state"];
  if (to.path === "/login" || session === "enabled") {
    next();
  } else {
    next("/login");
  }

  NProgress.done();
});

export default router;
