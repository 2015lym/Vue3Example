import { createStore, Store } from 'vuex'

interface State {
  count: number
}

const state: State = {
  count: 0
}

const getters = {
  doubleCount: (state: State) => {
    return state.count * 2
  }
}

const mutations = {
  increment(state: State) {
    state.count++
  }
}

const actions = {
  incrementAsync({ commit }: { commit: Function }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}

const store: Store<State> = createStore<State>({
  state,
  getters,
  mutations,
  actions
})

export default store
