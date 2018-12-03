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
  nuxtServerInit: async ({dispatch}, ctx) => {
    dispatch("fetchCategories", ctx);
    dispatch("fetchLatest5Entries", ctx);
  }
};

export default () => new Vuex.Store({
  actions,
  modules,
  strict: process.env.NODE_ENV !== "production"
})