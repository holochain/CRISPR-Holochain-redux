import { v4 as uuidv4 } from 'uuid'
const fs = require('fs')
function base64Encode (file) {
  var bitmap = fs.readFileSync(file)
  return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}
export default {
  namespaced: true,
  state: {
    featured: [],
    baseProjects: [
      {
        base: 'PartEditor',
        projects: [
          {
            id: 'PartEditor1',
            happId: 'QmHashyOrigins',
            name: 'Origins',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Origins/preview.jpg'),
            description: 'Origins have a title, content and order.',
            zome: {
              template: 'Origins',
              templateTypeName: 'origin',
              itemsTemplatesName: 'template1',
              name: 'Origins',
              entryTypes: [
                {
                  id: 'QmOriginEntryTypeHash',
                  name: 'origin',
                  template: 'list_anchor_types_1',
                  fields: [
                    {
                      id: 'QM234566777887',
                      fieldName: 'content',
                      fieldType: 'String',
                      fieldDescription: 'Main body of the origin',
                      required: false
                    }
                  ]
                }
              ],
              anchorTypes: [
                {
                  id: 'Qmlist_origins1',
                  type: 'list_origins',
                  text: '',
                  tag: ' ',
                  context: 'permanent',
                  links: [
                    {
                      entityId: 'QmOriginEntryTypeHash',
                      type: 'origin_link',
                      tag: 'created_at',
                      context: 'exclusive'
                    }
                  ],
                  anchors: []
                }
              ],
              profileSpec: {
                id: 'QmOriginProfileSpecHash',
                template: 'identify',
                fields: []
              }
            }
          },
          {
            id: 'PartEditor2',
            name: 'Projects',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Projects/preview.png'),
            description: 'Projects',
            zome: {
              template: 'Origins',
              templateTypeName: 'origin',
              itemsTemplatesName: 'template1',
              name: 'Projects',
              entryTypes: [
                {
                  id: 'QmProjectEntryTypeHash',
                  name: 'project',
                  template: 'list_anchor_types_1',
                  fields: [
                    {
                      id: 'Qm1333',
                      fieldName: 'name',
                      fieldType: 'String',
                      fieldDescription: 'Title of the project',
                      required: true
                    },
                    {
                      id: 'QM234566777887',
                      fieldName: 'description',
                      fieldType: 'String',
                      fieldDescription: 'What new characteristics are you giving your clone?',
                      required: false
                    },
                    {
                      id: 'QM234566777887',
                      fieldName: 'preview',
                      fieldType: 'String',
                      fieldDescription: 'Image for the project',
                      required: false
                    },
                    {
                      id: 'QM2345667778871',
                      fieldName: 'order',
                      fieldType: 'u32',
                      fieldDescription: '',
                      required: false
                    }
                  ]
                }
              ],
              anchorTypes: [
                {
                  id: 'Qmlist_projects1',
                  type: 'list_projects',
                  text: '',
                  tag: ' ',
                  context: 'permanent',
                  links: [],
                  anchors: [
                    {
                      id: 'Qmlist_Qmhashproject1',
                      type: 'list_projects',
                      text: 'Parts',
                      links: [
                        {
                          entityId: 'QmProjectEntryTypeHash',
                          type: 'project_link',
                          tag: ' ',
                          context: 'exclusive'
                        }
                      ]
                    },
                    {
                      id: 'Qmlist_Qmhashproject2',
                      type: 'list_projects',
                      text: 'Applications',
                      links: [
                        {
                          entityId: 'QmProjectEntryTypeHash',
                          type: 'project_link',
                          tag: ' ',
                          context: 'exclusive'
                        }
                      ]
                    }
                  ]
                }
              ],
              profileSpec: {
                id: 'QmKanbanProfileSpecHash',
                template: 'identify',
                fields: []
              }
            }
          }
        ]
      }
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createProject (state, payload) {
      const base = state.baseProjects.find(b => b.base === payload.base)
      payload.data.zome = Object.assign({}, JSON.parse(payload.data.zome))
      payload.data.preview = base64Encode(payload.data.preview)
      if (base) {
        base.projects = base.projects.filter(n => n.id !== 'new')
        base.projects.splice(0, 0, payload.data)
      } else {
        state.baseProjects.push((payload))
      }
    },
    updateProject (state, payload) {
      const base = state.baseProjects.find(e => e.base === payload.base)
      if (!base) {
        state.baseProjects.push(payload)
      } else {
        const updatedProjects = base.projects.map(project => {
          if (project.id === payload.data.id) {
            return Object.assign({}, project, payload.data)
          }
          return project
        })
        state.baseProjects.find(e => e.base === payload.base).projects = updatedProjects
      }
    },
    deleteProject (state, payload) {
      console.log(state, payload)
      const base = state.baseProjects.find(b => b.base === payload.base)
      if (base) {
        state.baseProjects.find(e => e.base === payload.base).projects = base.projects.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setProjectsList (state, payload) {
      const base = state.baseProjects.find(b => b.base === payload.base)
      payload.projects.forEach(p => {
        p.zome = Object.assign({}, JSON.parse(p.zome))
        p.preview = base64Encode(p.preview)
      })
      if (base !== undefined) {
        base.projects = payload.projects
      } else {
        state.baseProjects.push(payload)
      }
    }
  },
  getters: {
    featured: (state, getters) => {
      return getters.parsedGames.sort((a, b) => {
        if (a.updated < b.updated) return -1
        if (a.updated > b.updated) return 1
        return 0
      }).slice(0, 3)
    },
    listProjects: state => (base) => {
      const baseProject = state.baseProjects.find(n => n.base === base)
      if (baseProject) {
        return baseProject.projects.sort((a, b) => {
          if (a.order < b.order) return -1
          if (a.order > b.order) return 1
          return 0
        })
      } else {
        return []
      }
    },
    listErrors: state => (base) => {
      const baseErrors = state.errors.filter(e => e.base === base)
      if (baseErrors) {
        return baseErrors.map(b => JSON.parse(b.error).kind)
      } else {
        return []
      }
    },
    projectById: (state) => (projectId) => {
      const base = state.baseProjects.find((base) => {
        return base.projects.some((project) => {
          return project.id === projectId
        })
      })
      const project = base.projects.find(project => project.id === projectId)
      console.log(project)
      return project
    }
  },
  actions: {
    acknowledgeErrors: ({ state, commit, rootState }, base) => {
      commit('resetErrors', base)
    },
    order: ({ state, commit, rootState }, payload) => {
      commit('setProjectsList', { base: payload.base, projects: payload.projects })
      payload.projects.forEach(project => {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('projects', 'projects', 'update_project')({ id: project.id, created_at: project.createdAt, address: project.address, project_input: { uuid: project.uuid, title: project.title, content: project.content, order: project.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateProject', { base: payload.base, data: res.Ok })
            }
          })
        })
      })
    },
    rebase: ({ state, commit, rootState }, payload) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('projects', 'projects', 'rebase_project')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    fetchProjects: ({ state, commit, rootState }, base) => {
      // alert(JSON.stringify(state.baseProjects[0].projects[0].zome))
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('projects', 'projects', 'list_projects')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setProjectsList', { base: base, projects: res.Ok })
          }
        })
      })
    },
    saveProject: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.project.id === 'new' || payload.project.id === undefined) {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('projects', 'projects', 'create_project')({ base: payload.base, project_input: { uuid: uuidv4(), name: payload.project.name, description: payload.project.description, preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Origins/preview.png', zome: JSON.stringify(payload.project.zome), order: 0 } }).then((result) => {
            const res = JSON.parse(result)
            console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createProject', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('projects', 'projects', 'update_project')({ id: payload.project.id, created_at: payload.project.createdAt, address: payload.project.address, project_input: { uuid: payload.project.uuid, name: payload.project.name, description: payload.project.description, preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Origins/preview.png', zome: JSON.stringify(payload.project.zome), order: payload.project.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateProject', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteProject: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('projects', 'projects', 'delete_project')({ base: payload.base, id: payload.project.id, created_at: payload.project.createdAt, address: payload.project.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteProject', { base: payload.base, data: payload.project.id })
          }
        })
      })
    }
  }
}
