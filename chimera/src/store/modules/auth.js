import { set } from '@/utils/vuex'

export default {
  namespaced: true,
  state: {
    agentAddresses: [],
    loggedIn: false,
    chimera: false,
    splash: true,
    developer: {
      folder: '/Users/philipbeadle/holochain/CRISPR-Holochain-redux'
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
    },
    turnSplashON: async ({ commit }) => {
      commit('setSplashON', true)
    },
    installDna: ({ state, commit, rootState }) => {
      // check if DNA installed - get instances
      // unistall
      // install
      // start instances
      // check if args needs updating on each event
      // run events on instances
      rootState.holochainConnection.then(({ call }) => {
        call('admin/dna/install_from_file')({ id: 'testInstall', name: 'testInstallName', path: '/Users/philipbeadle/holochain/CRISPR/dna/bubbles/dna/dist/dna.dna.json' }).then((result) => {
          console.log(result)
        })
      })
    }
  },
  mutations: {
    setLoggedIn: set('loggedIn'),
    setChimeraOn: set('chimera'),
    setSplashOff: set('splash'),
    setSplashOn: set('splash', false),
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
