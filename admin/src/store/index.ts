import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// tslint:disable-next-line:interface-over-type-literal
type Indexer = { [key: string]: any };

const files = require.context(".", false, /\.ts$/);
const modules: Indexer = {};

files.keys().forEach(w => {
  if (w === "./index.ts") {
    return;
  }
  modules[w.replace(/(\.\/|\.ts)/g, "")] = files(w).default;
});

export default new Vuex.Store({
  modules
});
