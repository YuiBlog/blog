// tslint:disable:no-shadowed-variable
import { Category } from "@yuiblog/types";
import * as firebase from "firebase";
import { DefineActions, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface IState {
  loading: boolean;
  rows: Category[];
}

interface IAction {
  fetch: {};
}

interface IMutations {
  setLoading: { loading: boolean };
  setCategories: { categories: Category[] };
}

const state: IState = {
  loading: false,
  rows: []
};

const actions: DefineActions<IAction, IState, IMutations> = {
  async fetch({ commit }) {
    commit("setLoading", { loading: true });

    const categories: Category[] = [];
    const collection = await firestore()
      .collection("categories")
      .get();
    collection.forEach(category => categories.push({ ...category.data(), name: category.id } as Category));

    commit("setCategories", { categories });
    commit("setLoading", { loading: false });
  }
};

const mutations: DefineMutations<IMutations, IState> = {
  setLoading(state, { loading }) {
    state.loading = loading;
  },
  setCategories(state, { categories }) {
    state.rows = categories;
  }
};

export default {
  actions,
  mutations,
  namespaced: true,
  state
};
