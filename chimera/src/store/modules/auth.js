import { set } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    agentAddresses: [],
    loggedIn: false,
    chimera: false,
    splash: true,
    developer: {
      folder: '/Users/philipbeadle/holochain/CRISPR'
    }
  },
  actions: {
    agentAddress: async ({ commit }, { instanceId, agentAddress }) => {
      commit('setAgentAddress', { instanceId, agentAddress })
    },
    agentProfile: async ({ commit }, { instanceId, profiles }) => {
      commit('setAgentProfile', { instanceId, profiles })
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
      state.agentAddresses.push({ instanceId: payload.instanceId, agentAddress: payload.agentAddress })
    }
  },
  getters: {
    agentAddress: (state, getters) => instanceId => {
      const agent = state.agentAddresses.find(p => p.instanceId === instanceId)
      if (agent) {
        return agent.agentAddress
      } else {
        return ''
      }
    }
  }
}
