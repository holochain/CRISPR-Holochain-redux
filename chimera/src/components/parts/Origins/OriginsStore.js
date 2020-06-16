import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    profiles: [],
    instances: [],
    baseOrigins: [
      {
        base: 'PartEditor',
        origins: [
          {
            id: 'PartEditor1',
            content: 'Content for Origin 1'
          },
          {
            id: 'PartEditor2',
            content: 'Content for Origin 2'
          },
          {
            id: 'PartEditor3',
            content: 'Content for Origin 3'
          }
        ]
      }
    ],
    errors: []
  },
  mutations: {
    createOrigin (state, payload) {
      const base = state.baseOrigins.find(b => b.base === payload.base)
      if (base) {
        base.origins = base.origins.filter(n => n.id !== 'new')
        base.origins.splice(0, 0, payload.data)
      } else {
        state.baseOrigins.push((payload))
      }
    },
    updateOrigin (state, payload) {
      const base = state.baseOrigins.find(e => e.base === payload.base)
      if (!base) {
        state.baseOrigins.push(payload)
      } else {
        const updatedOrigins = base.origins.map(origin => {
          if (origin.id === payload.data.id) {
            return Object.assign({}, origin, payload.data)
          }
          return origin
        })
        state.baseOrigins.find(e => e.base === payload.base).origins = updatedOrigins
      }
    },
    deleteOrigin (state, payload) {
      console.log(state, payload)
      const base = state.baseOrigins.find(b => b.base === payload.base)
      if (base) {
        state.baseOrigins.find(e => e.base === payload.base).origins = base.origins.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setOriginsList (state, payload) {
      state.instances = state.instances.filter(i => i.instanceId !== payload.instanceBase.instanceId)
      state.instances.push({ instanceId: payload.instanceBase.instanceId, baseOrigins: [{ base: payload.instanceBase.base, origins: payload.origins }] })
    }
  },
  getters: {
    latest: (state, getters) => {
      return getters.parsedGames.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return -1
        if (a.updatedAt > b.updatedAt) return 1
        return 0
      }).slice(0, 3)
    },
    listOrigins: state => (base) => {
      const instance = state.instances.find(i => i.instanceId === base.instanceId)
      if (instance) {
        const baseOrigin = instance.baseOrigins.find(n => n.base === base.base)
        if (baseOrigin) {
          return baseOrigin.origins
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
    agentAddress: ({ state, commit, rootState, dispatch }, instanceId) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceId, 'origins', 'agent_address')({ }).then((result) => {
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
    fetchProfiles: ({ state, commit, rootState, dispatch }, instanceBase) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceBase.instanceId, 'origins', 'list_profiles')({ base: '' }).then((result) => {
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
    fetchOrigins: ({ state, commit, rootState }, instanceBase) => {
      if (instanceBase.instanceId === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(instanceBase.instanceId, 'origins', 'list_origins')({ base: instanceBase.base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setOriginsList', { instanceBase: instanceBase, origins: res.Ok })
          }
        })
      })
    },
    saveOrigin: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.origin.id === 'new' || payload.origin.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('origins', 'origins', 'create_origin')({ base: payload.base, origin_input: { uuid: uuidv4(), content: payload.origin.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createOrigin', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('origins', 'origins', 'update_origin')({ id: payload.origin.id, created_at: payload.origin.createdAt, address: payload.origin.address, origin_input: { uuid: payload.origin.uuid, content: payload.origin.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateOrigin', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteOrigin: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('origins', 'origins', 'delete_origin')({ base: payload.base, id: payload.origin.id, created_at: payload.origin.createdAt, address: payload.origin.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteOrigin', { base: payload.base, data: payload.origin.id })
          }
        })
      })
    }
  }
}
