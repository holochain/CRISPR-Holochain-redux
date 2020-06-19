import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    entries: {},
    errors: {}
  },
  mutations: {
    createEntry (state, payload) {
      const entry = state.entries[`${payload.instanceId}${payload.base}`].find(n => n.id === 'new' || n.id === payload.data.id)
      Object.assign(entry, payload.data)
    },
    updateEntry (state, payload) {
      const entry = state.entries[`${payload.instanceId}${payload.base}`].find(n => n.id === payload.data.id)
      Object.assign(entry, payload.data)
    },
    deleteEntry (state, payload) {
      state.entries[`${payload.instanceId}${payload.base}`] = state.entries[`${payload.instanceId}${payload.base}`].filter(n => n.id !== payload.data.id)
    },
    error (state, payload) {
      const errors = {}
      errors[`${payload.instanceId}${payload.base}`] = [payload.error]
      state.errors = { ...state.errors, ...errors }
    },
    resetErrors (state, payload) {
      const errors = {}
      errors[`${payload.instanceId}${payload.base}`] = undefined
      state.errors = { ...state.errors, ...errors }
    },
    setList (state, payload) {
      const entries = {}
      entries[`${payload.instanceBase.instanceId}${payload.instanceBase.base}`] = payload.freckles
      state.entries = { ...state.entries, ...entries }
    }
  },
  actions: {
    resetErrors: ({ state, commit, rootState }, instanceBase) => {
      commit('resetErrors', instanceBase)
    },
    agentAddress: ({ state, commit, rootState, dispatch }, instanceBase) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceBase.instanceId, instanceBase.zome, 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('auth/agentAddress', { instanceId: instanceBase.instanceId, agentAddress: res.Ok }, { root: true })
          }
        })
      })
    },
    fetchProfiles: ({ state, commit, rootState, dispatch }, instanceBase) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceBase.instanceId, instanceBase.zome, 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('friends/profiles', { instanceBase: instanceBase, profiles: res.Ok }, { root: true })
          }
        })
      })
    },
    fetchEntries: ({ state, commit, rootState }, instanceBase) => {
      if (instanceBase.instanceId === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceBase.instanceId, instanceBase.zome, `list_${instanceBase.type}s`)({ base: instanceBase.base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setList', { instanceBase: instanceBase, freckles: res.Ok })
          }
        })
      })
    },
    createEntry: ({ state, commit, rootState }, payload) => {
      payload.entry.uuid = uuidv4()
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instanceId, payload.zome, `create_${payload.type}`)({ base: payload.base, [`${payload.type}_input`]: payload.entry }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
          } else {
            commit('createEntry', { instanceId: payload.instanceId, base: payload.base, data: res.Ok })
          }
        })
      })
    },
    updateEntry: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instanceId, payload.zome, `update_${payload.type}`)({ id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address, [`${payload.type}_input`]: payload.entry }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal.kind })
          } else {
            commit('updateEntry', { instanceId: payload.instanceId, base: payload.base, data: res.Ok })
          }
        })
      })
    },
    deleteEntry: ({ state, commit, rootState }, payload) => {
      if (payload.entry.id === 'new') {
        commit('deleteEntry', { instanceId: payload.instanceId, base: payload.base, data: payload.entry })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instanceId, payload.zome, `delete_${payload.type}`)({ base: payload.base, id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
            } else {
              commit('deleteEntry', { instanceId: payload.instanceId, base: payload.base, data: payload.entry })
            }
          })
        })
      }
    }
  }
}
