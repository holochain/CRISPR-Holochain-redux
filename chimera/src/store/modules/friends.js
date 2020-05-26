import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    drawer: false,
    friends: [],
    selectedGroup: 'Friends',
    groups: [
      {
        instanceId: '',
        name: 'Friends'
      },
      {
        instanceId: '',
        name: 'Producers'
      },
      {
        instanceId: '',
        name: 'Family'
      },
      {
        instanceId: '',
        name: 'Esoteric Crew'
      },
      {
        instanceId: '',
        name: 'Psylandians'
      }
    ]
  },
  actions: {
    profiles: async ({ commit }, profiles) => {
      commit('setProfiles', profiles)
    }
  },
  getters: {
    online: state => {
      const total = state.friends.length
      const online = state.friends.filter(friend => friend.online).length
      return `(${online}/${total})`
    },
    allGroups: state => {
      return state.groups
    },
    friends: (state, getters, rootState) => {
      return state.friends.filter(f => f.agentAddress !== rootState.auth.agentAddress)
    },
    friend: state => (agentAddress) => {
      return state.friends.find(f => f.agentAddress === agentAddress)
    },
    agentProfile: (state, getters, rootState) => {
      return state.friends.find(f => f.agentAddress === rootState.auth.agentAddress)
    }
  },
  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer'),
    setGroup (state, group) {
      state.selectedGroup = group
      console.log(state.selectedGroup)
    },
    setProfiles (state, profiles) {
      state.friends = profiles.profiles
      console.log(state.friends)
    }
  }
}
