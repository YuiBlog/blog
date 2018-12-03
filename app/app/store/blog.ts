import { Context } from "nuxt";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

import { Entry } from "shared/models/entry";

// blog information such as categories, latest entries, monthly archives...

interface IState {
  latestEntries: Entry[];
}

interface IActions {
  fetchLatest5Entries: Context;
}

interface IGetters {
  latestEntries: Entry[];
}

interface IMutations {
  setLatestEntries: { entries: Entry[] };
}

const state: IState = {
  latestEntries: []
};

const actions: DefineActions<IActions, IState, IMutations, IGetters> = {
  async fetchLatest5Entries({ commit }, { app }) {
    const entries = await app.$firebase.entry.latest();
    commit("setLatestEntries", { entries });
  }
};

const getters: DefineGetters<IGetters, IState> = {
  latestEntries: (state) => state.latestEntries,
};

const mutations: DefineMutations<IMutations, IState> = {
  setLatestEntries(state, { entries }) {
    state.latestEntries = entries;
  }
};

export default {
  actions,
  getters,
  state,
  mutations,
};