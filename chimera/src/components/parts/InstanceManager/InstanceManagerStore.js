import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    profiles: [],
    baseInstances: [
      {
        base: 'Freckles',
        instances: [
          {
            id: 'QmFrecklesEditor',
            zome: 'freckles',
            type: 'freckle',
            instanceId: '41553681-4c82-4c8c-87bb-ae2a3d2ba4cc',
            instanceName: 'Part Editor',
            entry: {
              content: ''
            }
          },
          {
            id: 'QmFreckles1',
            zome: 'freckles',
            type: 'freckle',
            instanceId: '0d765fcf-118f-4122-8f03-f5f9ba74e7fa',
            instanceName: 'Phil\'s Freckles',
            entry: {
              content: ''
            }
          },
          {
            id: 'QmFreckles2',
            zome: 'freckles',
            type: 'freckle',
            instanceId: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce',
            instanceName: 'My Friends Freckles',
            entry: {
              content: ''
            }
          }
        ]
      },
      {
        base: 'Origins',
        instances: [
          {
            id: 'QmOriginsEditor',
            zome: 'origins',
            type: 'origin',
            instanceId: '6261170b-2064-4920-be43-98cc7ca1d68b',
            instanceName: 'Part Editor',
            entry: {
              content: ''
            }
          },
          {
            id: 'QmOrigins1',
            zome: 'origins',
            type: 'origin',
            instanceId: '57c01ed8-30ae-4fca-b6f9-40192821fed2',
            instanceName: 'Broadcast Origins',
            entry: {
              content: ''
            }
          },
          {
            id: 'QmOrigins2',
            zome: 'origins',
            type: 'origin',
            instanceId: '164449a2-e7d4-47dc-acc8-2fe317b8d9fe',
            instanceName: 'Mates',
            entry: {
              content: ''
            }
          }
        ]
      },
      {
        base: 'CRISPR',
        instances: [
          {
            id: 'QmProjects1',
            zome: 'projects',
            type: 'project',
            instanceId: 'ef5ba968-0048-4135-b831-a86b615a89b2',
            instanceName: 'Holochain Projects'
          },
          {
            id: 'QmProjects2',
            zome: 'projects',
            type: 'project',
            instanceId: '01526dbb-17f7-42d4-8a26-01270b50eb73',
            instanceName: 'Client Projects'
          },
          {
            id: 'QmProjects3',
            zome: 'projects',
            type: 'project',
            instanceId: '15f5c748-e611-47c7-9d1b-7651e5c16d17',
            instanceName: 'Personal Projects'
          }
        ]
      },
      {
        base: 'Kanban',
        instances: [
          {
            id: 'QmOkb1',
            zome: 'kanban',
            type: 'column',
            instanceId: '95569e2e-0de2-4073-8a7d-579f87534c04',
            instanceName: 'Holochain Projects Kanban Boards',
            entry: {
              title: '',
              order: 0
            }
          },
          {
            id: 'QmOkb2',
            zome: 'kanban',
            type: 'column',
            instanceId: '68342fe4-c2e3-4568-836e-421722757c84',
            instanceName: 'Personal Projects Kanban Boards',
            entry: {
              title: '',
              order: 0
            }
          }
        ]
      },
      {
        base: 'Notes',
        instances: [
          {
            id: 'QmNo1',
            zome: 'notes',
            type: 'note',
            instanceId: '6025b761-26e0-42c2-ad96-8bdc1ce00c33',
            instanceName: 'Personal Projects Notes',
            entry: {
              title: '',
              content: ''
            }
          },
          {
            id: 'QmONo2',
            zome: 'notes',
            type: 'note',
            instanceId: 'a23de7fe-bff7-4e6e-87f0-f4c44d038888',
            instanceName: 'Holochain Projects Notes',
            entry: {
              title: '',
              content: ''
            }
          }
        ]
      },
      {
        base: 'Tasks',
        instances: [
          {
            id: 'Qmtaskb1',
            zome: 'tasks',
            type: 'task',
            instanceId: 'e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a',
            instanceName: 'Holochain Projects Tasks'
          },
          {
            id: 'Qmtaskb2',
            zome: 'tasks',
            type: 'task',
            instanceId: '1b94be13-632b-4924-aa20-8f67113d7b9a',
            instanceName: 'Personal Projects Tasks'
          }
        ]
      },
      {
        base: 'Knowledge Base',
        instances: [
          {
            id: 'QmKnowledgeBase1',
            zome: 'projects',
            type: 'project',
            instanceId: 'ChimeraKnowledgeBase',
            instanceName: 'Chimera Knowledge Base'
          }
        ]
      },
      {
        base: 'Tags',
        instances: [
          {
            id: 'Qmtag1',
            zome: 'tags',
            type: 'tag',
            instanceId: '4b7641fe-145d-4217-9768-1e0bff70fdf5',
            instanceName: 'Chimera Tags'
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
        return baseInstance.instances.filter(n => n.instanceName !== 'Part Editor')
      } else {
        return []
      }
    },
    partEditorInstance: state => (base) => {
      const baseInstance = state.baseInstances.find(n => n.base === base)
      if (baseInstance) {
        return baseInstance.instances.find(n => n.instanceName === 'Part Editor')
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
