import { v4 as uuidv4 } from 'uuid'
const fs = require('fs')
// function base64Encode (file) {
//   var bitmap = fs.readFileSync(file)
//   return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
// }
export default {
  namespaced: true,
  state: {
    entries: {},
    errors: {}
  },
  mutations: {
    createEntry (state, payload) {
      const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === 'new' || n.id === payload.data.id)
      Object.assign(entry, payload.data)
    },
    updateEntry (state, payload) {
      // const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === payload.data.id)
      // Object.assign(entry, payload.data)
    },
    updateEntryReceiver (state, payload) {
      console.log('updateEntryReceiver Mutation')
      // const entry = state.entries[`${payload.instance.instanceId}${payload.base}`].find(n => n.id === payload.data.id)
      // Object.assign(entry, payload.data)
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
    order: ({ state, commit, rootState }, payload) => {
      commit('setList', { instance: payload.instance, base: payload.base, entries: payload.entries })
      payload.entries.forEach(entry => {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instance.instanceId, payload.instance.zome, `update_${payload.instance.type}`)({ id: entry.id, created_at: entry.createdAt, address: entry.address, [`${payload.instance.type}_input`]: { ...entry } }).then((result) => {
            const res = JSON.parse(result)
            console.log(res)
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
        callZome(payload.instance.instanceId, payload.instance.zome, `rebase_${payload.instance.type}`)({ base_from: payload.entry.from, base_to: payload.entry.to, id: payload.entry.id, created_at: payload.entry.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
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
      payload.entry.uuid = uuidv4()
      // fs.writeFileSync(`${rootState.auth.developer.folder}/project.json`, JSON.stringify(payload.entry), (err) => {
      //   if (err) throw err
      //   console.log('The project has been serialised!')
      // })
      // rootState.holochainConnection.then(({ callZome }) => {
      //   callZome(payload.instance.instanceId, payload.instance.zome, `create_${payload.instance.type}`)({ base: payload.base, [`${payload.instance.type}_input`]: { ...payload.entry } }).then((result) => {
      //     const res = JSON.parse(result)
      //     console.log(res)
      //     if (res.Ok === undefined) {
      //       commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal })
      //     } else {
      //       commit('createEntry', { instance: payload.instance, base: payload.base, data: res.Ok })
      //     }
      //   })
      // })
    },
    updateEntry: ({ state, commit, rootState }, payload) => {
      commit('updateEntry', { instance: payload.instance, base: payload.base, data: payload.entry })
      fs.writeFileSync(`${rootState.auth.developer.folder}/project.json`, JSON.stringify(payload.entry), (err) => {
        if (err) {
          commit('error', { instance: payload.instance, base: payload.base, error: err })
        } else {
          commit('updateEntry', { instance: payload.instance, base: payload.base, data: payload.entry })
        }
      })
      // rootState.holochainConnection.then(({ callZome }) => {
      //   callZome(payload.instance.instanceId, payload.instance.zome, `update_${payload.instance.type}`)({ id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address, [`${payload.instance.type}_input`]: { ...payload.entry } }).then((result) => {
      //     const res = JSON.parse(result)
      //     console.log(res)
      //     if (res.Ok === undefined) {
      //       commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal.kind })
      //     }
      //   })
      // })
    },
    updateEntryReceiver: ({ state, commit, rootState }, payload) => {
      // commit('updateEntryReceiver', { instanceId: payload.instanceId, base: '', data: payload.entry })
      fs.writeFileSync(`${rootState.auth.developer.folder}/project.json`, JSON.stringify(payload.entry), (err) => {
        if (err) {
          commit('error', { instance: payload.instance, base: payload.base, error: err })
        } else {
          commit('updateEntryReceiver', { instanceId: payload.instanceId, base: '', data: payload.entry })
        }
      })
      // rootState.holochainConnection.then(({ callZome }) => {
      //   callZome(payload.instance.instanceId, payload.instance.zome, `update_${payload.instance.type}`)({ id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address, [`${payload.instance.type}_input`]: { ...payload.entry } }).then((result) => {
      //     const res = JSON.parse(result)
      //     console.log(res)
      //     if (res.Ok === undefined) {
      //       commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal.kind })
      //     }
      //   })
      // })
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
