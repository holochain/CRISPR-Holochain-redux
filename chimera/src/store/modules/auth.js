import { set } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    loggedIn: false
  },

  actions: {
    login: async ({ commit }) => {
      commit('setLoggedIn', true)
    },
    logout: async ({ commit }) => {
      commit('setLoggedIn', false)
    }
  },

  mutations: {
    setLoggedIn: set('loggedIn')
  }
}
