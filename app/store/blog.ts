import axios from "axios";
import { Context } from "nuxt";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { Archive, Category, Entry } from "models/types";

// blog information such as categories, latest entries, monthly archives...

interface IState {
  archives: Archive[];
  categories: Category[];
  latestEntries: Entry[];
}

interface IActions {
  fetchArchives: Context;
  fetchCategories: Context;
  fetchLatest5Entries: Context;
}

interface IGetters {
  archives: Archive[];
  categories: Category[];
  latestEntries: Entry[];
}

interface IMutations {
  setArchives: { archives: Archive[] };
  setCategoeies: { categories: Category[] };
  setLatestEntries: { entries: Entry[] };
}

const state: IState = {
  archives: [],
  categories: [],
  latestEntries: []
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
  }
};

const getters: DefineGetters<IGetters, IState> = {
  archives: (state) => state.archives,
  categories: (state) => state.categories,
  latestEntries: (state) => state.latestEntries,
};

const mutations: DefineMutations<IMutations, IState> = {
  setArchives(state, { archives }) {
    state.archives = archives;
  },
  setCategoeies(state, { categories }) {
    state.categories = categories;
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