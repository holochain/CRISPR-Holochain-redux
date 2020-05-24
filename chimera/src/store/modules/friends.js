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
    friends: (state, rootState) => {
      console.log(state)
      state.friends.forEach(friend => {
        console.log(friend.agentAddress)
      })
      return state.friends
      // const group = state.groups.find(g => g.name === state.selectedGroup)
      // console.log(group.friends)
      // if (group) {
      //   return group.friends
      // } else {
      //   return []
      // }
    },
    agentProfile: (state, rootState) => {
      console.log(state)
      return state.friends[4]
      // const group = state.groups.find(g => g.name === state.selectedGroup)
      // console.log(group.friends)
      // if (group) {
      //   return group.friends
      // } else {
      //   return []
      // }
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
