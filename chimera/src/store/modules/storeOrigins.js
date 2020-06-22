import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    entries: {},
    errors: {}
  },
  mutations: {
    createEntry (state, payload) {
      console.log(state.entries)
      console.log(`${payload.instance.instanceId}${payload.base}`)
      const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === 'new' || n.id === payload.data.id)
      Object.assign(entry, payload.data)
    },
    updateEntry (state, payload) {
      const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === payload.data.id)
      Object.assign(entry, payload.data)
    },
    deleteEntry (state, payload) {
      state.entries[`${payload.instance.instanceId}${payload.base}`] = state.entries[`${payload.instance.instanceId}${payload.base}`].filter(n => n.id !== payload.data.id)
    },
    error (state, payload) {
      const errors = {}
      errors[`${payload.instance.instanceId}${payload.base}`] = [payload.error]
      state.errors = { ...state.errors, ...errors }
    },
    resetErrors (state, payload) {
      const errors = {}
      errors[`${payload.instance.instanceId}${payload.base}`] = undefined
      state.errors = { ...state.errors, ...errors }
    },
    setList (state, payload) {
      const entries = {}
      entries[`${payload.instance.instanceId}${payload.base}`] = payload.entries
      state.entries = { ...state.entries, ...entries }
    }
  },
  actions: {
    resetErrors: ({ state, commit, rootState }, instance) => {
      commit('resetErrors', instance)
    },
    agentAddress: ({ state, commit, rootState, dispatch }, instance) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instance.instanceId, instance.zome, 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('auth/agentAddress', { instanceId: instance.instanceId, agentAddress: res.Ok }, { root: true })
          }
        })
      })
    },
    order: ({ state, commit, rootState }, payload) => {
      commit('setList', { instance: payload.instance, entries: payload.entries })
      payload.entries.forEach(entry => {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instance.instanceId, payload.instance.zome, `update_${payload.instance.type}`)({ id: entry.id, created_at: entry.createdAt, address: entry.address, [`${payload.instance.type}_input`]: { ...entry } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal.kind })
            } else {
              commit('updateEntry', { instance: payload.instance, base: payload.base, data: res.Ok })
            }
          })
        })
      })
    },
    rebase: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('notes', 'notes', 'rebase_note')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    fetchProfiles: ({ state, commit, rootState, dispatch }, instance) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instance.instanceId, instance.zome, 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('friends/profiles', { instance: instance, profiles: res.Ok }, { root: true })
          }
        })
      })
    },
    fetchEntries: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instance.instanceId, payload.instance.zome, `list_${payload.instance.type}s`)({ base: payload.base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setList', { instance: payload.instance, base: payload.base, entries: res.Ok })
          }
        })
      })
    },
    createEntry: ({ state, commit, rootState }, payload) => {
      console.log(payload)
      payload.entry.uuid = uuidv4()
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instance.instanceId, payload.instance.zome, `create_${payload.instance.type}`)({ base: payload.base, [`${payload.instance.type}_input`]: payload.entry }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
          } else {
            commit('createEntry', { instance: payload.instance, base: payload.base, data: res.Ok })
          }
        })
      })
    },
    updateEntry: ({ state, commit, rootState }, payload) => {
      const instance = { ...payload.instance }
      const entry = { ...payload.entry }
      console.log(payload)
      console.log(entry)

      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instance.instanceId, instance.zome, `update_${instance.type}`)({ id: entry.id, created_at: entry.createdAt, address: entry.address, [`${instance.type}_input`]: { ...entry } }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal.kind })
          } else {
            commit('updateEntry', { instance: payload.instance, base: payload.base, data: res.Ok })
          }
        })
      })
    },
    deleteEntry: ({ state, commit, rootState }, payload) => {
      if (payload.entry.id === 'new') {
        commit('deleteEntry', { instance: payload.instance, base: payload.base, data: payload.entry })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instance.instanceId, payload.instance.zome, `delete_${payload.instance.type}`)({ base: payload.base, id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
            } else {
              commit('deleteEntry', { instance: payload.instance, base: payload.base, data: payload.entry })
            }
          })
        })
      }
    }
  }
}
