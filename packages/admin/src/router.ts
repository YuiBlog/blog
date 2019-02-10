import NProgress from "nprogress";
import Vue from "vue";
import Router, { RawLocation, Route } from "vue-router";

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
        },
        {
          component: () => import(/* webpackChunkName: "edit" */ "./views/Edit.vue"),
          path: "/edit"
        },
        {
          component: () => import(/* webpackChunkName: "entries" */ "./views/Entries.vue"),
          path: "/entries"
        },
        {
          component: () => import(/* webpackChunkName: "categories" */ "./views/Categories.vue"),
          path: "/categories"
        },
        {
          component: () => import(/* webpackChunkName: "settings" */ "./views/Settings.vue"),
          path: "/settings"
        },
      ]
    },
    {
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue"),
      name: "login",
      path: "/login"
    },
    {
      component: () => import(/* webpackChunkname: "logout" */ "./views/Logout.vue"),
      name: "logout",
      path: "/logout"
    }
  ]
});

router.beforeResolve(async (to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) => {
  NProgress.start();

  if (to.name === "login") {
    next();
  }

  await store.dispatch("session/refresh");
  const session = await store.getters["session/state"];
  if (session === "enabled") {
    next();
  } else {
    next({ name: "login" });
  }

  NProgress.done();
});

export default router;
