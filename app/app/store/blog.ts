import { Context } from "nuxt";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { Archive } from "shared/models/archive";
import { Category } from "shared/models/category";
import { Entry } from "shared/models/entry";

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
  async fetchArchives({ commit }, { app }) {
    const archives = await app.$firebase.archive.all();
    commit("setArchives", { archives });
  },
  async fetchCategories({ commit }, { app }) {
    const categories = await app.$firebase.category.all();
    commit("setCategoeies", { categories });
  },
  async fetchLatest5Entries({ commit }, { app }) {
    const entries = await app.$firebase.entry.latest();
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