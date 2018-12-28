import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      component: Home,
      name: "home",
      path: "/"
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
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
      name: "about",
      path: "/about"
    }
  ]
});
export default router;
