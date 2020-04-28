import { set } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    loggedIn: false,
    chimeraOn: false
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
    setChimeraOn: set('chimeraOn')
  }
}
