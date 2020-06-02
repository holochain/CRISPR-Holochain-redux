import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    featured: [],
    baseColumns: [
      {
        base: 'PartEditor',
        columns: [
          {
            id: 'PartEditor1',
            title: 'Dos   ',
            order: 1
          },
          {
            id: 'PartEditor2',
            title: 'Done',
            order: 3
          }
        ]
      }
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createColumn (state, payload) {
      const base = state.baseColumns.find(b => b.base === payload.base)
      if (base) {
        base.columns.push(payload.data)
      } else {
        state.baseColumns.push((payload))
      }
    },
    updateColumn (state, payload) {
      const base = state.baseColumns.find(e => e.base === payload.base)
      if (!base) {
        state.baseColumns.push(payload)
      } else {
        const updatedColumns = base.columns.map(column => {
          if (column.id === payload.data.id) {
            return Object.assign({}, column, payload.data)
          }
          return column
        })
        state.baseColumns.find(e => e.base === payload.base).columns = updatedColumns
      }
    },
    deleteColumn (state, payload) {
      console.log(state, payload)
      const base = state.baseColumns.find(b => b.base === payload.base)
      if (base) {
        state.baseColumns.find(e => e.base === payload.base).columns = base.columns.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setColumnsList (state, payload) {
      const base = state.baseColumns.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.columns = payload.columns
      } else {
        state.baseColumns.push(payload)
      }
    }
  },
  getters: {
    listColumns: state => (base) => {
      const baseColumn = state.baseColumns.find(n => n.base === base)
      if (baseColumn) {
        return baseColumn.columns.sort((a, b) => {
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
    }
  },
  actions: {
    acknowledgeErrors: ({ state, commit, rootState }, base) => {
      commit('resetErrors', base)
    },
    agentAddress: ({ state, commit, rootState, dispatch }) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('kanban', 'kanban', 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
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
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('kanban', 'kanban', 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          console.log(res.Ok)
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
            console.log(rootState.auth.agentAddress)
            // const friendList = friends.filter(f => f.agentAddress !== rootState.auth.agentAddress)
            console.log(friends)
            dispatch('friends/profiles', { profiles: friends }, { root: true })
            console.log(rootState.friends.friends)
          }
        })
      })
    },
    fetchColumns: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('kanban', 'kanban', 'list_columns')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setColumnsList', { base: base, columns: res.Ok })
          }
        })
      })
    },
    saveColumn: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.column.id === '' || payload.column.id === undefined) {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('kanban', 'kanban', 'create_column')({ base: payload.base, column_input: { uuid: uuidv4(), title: payload.column.title, order: payload.column.order } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createColumn', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('kanban', 'kanban', 'update_column')({ id: payload.column.id, created_at: payload.column.createdAt, address: payload.column.address, column_input: { uuid: payload.column.uuid, title: payload.column.title, order: payload.column.order } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateColumn', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteColumn: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('kanban', 'kanban', 'delete_column')({ base: payload.base, id: payload.column.id, created_at: payload.column.createdAt, address: payload.column.address }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { base: payload.column.id, error: res.Err.Internal })
          } else {
            commit('deleteColumn', { base: payload.base, data: payload.column.id })
          }
        })
      })
    }
  }
}
