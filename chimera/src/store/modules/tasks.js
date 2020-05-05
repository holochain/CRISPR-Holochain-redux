export default {
  namespaced: true,
  state: {
    featured: [],
    baseTasks: [
      {
        base: 'PartEditor',
        tasks: [
          {
            id: 'QmhashTask1',
            done: true,
            title: 'Demo Task 1'
          },
          {
            id: 'QmhashTask2',
            done: false,
            title: 'Demo Task 2'
          }
        ]
      }
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createTask (state, payload) {
      const base = state.baseTasks.find(b => b.base === payload.base)
      console.log(base)
      if (base) {
        base.tasks.push(payload.data)
      } else {
        state.baseTasks.push((payload))
      }
    },
    updateTask (state, payload) {
      const base = state.baseTasks.find(e => e.base === payload.base)
      if (!base) {
        state.baseTasks.push(payload)
      } else {
        const updatedTasks = base.tasks.map(task => {
          if (task.id === payload.data.id) {
            return Object.assign({}, task, payload.data)
          }
          return task
        })
        state.baseTasks.find(e => e.base === payload.base).tasks = updatedTasks
      }
    },
    deleteTask (state, payload) {
      console.log(state, payload)
      const base = state.baseTasks.find(b => b.base === payload.base)
      if (base) {
        state.baseTasks.find(e => e.base === payload.base).tasks = base.tasks.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setTasksList (state, payload) {
      const base = state.baseTasks.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.tasks = payload.tasks
      } else {
        state.baseTasks.push(payload)
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
    listTasks: state => (base) => {
      const baseTask = state.baseTasks.find(n => n.base === base)
      if (baseTask) {
        return baseTask.tasks
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
    fetchTasks: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('tasks', 'tasks', 'list_tasks')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setTasksList', { base: base, tasks: res.Ok })
          }
        })
      })
    },
    saveTask: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.task.id === '' || payload.task.id === undefined) {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('tasks', 'tasks', 'create_task')({ base: payload.base, task_input: { title: payload.task.title, done: payload.task.done } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(payload, res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createTask', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('tasks', 'tasks', 'update_task')({ id: payload.task.id, created_at: payload.task.createdAt, address: payload.task.address, task_input: { title: payload.task.title, done: payload.task.done } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateTask', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteTask: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('tasks', 'tasks', 'delete_task')({ base: payload.base, id: payload.task.id, created_at: payload.task.createdAt, address: payload.task.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteTask', { base: payload.base, data: payload.task.id })
          }
        })
      })
    }
  }
}
