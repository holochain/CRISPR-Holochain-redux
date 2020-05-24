import { set } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    agentAddress: '',
    agentProfile: {},
    loggedIn: false,
    chimera: false,
    splash: true,
    developer: {
      folder: '/Users/philipbeadle/holochain/CRISPR'
    }
  },
  actions: {
    agentAddress: async ({ commit }, agentAddress) => {
      commit('setAgentAddress', agentAddress)
    },
    agentProfile: async ({ commit }, agentProfile) => {
      commit('setAgentProfile', agentProfile)
    },
    turnChimeraOn: async ({ commit }) => {
      commit('setChimeraOn', true)
    },
    turnChimeraOff: async ({ commit }) => {
      commit('setChimeraOn', false)
    },
    turnSplashOff: async ({ commit }) => {
      commit('setSplashOff', false)
    }
  },
  mutations: {
    setLoggedIn: set('loggedIn'),
    setChimeraOn: set('chimera'),
    setSplashOff: set('splash'),
    setAgentAddress (state, payload) {
      state.agentAddress = payload.agentAddress
    },
    setAgentProfile (state, payload) {
      console.log(payload)
      state.agentProfile = payload.agentProfile
    }
  },
  getters: {
    agentProfile: (state, getters) => {
      return state.agentProfile
    }
  }
}
