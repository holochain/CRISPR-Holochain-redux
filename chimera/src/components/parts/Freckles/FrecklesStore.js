import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    profiles: [],
    instances: [],
    baseFreckles: [
      {
        base: 'PartEditor',
        freckles: [
          {
            id: 'PartEditor1',
            content: 'Content for Freckle 1'
          },
          {
            id: 'PartEditor2',
            content: 'Content for Freckle 2'
          }
        ]
      }
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createFreckle (state, payload) {
      const base = state.baseFreckles.find(b => b.base === payload.base)
      if (base) {
        base.freckles = base.freckles.filter(n => n.id !== 'new')
        base.freckles.splice(0, 0, payload.data)
      } else {
        state.baseFreckles.push((payload))
      }
    },
    updateFreckle (state, payload) {
      const base = state.baseFreckles.find(e => e.base === payload.base)
      if (!base) {
        state.baseFreckles.push(payload)
      } else {
        const updatedFreckles = base.freckles.map(freckle => {
          if (freckle.id === payload.data.id) {
            return Object.assign({}, freckle, payload.data)
          }
          return freckle
        })
        state.baseFreckles.find(e => e.base === payload.base).freckles = updatedFreckles
      }
    },
    deleteFreckle (state, payload) {
      console.log(state, payload)
      const base = state.baseFreckles.find(b => b.base === payload.base)
      if (base) {
        state.baseFreckles.find(e => e.base === payload.base).freckles = base.freckles.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setFrecklesList (state, payload) {
      const instance = state.instances.find(i => i.instanceId === payload.instanceBase.instanceId)
      if (instance) {
        const base = instance.baseFreckles.find(b => b.base === payload.instanceBase.base)
        if (base !== undefined) {
          base.freckles = payload.freckles
        } else {
          instance.baseFreckles.push({ base: payload.instanceBase.base, freckles: payload.freckles })
        }
      } else {
        state.instances.push({ instanceId: payload.instanceBase.instanceId, baseFreckles: [{ base: payload.instanceBase.base, freckles: payload.freckles }] })
      }
    }
  },
  getters: {
    listFreckles: state => (base) => {
      const instance = state.instances.find(i => i.instanceId === base.instanceId)
      if (instance) {
        const baseFreckle = instance.baseFreckles.find(n => n.base === base.base)
        if (baseFreckle) {
          return baseFreckle.freckles.sort((a, b) => {
            if (a.order < b.order) return -1
            if (a.order > b.order) return 1
            return 0
          })
        } else {
          return []
        }
      } else {
        return []
      }
    },
    listErrors: state => (base) => {
      const instance = state.instances.find(i => i.instanceId === base.instanceId)
      if (instance) {
        const baseErrors = state.errors.filter(e => e.base === base)
        if (baseErrors) {
          return baseErrors.map(b => JSON.parse(b.error).kind)
        } else {
          return []
        }
      } else {
        return []
      }
    }
  },
  actions: {
    acknowledgeErrors: ({ state, commit, rootState }, base) => {
      commit('resetErrors', base)
    },
    order: ({ state, commit, rootState }, payload) => {
      commit('setFrecklesList', { base: payload.base, freckles: payload.freckles })
      payload.freckles.forEach(freckle => {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'freckles', 'update_freckle')({ id: freckle.id, created_at: freckle.createdAt, address: freckle.address, freckle_input: { uuid: freckle.uuid, title: freckle.title, content: freckle.content, order: freckle.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateFreckle', { base: payload.base, data: res.Ok })
            }
          })
        })
      })
    },
    rebase: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'freckles', 'rebase_freckle')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    agentAddress: ({ state, commit, rootState, dispatch }, instanceId) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceId, 'freckles', 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('auth/agentAddress', { instanceId: instanceId, agentAddress: res.Ok }, { root: true })
          }
        })
      })
    },
    // sendMessage: ({ state, commit, rootState }, message) => {
    //   rootState.holochainConnection.then(({ callZome }) => {
    //     callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'freckles', 'send_message')({ message: message }).then((result) => {
    //       const res = JSON.parse(result)
    //       console.log(res)
    //     })
    //   })
    // },
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
            commit('setFrecklesList', { instanceBase: instanceBase, freckles: res.Ok })
          }
        })
      })
    },
    saveFreckle: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.freckle.id === 'new' || payload.freckle.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instanceId, 'freckles', 'create_freckle')({ base: payload.base, freckle_input: { uuid: uuidv4(), title: payload.freckle.title, content: payload.freckle.content, order: payload.freckle.order } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
            } else {
              commit('createFreckle', { instanceId: payload.instanceId, base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome(payload.instanceId, 'freckles', 'update_freckle')({ id: payload.freckle.id, created_at: payload.freckle.createdAt, address: payload.freckle.address, freckle_input: { uuid: payload.freckle.uuid, title: payload.freckle.title, content: payload.freckle.content, order: payload.freckle.order } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateFreckle', { instanceId: payload.instanceId, base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteFreckle: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(payload.instanceId, 'freckles', 'delete_freckle')({ base: payload.base, id: payload.freckle.id, created_at: payload.freckle.createdAt, address: payload.freckle.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { instanceId: payload.instanceId, base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteFreckle', { instanceId: payload.instanceId, base: payload.base, data: payload.freckle.id })
          }
        })
      })
    }
  }
}
