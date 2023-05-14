import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

interface State {
  isLoggedIn: boolean;
}

const state: State = {
  isLoggedIn: false,
};

export default createStore({
  state,
  mutations: {
    setLoggedIn(state: State, isLoggedIn: boolean) {
      state.isLoggedIn = isLoggedIn;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});