import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    profiles: [],
    instances: [
      {
        instance: 'c8655cb3-76de-4c04-8a06-b232f7c2683e',
        baseEvents: [
          {
            base: 'PartEditor',
            events: [
              {
                id: 'PartEditor1',
                content: 'Content for Event 1'
              },
              {
                id: 'PartEditor2',
                content: 'Content for Event 2'
              }
            ]
          }
        ]
      }
    ],
    baseEvents: [
      {
        base: 'PartEditor',
        events: [
          {
            id: 'PartEditor1',
            content: 'Content for Event 1'
          },
          {
            id: 'PartEditor2',
            content: 'Content for Event 2'
          }
        ]
      }
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createEvent (state, payload) {
      const base = state.baseEvents.find(b => b.base === payload.base)
      if (base) {
        base.events = base.events.filter(n => n.id !== 'new')
        base.events.splice(0, 0, payload.data)
      } else {
        state.baseEvents.push((payload))
      }
    },
    updateEvent (state, payload) {
      const base = state.baseEvents.find(e => e.base === payload.base)
      if (!base) {
        state.baseEvents.push(payload)
      } else {
        const updatedEvents = base.events.map(event => {
          if (event.id === payload.data.id) {
            return Object.assign({}, event, payload.data)
          }
          return event
        })
        state.baseEvents.find(e => e.base === payload.base).events = updatedEvents
      }
    },
    deleteEvent (state, payload) {
      console.log(state, payload)
      const base = state.baseEvents.find(b => b.base === payload.base)
      if (base) {
        state.baseEvents.find(e => e.base === payload.base).events = base.events.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setEventsList (state, payload) {
      const base = state.baseEvents.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.events = payload.events
      } else {
        state.baseEvents.push(payload)
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
    listEvents: state => (base) => {
      const baseEvent = state.baseEvents.find(n => n.base === base)
      if (baseEvent) {
        return baseEvent.events.sort((a, b) => {
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
    order: ({ state, commit, rootState }, payload) => {
      commit('setEventsList', { base: payload.base, events: payload.events })
      payload.events.forEach(event => {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'update_event')({ id: event.id, created_at: event.createdAt, address: event.address, event_input: { uuid: event.uuid, title: event.title, content: event.content, order: event.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateEvent', { base: payload.base, data: res.Ok })
            }
          })
        })
      })
    },
    rebase: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'rebase_event')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    agentAddress: ({ state, commit, rootState, dispatch }) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'agent_address')({ }).then((result) => {
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
    sendMessage: ({ state, commit, rootState }, message) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'send_message')({ message: message }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
        })
      })
    },
    fetchProfiles: ({ state, commit, rootState, dispatch }) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'list_profiles')({ base: '' }).then((result) => {
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
            dispatch('friends/profiles', { profiles: friends }, { root: true })
            console.log(rootState.friends.friends)
          }
        })
      })
    },
    fetchEvents: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome(base.instanceId, 'events', 'list_events')({ base: base.base }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setEventsList', { base: base.base, events: res.Ok })
          }
        })
      })
    },
    saveEvent: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.event.id === 'new' || payload.event.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'create_event')({ base: payload.base, event_input: { uuid: uuidv4(), title: payload.event.title, content: payload.event.content, order: payload.event.order } }).then((result) => {
            const res = JSON.parse(result)
            console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createEvent', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'update_event')({ id: payload.event.id, created_at: payload.event.createdAt, address: payload.event.address, event_input: { uuid: payload.event.uuid, title: payload.event.title, content: payload.event.content, order: payload.event.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateEvent', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteEvent: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('0d765fcf-118f-4122-8f03-f5f9ba74e7fa', 'events', 'delete_event')({ base: payload.base, id: payload.event.id, created_at: payload.event.createdAt, address: payload.event.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteEvent', { base: payload.base, data: payload.event.id })
          }
        })
      })
    }
  }
}
