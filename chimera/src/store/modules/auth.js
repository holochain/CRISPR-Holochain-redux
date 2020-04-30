import { set } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    loggedIn: false,
    chimera: false,
    developer: {
      folder: '/Users/philipbeadle/holochain/CRISPR'
    }
  },

  actions: {
    login: async ({ commit }) => {
      commit('setLoggedIn', true)
    },
    logout: async ({ commit }) => {
      commit('setLoggedIn', false)
    },
    turnChimeraOn: async ({ commit }) => {
      commit('setChimeraOn', true)
    },
    turnChimeraOff: async ({ commit }) => {
      commit('setChimeraOn', false)
    }
  },

  mutations: {
    setLoggedIn: set('loggedIn'),
    setChimeraOn: set('chimera')
  }
}
