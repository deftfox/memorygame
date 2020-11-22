import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    leaderboard: [
      {
        name: 'Foo',
        time: '00:31:12'
      },
      {
        name: 'Bar',
        time: '00:27:33'
      },
      {
        name: 'Baz',
        time: '00:18:33'
      }
    ]
  },
  mutations: {
    setResult(state, result) {
      state.leaderboard.push(result);
    },
  },
  actions: {
    writeNewResultToLeaderboard({ commit }, {name, time}) {
      let result = {
        name : name,
        time : time
      }
      commit("setResult", result);
    },
  },
  modules: {
  }
})
