// tslint:disable:no-shadowed-variable
import { Entry, Nullable } from "@yuiblog/types";
import * as firebase from "firebase";
import { ActionTree, MutationTree } from "vuex";
// import { DefineActions, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface IState {
  loading: boolean;
  row: Nullable<Entry>;
}

/*
interface IAction {
  fetch: { id: string };
}

interface IMutations {
  setEntry: { entry: Entry };
  setLoading: { loading: boolean };
}
*/

const state: IState = {
  loading: false,
  row: null
}

const actions: ActionTree<IState, any> = {
  async fetch({ commit }, { id }) {
    commit("setLoading", { loading: true });

    const entry = await firestore()
      .collection("entries")
      .doc(id)
      .get();

    commit("setEntry", { entry: { ...entry.data(), id: entry.id } as Entry });
    commit("setLoading", { loading: false });
  }
};

const mutations: MutationTree<IState> = {
  setEntry(state, { entry }) {
    state.row = entry;
  },
  setLoading(state, { loading }) {
    state.loading = loading;
  }
};

export default {
  actions,
  mutations,
  namespaced: true,
  state
};
