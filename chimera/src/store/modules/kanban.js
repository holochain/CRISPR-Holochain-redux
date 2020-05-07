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
            id: 'PartEditor',
            title: 'Dos   ',
            order: 1
          },
          {
            id: 'PartEditor',
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
      // console.log(state)
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
    fetchColumns: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('columns', 'columns', 'list_columns')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
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
          callZome('columns', 'columns', 'create_column')({ base: payload.base, column_input: { uuid: uuidv4(), title: payload.column.title, order: payload.column.order } }).then((result) => {
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
          callZome('columns', 'columns', 'update_column')({ id: payload.column.id, created_at: payload.column.createdAt, address: payload.column.address, column_input: { uuid: payload.column.uuid, title: payload.column.title, order: payload.column.order } }).then((result) => {
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
        callZome('columns', 'columns', 'delete_column')({ base: payload.base, id: payload.column.id, created_at: payload.column.createdAt, address: payload.column.address }).then((result) => {
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
