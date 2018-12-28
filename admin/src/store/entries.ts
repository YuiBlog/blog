// tslint:disable:no-shadowed-variable
import * as firebase from "firebase";
import { DefineActions, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface IState {
  rows: any[];
}

interface IAction {
  fetch: { page: number };
}

interface IMutations {
  setEntries: { entries: any[] };
}

const state: IState = {
  rows: []
};

const actions: DefineActions<IAction, IState, IMutations> = {
  async fetch({ commit }, { page }) {
    const entries: any[] = [];
    const collection = await firestore()
      .collection("entries")
      .orderBy("created_at", "desc")
      .limit(20)
      .get();
    collection.forEach(entry => entries.push({ ...entry.data(), id: entry.id }));

    commit("setEntries", { entries });
  }
};

const mutations: DefineMutations<IMutations, IState> = {
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
