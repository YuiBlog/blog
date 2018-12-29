// tslint:disable:no-shadowed-variable
import * as firebase from "firebase";
import { DefineActions, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface IState {
  loading: boolean;
  rows: any[];
}

interface IAction {
  fetch: { from?: string; to?: string };
}

interface IMutations {
  setLoading: { loading: boolean };
  setEntries: { entries: any[] };
}

const state: IState = {
  loading: false,
  rows: []
};

const actions: DefineActions<IAction, IState, IMutations> = {
  async fetch({ commit }, { from, to } = {}) {
    commit("setLoading", { loading: true });

    const entries: any[] = [];
    const query = await firestore()
      .collection("entries")
      .orderBy("created_at", "desc")
      .limit(2);
    const collection = await (from ? query.startAfter(from) : to ? query.endBefore(to) : query).get();
    collection.forEach(entry => entries.push({ ...entry.data(), id: entry.id }));

    commit("setEntries", { entries });
    commit("setLoading", { loading: false });
  }
};

const mutations: DefineMutations<IMutations, IState> = {
  setLoading(state, { loading }) {
    state.loading = loading;
  },
  setEntries(state, { entries }) {
    state.rows = entries;
  }
};

export default {
  actions,
  mutations,
  namespaced: true,
  state
};
