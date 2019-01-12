import Vue from "vue";
import Vuex from "vuex";

const files = require.context(".", false, /\.ts$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.ts") {
    return;
  }
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
});

Vue.use(Vuex);

const actions = {
  async nuxtServerInit ({dispatch}, ctx) {
    await dispatch("fetchArchives", ctx);
    await dispatch("fetchBlogSettings", ctx);
    await dispatch("fetchCategories", ctx);
    await dispatch("fetchLatest5Entries", ctx);
  }
};

export default () => new Vuex.Store({
  actions,
  modules,
  strict: process.env.NODE_ENV !== "production"
})