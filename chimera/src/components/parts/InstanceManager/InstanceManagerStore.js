import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    profiles: [],
    baseInstances: [
      {
        base: 'PartEditor',
        instances: [
          {
            id: 'PartEditor1',
            content: 'Content for Instance 1'
          },
          {
            id: 'PartEditor2',
            content: 'Content for Instance 2'
          },
          {
            id: 'PartEditor3',
            content: 'Content for Instance 3'
          }
        ]
      },
      {
        base: 'Freckles',
        instances: [
          {
            id: 'QmFreckles1',
            instanceId: '0d765fcf-118f-4122-8f03-f5f9ba74e7fa',
            instanceName: 'Phil\'s Freckles'
          },
          {
            id: 'QmFreckles2',
            instanceId: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce',
            instanceName: 'My Friends Freckles'
          }
        ]
      },
      {
        base: 'Origins',
        instances: [
          {
            id: 'QmOrigins1',
            instanceId: '57c01ed8-30ae-4fca-b6f9-40192821fed2',
            instanceName: 'Broadcast Origins'
          },
          {
            id: 'QmOrigins2',
            instanceId: '164449a2-e7d4-47dc-acc8-2fe317b8d9fe',
            instanceName: 'Mates'
          }
        ]
      }
    ],
    errors: []
  },
  mutations: {
    createInstance (state, payload) {
      const base = state.baseInstances.find(b => b.base === payload.base)
      if (base) {
        base.instances = base.instances.filter(n => n.id !== 'new')
        base.instances.splice(0, 0, payload.data)
      } else {
        state.baseInstances.push((payload))
      }
    },
    updateInstance (state, payload) {
      const base = state.baseInstances.find(e => e.base === payload.base)
      if (!base) {
        state.baseInstances.push(payload)
      } else {
        const updatedInstances = base.instances.map(instance => {
          if (instance.id === payload.data.id) {
            return Object.assign({}, instance, payload.data)
          }
          return instance
        })
        state.baseInstances.find(e => e.base === payload.base).instances = updatedInstances
      }
    },
    deleteInstance (state, payload) {
      console.log(state, payload)
      const base = state.baseInstances.find(b => b.base === payload.base)
      if (base) {
        state.baseInstances.find(e => e.base === payload.base).instances = base.instances.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setInstancesList (state, payload) {
      const base = state.baseInstances.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.instances = payload.instances
      } else {
        state.baseInstances.push(payload)
      }
    }
  },
  getters: {
    listInstances: state => (base) => {
      const baseInstance = state.baseInstances.find(n => n.base === base)
      if (baseInstance) {
        return baseInstance.instances
      } else {
        return []
      }
    },
    getInstanceName: state => (instanceId) => {
      const result = state.baseInstances.reduce((arr, item) => arr.concat(item.instances), []).find(inst => inst.instance === instanceId)
      return result.name
    },
    listErrors: state => (base) => {
      const baseErrors = state.errors.filter(e => e.base === base)
      if (baseErrors) {
        return baseErrors.map(b => JSON.parse(b.error).kind)
      } else {
        return []
      }
    }
  },
  actions: {
    acknowledgeErrors: ({ state, commit, rootState }, base) => {
      commit('resetErrors', base)
    },
    // order: ({ state, commit, rootState }, payload) => {
    //   commit('setInstancesList', { base: payload.base, instances: payload.instances })
    //   payload.instances.forEach(instance => {
    //     rootState.holochainConnection.then(({ callZome }) => {
    //       callZome('instances', 'instances', 'update_instance')({ id: instance.id, created_at: instance.createdAt, address: instance.address, instance_input: { uuid: instance.uuid, content: instance.content } }).then((result) => {
    //         const res = JSON.parse(result)
    //         // console.log(res)
    //         if (res.Ok === undefined) {
    //           commit('error', { base: payload.base, error: res.Err.Internal })
    //         } else {
    //           commit('updateInstance', { base: payload.base, data: res.Ok })
    //         }
    //       })
    //     })
    //   })
    // },
    // rebase: ({ state, commit, rootState }, payload) => {
    //   rootState.holochainConnection.then(({ callZome }) => {
    //     callZome('instances', 'instances', 'rebase_instance')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
    //       const res = JSON.parse(result)
    //       console.log(res)
    //       if (res.Ok === undefined) {
    //         commit('error', { base: payload.base, error: res.Err.Internal })
    //       }
    //     })
    //   })
    // },
    agentAddress: ({ state, commit, rootState, dispatch }) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('instances', 'instances', 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('auth/agentAddress', { agentAddress: res.Ok }, { root: true })
            console.log(rootState.auth.agentAddress)
          }
        })
      })
    },
    fetchProfiles: ({ state, commit, rootState, dispatch }) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('instances', 'instances', 'list_profiles')({ base: '' }).then((result) => {
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
                  id: 10,
                  avatar: p.avatar,
                  name: ''
                },
                notifications: 0,
                value: 0,
                start: 0
              }
            })
            dispatch('friends/profiles', { profiles: friends }, { root: true })
          }
        })
      })
    },
    fetchInstances: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('instances', 'instances', 'list_instances')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setInstancesList', { base: base, instances: res.Ok })
          }
        })
      })
    },
    saveInstance: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.instance.id === 'new' || payload.instance.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('instances', 'instances', 'create_instance')({ base: payload.base, instance_input: { uuid: uuidv4(), content: payload.instance.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createInstance', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('instances', 'instances', 'update_instance')({ id: payload.instance.id, created_at: payload.instance.createdAt, address: payload.instance.address, instance_input: { uuid: payload.instance.uuid, content: payload.instance.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateInstance', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteInstance: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('instances', 'instances', 'delete_instance')({ base: payload.base, id: payload.instance.id, created_at: payload.instance.createdAt, address: payload.instance.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteInstance', { base: payload.base, data: payload.instance.id })
          }
        })
      })
    }
  }
}
