import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    entries: {},
    errors: {},
    partParts: {},
    partInvites: {
      QmbyRYn2GN5MjJ8QTskk6xHTN88kCyUCgNysm2JEQXgt7R: [
        {
          id: 'e7ac961d-388c-4a2a-b82b-f7d2479bf9e2',
          from: 'Art Brock', // Use AgentId and pick up name from Address book
          part: {
            title: 'tasks',
            name: 'Tasks - Chimera Tasks',
            instance: {
              id: 'Qmtaskb1',
              zome: 'tasks',
              type: 'task',
              instanceId: 'e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a',
              instanceName: 'Chimera Tasks'
            }
          }
        }
      ],
      QmWCJWin5xJ5G2pX6StDaSoiaxh1Ns7Lkh5ySJXCE1tbo6: [
        {
          id: 'e7ac961d-388c-4a2a-b82b-f7d2479bf9e2',
          from: 'Art Brock', // Use AgentId and pick up name from Address book
          part: {
            title: 'tasks',
            name: 'Tasks - Chimera Tasks',
            instance: {
              id: 'Qmtaskb1',
              zome: 'tasks',
              type: 'task',
              instanceId: 'e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a',
              instanceName: 'Chimera Tasks'
            }
          }
        }
      ]
    }
  },
  mutations: {
    initialiseEntries (state, payload) {
      const localStorageItem = localStorage[`${payload.instance.instanceId}${payload.base}`]
      if (localStorageItem) {
        // console.log(JSON.parse(localStorageItem))
        const entries = {}
        entries[`${payload.instance.instanceId}${payload.base}`] = JSON.parse(localStorageItem)
        state.entries = { ...state.entries, ...entries }
      }
    },
    createEntry (state, payload) {
      const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === 'new' || n.id === payload.data.id)
      Object.assign(entry, payload.data)
      localStorage.setItem(`${payload.instance.instanceId}${payload.base}`, JSON.stringify(state.entries[`${payload.instance.instanceId}${payload.base}`]))
    },
    updateEntry (state, payload) {
      const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === payload.data.id)
      Object.assign(entry, payload.data)
      localStorage.setItem(`${payload.instance.instanceId}${payload.base}`, JSON.stringify(state.entries[`${payload.instance.instanceId}${payload.base}`]))
    },
    deleteEntry (state, payload) {
      state.entries[`${payload.instance.instanceId}${payload.base}`] = state.entries[`${payload.instance.instanceId}${payload.base}`].filter(n => n.id !== payload.data.id)
      localStorage.setItem(`${payload.instance.instanceId}${payload.base}`, JSON.stringify(state.entries[`${payload.instance.instanceId}${payload.base}`]))
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
      localStorage.setItem(`${payload.instance.instanceId}${payload.base}`, JSON.stringify(payload.entries))

      const localStorageItem = localStorage[`${payload.instance.instanceId}${payload.base}`]
      if (localStorageItem) {
        // console.log(JSON.parse(localStorageItem))
        const entries = {}
        entries[`${payload.instance.instanceId}${payload.base}`] = JSON.parse(localStorageItem)
        state.entries = { ...state.entries, ...entries }
      }
    },
    setSortedList (state, payload) {
      const sortedEntries = payload.entries.sort((a, b) => {
        let compare = 0
        if (a[payload.sortKey] > b[payload.sortKey]) {
          compare = 1
        } else if (b[payload.sortKey] > a[payload.sortKey]) {
          compare = -1
        }
        return compare
      })
      const entries = {}
      entries[`${payload.instance.instanceId}${payload.base}`] = sortedEntries
      state.entries = { ...state.entries, ...entries }
      localStorage.setItem(`${payload.instance.instanceId}${payload.base}`, JSON.stringify(payload.entries))
    },
    setPartsList (state, payload) {
      const parts = {}
      parts[payload.base] = payload.parts
      state.parts = { ...state.parts, ...parts }
      localStorage.setItem('state.parts', JSON.stringify(state.parts))
    },
    addPartPart (state, payload) {
      const partParts = {}
      partParts[payload.base] = [payload.part]
      state.partParts = { ...state.partParts, ...partParts }
      localStorage.setItem('state.partParts', JSON.stringify(state.partParts))
    },
    acceptPartInvite (state, payload) {
      const partParts = {}
      partParts[payload.base] = [payload.invite.part]
      state.partInvites[payload.base] = state.partInvites[payload.base].filter(i => i.id !== payload.invite.id)
      state.partParts = { ...state.partParts, ...partParts }
      localStorage.setItem('state.partParts', JSON.stringify(state.partParts))
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
            // console.log(res)
          } else {
            dispatch('auth/agentAddress', { instanceId: instance.instanceId, agentAddress: res.Ok }, { root: true })
          }
        })
      })
    },
    fetchProfiles: ({ state, commit, rootState, dispatch }, instance) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instance.instanceId, instance.zome, 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            // console.log(res)
          } else {
            dispatch('friends/profiles', { instance: instance, profiles: res.Ok }, { root: true })
          }
        })
      })
    },
    order: ({ state, commit, rootState }, payload) => {
      commit('setList', { instance: payload.instance, base: payload.base, entries: payload.entries })
      payload.entries.forEach(entry => {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instance.instanceId, payload.instance.zome, `update_${payload.instance.type}`)({ id: entry.id, created_at: entry.createdAt, address: entry.address, [`${payload.instance.type}_input`]: { ...entry } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
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
        callZome(payload.instance.instanceId, payload.instance.zome, `rebase_${payload.instance.type}`)({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    fetchEntries: ({ state, commit, rootState }, payload) => {
      commit('initialiseEntries', { instance: payload.instance, base: payload.base })
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instance.instanceId, payload.instance.zome, `list_${payload.instance.type}s`)({ base: payload.base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            // console.log(res)
          } else {
            if (payload.sortKey) {
              commit('setSortedList', { instance: payload.instance, base: payload.base, entries: res.Ok, sortKey: payload.sortKey })
            } else {
              commit('setList', { instance: payload.instance, base: payload.base, entries: res.Ok })
            }
          }
        })
      })
    },
    createEntry: ({ state, commit, rootState }, payload) => {
      // console.log(payload)
      payload.entry.uuid = uuidv4()
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instance.instanceId, payload.instance.zome, `create_${payload.instance.type}`)({ base: payload.base, [`${payload.instance.type}_input`]: { ...payload.entry } }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
          } else {
            commit('createEntry', { instance: payload.instance, base: payload.base, data: res.Ok })
          }
        })
      })
    },
    updateEntry: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instance.instanceId, payload.instance.zome, `update_${payload.instance.type}`)({ id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address, [`${payload.instance.type}_input`]: { ...payload.entry } }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal.kind })
          } else {
            commit('updateEntry', { instance: payload.instance, base: payload.base, data: payload.entry })
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
