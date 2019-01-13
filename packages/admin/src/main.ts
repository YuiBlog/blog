import Vue from "vue";

import "./bootstrap";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "nprogress";
import "./assets/tailwindcss.scss";
import "./assets/prismjs.scss";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
