// tslint:disable:no-shadowed-variable
import { Settings, Nullable } from "@yuiblog/types";
import firebase from "firebase";
import { ActionTree, MutationTree } from "vuex";

const firestore = firebase.firestore;

interface IState {
  blog: Nullable<Settings.Blog>;
  user: Nullable<Settings.User>;
  loading: boolean;
}

const state: IState = {
  blog: null,
  user: null,
  loading: false
};

const actions: ActionTree<IState, any> = {
  async fetch({ commit }) {
    commit("setLoading", { loading: true });

    const blog = await firestore()
      .collection("settings")
      .doc("blog")
      .get();
    commit("setBlogSettings", { blog: blog.data() as Settings.Blog });

    const user = await firestore()
      .collection("settings")
      .doc("user")
      .get();
    commit("setUserSettings", { user: user.data() as Settings.User });

    commit("setLoading", { loading: false });
  },
  async saveBlog({ commit }, { blog }: { blog: Settings.Blog }) {
    commit("setLoading", { loading: true });
    await firestore().collection("settings").doc("blog").update(blog);
    commit("setLoading", { loading: false });
  },
  async saveUser({ commit }, { user }: { user: Settings.User }) {
    commit("setLoading", { loading: true });
    await firestore().collection("settings").doc("user").update(user);
    commit("setLoading", { loading: false });
  },
};

const mutations: MutationTree<IState> = {
  setBlogSettings(state, { blog }: { blog: Settings.Blog }) {
    state.blog = blog;
  },
  setUserSettings(state, { user }) {
    state.user = user;
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
