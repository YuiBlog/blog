// tslint:disable:no-shadowed-variable
import * as firebase from "firebase";
import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface ICategory {
  name: string;
  count: string;
}

interface IState {
  rows: ICategory[];
}

interface IAction {
  fetch: {};
}

interface IMutations {
  setCategories: { categories: ICategory[] };
}

const state: IState = {
  rows: []
};

const actions: DefineActions<IAction, IState, IMutations> = {
  async fetch({ commit }) {
    const categories: ICategory[] = [];
    const collection = await firestore()
      .collection("categories")
      .get();
    collection.forEach(category => categories.push({ ...category.data(), name: category.id } as ICategory));

    commit("setCategories", { categories });
  }
};

const mutations: DefineMutations<IMutations, IState> = {
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
