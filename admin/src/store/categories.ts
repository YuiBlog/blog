// tslint:disable:no-shadowed-variable
import * as firebase from "firebase";
import { DefineActions, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface ICategory {
  name: string;
  count: string;
}

interface IState {
  loading: boolean;
  rows: ICategory[];
}

interface IAction {
  fetch: {};
}

interface IMutations {
  setLoading: { loading: boolean };
  setCategories: { categories: ICategory[] };
}

const state: IState = {
  loading: false,
  rows: []
};

const actions: DefineActions<IAction, IState, IMutations> = {
  async fetch({ commit }) {
    commit("setLoading", { loading: true });

    const categories: ICategory[] = [];
    const collection = await firestore()
      .collection("categories")
      .get();
    collection.forEach(category => categories.push({ ...category.data(), name: category.id } as ICategory));

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
