import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    drawer: false,
    instances: [],
    selectedGroup: { instanceId: '', instanceName: '' }
  },
  actions: {
    profiles: async ({ commit }, payload) => {
      commit('setProfiles', payload)
    }
  },
  getters: {
    online: state => {
      // const total = state.friends.length
      // const online = state.friends.filter(friend => friend.online).length
      return '3/5'
      // `(${online}/${total})`
    },
    allGroups: state => {
      return state.instances
    },
    friends: (state, getters, rootState) => (instanceId) => {
      const instance = state.instances.find(i => i.instanceId === instanceId)
      if (instance) {
        const agent = rootState.auth.agentAddresses.find(p => p.instanceId === instanceId)
        if (agent) {
          return instance.friends.filter(f => f.agentAddress !== agent.agentAddress)
        } else {
          return []
        }
      } else {
        return []
      }
    },
    friend: state => (instanceId, agentAddress) => {
      const instance = state.instances.find(i => i.instanceId === instanceId)
      if (instance) {
        return instance.friends.find(f => f.agentAddress === agentAddress)
      } else {
        return undefined
      }
    }
  },
  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer'),
    setGroup (state, instance) {
      state.selectedGroup = instance
    },
    setProfiles (state, payload) {
      const friends = payload.profiles.map(p => {
        return {
          id: p.id,
          agentAddress: p.agentId,
          name: p.handle,
          online: true,
          info: {
            avatar: p.avatar,
            name: ''
          },
          notifications: 0,
          value: 0,
          start: 0
        }
      })
      state.instances = state.instances.filter(i => i.instanceId !== payload.instance.instanceId)
      state.instances.push({ instanceId: payload.instance.instanceId, instanceName: payload.instance.instanceName, friends: friends })
    }
  }
}
