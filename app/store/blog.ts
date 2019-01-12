import axios from "axios";
import { Context } from "nuxt";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { Archive, Category, Entry, Settings } from "models/types";

// blog information such as categories, latest entries, monthly archives...

interface IState {
  archives: Archive[];
  categories: Category[];
  latestEntries: Entry[];
  settings: Settings;
}

interface IActions {
  fetchArchives: Context;
  fetchCategories: Context;
  fetchLatest5Entries: Context;
  fetchBlogSettings: Context;
}

interface IGetters {
  archives: Archive[];
  categories: Category[];
  latestEntries: Entry[];
  settings: Settings;
}

interface IMutations {
  setArchives: { archives: Archive[] };
  setCategoeies: { categories: Category[] };
  setLatestEntries: { entries: Entry[] };
  setBlogSettings: { settings: Settings };
}

const state: IState = {
  archives: [],
  categories: [],
  latestEntries: [],
  settings: {
    blog: {
      description: "This is a YuiBlog.",
      name: "YuiBlog"
    },
    user: {
      bio: "Yui",
      icon: "https://fakeimg.mochizuki.moe/256x256/",
      name: "YuiBlog"
    }
  }
};

const actions: DefineActions<IActions, IState, IMutations, IGetters> = {
  async fetchArchives({ commit }) {
    const archives = await axios.get(`${process.env.FIREBASE_HOSTING_URL}/archives`).then(w => w.data);
    commit("setArchives", { archives });
  },
  async fetchCategories({ commit }) {
    const categories = await axios.get(`${process.env.FIREBASE_HOSTING_URL}/categories`).then(w => w.data);
    commit("setCategoeies", { categories });
  },
  async fetchLatest5Entries({ commit }) {
    const entries = await axios.get(`${process.env.FIREBASE_HOSTING_URL}/entries/latest`).then(w => w.data);
    commit("setLatestEntries", { entries });
  },
  async fetchBlogSettings({ commit }) {
    const settings = await axios.get(`${process.env.FIREBASE_HOSTING_URL}/blog/settings`).then(w => w.data);
    commit("setBlogSettings", { settings });
  }
};

const getters: DefineGetters<IGetters, IState> = {
  archives: (state) => state.archives,
  categories: (state) => state.categories,
  latestEntries: (state) => state.latestEntries,
  settings: (state) => state.settings,
};

const mutations: DefineMutations<IMutations, IState> = {
  setArchives(state, { archives }) {
    state.archives = archives;
  },
  setCategoeies(state, { categories }) {
    state.categories = categories;
  },
  setBlogSettings(state, { settings }) {
    state.settings = settings;
  },
  setLatestEntries(state, { entries }) {
    state.latestEntries = entries.map(w => {
      return Object.assign(w, { body: null });
    });
  }
};

export default {
  actions,
  getters,
  state,
  mutations,
};