import { createStore } from "vuex";

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
});