export default {
  namespaced: true,
  state: {
    entries: {},
    errors: {}
  },
  mutations: {
    createEntry (state, payload) {
      const entry = state.entries[`${payload.instanceId}${payload.base}`].find(n => n.id === 'new')
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
        callZome(instanceBase.instanceId, `${instanceBase.type}s`, 'agent_address')({ }).then((result) => {
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
        callZome(instanceBase.instanceId, 'freckles', 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            const friends = res.Ok.map(p => {
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
            dispatch('friends/profiles', { instanceBase: instanceBase, profiles: friends }, { root: true })
          }
        })
      })
    },
    fetchFreckles: ({ state, commit, rootState }, instanceBase) => {
      if (instanceBase.instanceId === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceBase.instanceId, 'freckles', 'list_freckles')({ base: instanceBase.base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setList', { instanceBase: instanceBase, freckles: res.Ok })
          }
        })
      })
    },
    saveEntry: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.entry.id === 'new' || payload.entry.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instanceId, `${payload.type}s`, `create_${payload.type}`)({ base: payload.base, [`${payload.type}_input`]: payload.entry }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
            } else {
              commit('createEntry', { instanceId: payload.instanceId, base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instanceId, `${payload.type}s`, `update_${payload.type}`)({ id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address, [`${payload.type}_input`]: payload.entry }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateEntry', { instanceId: payload.instanceId, base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteEntry: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instanceId, `${payload.type}s`, `delete_${payload.type}`)({ base: payload.base, id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address }).then((result) => {
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
