// tslint:disable:no-shadowed-variable
import { Entry } from "@yuiblog/types";
import * as firebase from "firebase";
import { DefineActions, DefineMutations } from "vuex-type-helper";

const firestore = firebase.firestore;

interface IState {
  loading: boolean;
  pagination: {
    current: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  rows: Entry[];
}

interface IAction {
  fetch: { cursor?: "next" | "prev" };
  publish: { entry: Entry };
}

interface IMutations {
  setEntries: { entries: Entry[] };
  setLoading: { loading: boolean };
  setPagination: { cursor?: "next" | "prev"; hasNext: boolean };
}

const state: IState = {
  loading: false,
  pagination: {
    current: 0,
    hasNext: false,
    hasPrev: false
  },
  rows: []
};

const actions: DefineActions<IAction, IState, IMutations> = {
  async fetch({ commit, state }, { cursor } = {}) {
    commit("setLoading", { loading: true });

    const entries: any[] = [];
    const query = await firestore()
      .collection("entries")
      .orderBy("created_at", "desc")
      .limit(21);

    let collection;
    if (cursor === "next") {
      collection = await query.startAfter(state.rows[state.rows.length - 1].created_at).get();
    } else if (cursor === "prev") {
      collection = await query.endBefore(state.rows[0].created_at).get();
    } else {
      collection = await query.get();
    }
    collection.forEach(entry => entries.push({ ...entry.data(), id: entry.id }));

    commit("setEntries", { entries: entries.slice(0, 20) });
    commit("setPagination", { cursor, hasNext: entries.length > 20 });
    commit("setLoading", { loading: false });
  },
  async publish({ commit }, { entry }) {
    commit("setLoading", { loading: true });

    if (entry.id) {
      await firestore()
        .collection("entries")
        .doc(entry.id)
        .update(entry);
    } else {
      await firestore()
        .collection("entries")
        .doc()
        .set(entry);
    }

    commit("setLoading", { loading: false });
  }
};

const mutations: DefineMutations<IMutations, IState> = {
  setEntries(state, { entries }) {
    state.rows = entries;
  },
  setLoading(state, { loading }) {
    state.loading = loading;
  },
  setPagination(state, { cursor, hasNext }) {
    let { current } = state.pagination;
    current = cursor === "next" ? current + 1 : cursor === "prev" ? current - 1 : current;
    state.pagination = {
      current,
      hasNext,
      hasPrev: current > 0
    };
  }
};

export default {
  actions,
  mutations,
  namespaced: true,
  state
};
