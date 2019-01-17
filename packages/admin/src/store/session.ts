// tslint:disable:no-shadowed-variable
import * as firebase from "firebase";
import { ActionTree, GetterTree, MutationTree } from "vuex";
// import { DefineActions, DefineGetters, DefineMutations } from "vuex-type-helper";

const auth = firebase.auth;

interface IState {
  user: firebase.User | null;
}

/*
interface IAction {
  refresh: {};
  login: {};
  logout: {};
}

interface IGetters {
  state: "enabled" | "disabled";
}

interface IMutations {
  setUser: { user: firebase.User | null };
}
*/

const state: IState = {
  user: null
};

const actions: ActionTree<IState, any> = {
  async refresh({ commit }) {
    return new Promise((resolve, _reject) => {
      auth().onAuthStateChanged(user => {
        commit("setUser", { user });
        resolve();
      });
    });
  },
  async login({ commit, state }) {
    const { user } = state.user ? state : await auth().getRedirectResult();
    if (user == null) {
      await auth().signInWithRedirect(new auth.GoogleAuthProvider());
    } else {
      commit("setUser", { user });
    }
  },
  async logout({ commit }) {
    await auth().signOut();
    commit("setUser", { user: null });
  }
};

const getters: GetterTree<IState, any> = {
  state: state => (state.user ? "enabled" : "disabled")
};

const mutations: MutationTree<IState> = {
  setUser(state, { user }) {
    state.user = user;
  }
};

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
};
