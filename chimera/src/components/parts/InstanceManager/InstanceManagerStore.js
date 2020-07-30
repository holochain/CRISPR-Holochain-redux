export default {
  namespaced: true,
  state: {
    profiles: [],
    baseInstances: [
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
            instanceName: 'Ideas',
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
            id: 'QmNotesEditor',
            zome: 'notes',
            type: 'note',
            instanceId: '8239b37b-5b69-43cd-aa2c-28b1054aef20',
            instanceName: 'Part Editor',
            entry: {
              title: '',
              content: ''
            }
          },
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
            id: 'Qmtaskb0',
            zome: 'tasks',
            type: 'task',
            instanceId: 'c74e9c11-eb79-4459-a187-39ef459a008b',
            instanceName: 'Part Editor',
            entry: {
              title: '',
              done: false
            }
          },
          {
            id: 'Qmtaskb1',
            zome: 'tasks',
            type: 'task',
            instanceId: 'e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a',
            instanceName: 'Holochain Projects Tasks',
            entry: {
              title: '',
              done: false
            }
          },
          {
            id: 'Qmtaskb2',
            zome: 'tasks',
            type: 'task',
            instanceId: '1b94be13-632b-4924-aa20-8f67113d7b9a',
            instanceName: 'Personal Projects Tasks',
            entry: {
              title: '',
              done: false
            }
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
            instanceId: '2b3a7e5a-739e-427e-9f38-6992758e0552',
            instanceName: 'Part Editor',
            entry: {
              title: '',
              done: false
            }
          },
          {
            id: 'Qmtag1',
            zome: 'tags',
            type: 'tag',
            instanceId: '4b7641fe-145d-4217-9768-1e0bff70fdf5',
            instanceName: 'Chimera Tags'
          }
        ]
      },
      {
        base: 'Events',
        instances: [
          {
            id: 'QmEventsEditor',
            zome: 'events',
            type: 'events',
            instanceId: '45a3baa3-03a1-4873-a781-37f27413cc5b',
            instanceName: 'Part Editor',
            entry: {
              content: ''
            }
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
        base.instances.splice(0, 0, payload.instance)
      } else {
        state.baseInstances.push({
          base: payload.base,
          instances: [payload.instance]
        })
      }
      console.log(state)
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
        return undefined
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
  }
}
