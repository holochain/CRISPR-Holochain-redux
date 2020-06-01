import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    featured: [],
    baseNotes: [
      {
        base: 'PartEditor',
        notes: [
          {
            id: 'PartEditor1',
            title: 'Demo Note 1',
            content: 'Content for Note 1',
            order: 1
          },
          {
            id: 'PartEditor2',
            title: 'Demo Note 2',
            content: 'Content for Note 2',
            order: 2
          }
        ]
      }
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createNote (state, payload) {
      const base = state.baseNotes.find(b => b.base === payload.base)
      if (base) {
        base.notes = base.notes.filter(n => n.id !== 'new')
        base.notes.splice(0, 0, payload.data)
      } else {
        state.baseNotes.push((payload))
      }
    },
    updateNote (state, payload) {
      const base = state.baseNotes.find(e => e.base === payload.base)
      if (!base) {
        state.baseNotes.push(payload)
      } else {
        const updatedNotes = base.notes.map(note => {
          if (note.id === payload.data.id) {
            return Object.assign({}, note, payload.data)
          }
          return note
        })
        state.baseNotes.find(e => e.base === payload.base).notes = updatedNotes
      }
    },
    deleteNote (state, payload) {
      console.log(state, payload)
      const base = state.baseNotes.find(b => b.base === payload.base)
      if (base) {
        state.baseNotes.find(e => e.base === payload.base).notes = base.notes.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setNotesList (state, payload) {
      const base = state.baseNotes.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.notes = payload.notes
      } else {
        state.baseNotes.push(payload)
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
    listNotes: state => (base) => {
      const baseNote = state.baseNotes.find(n => n.base === base)
      if (baseNote) {
        return baseNote.notes.sort((a, b) => {
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
      commit('setNotesList', { base: payload.base, notes: payload.notes })
      payload.notes.forEach(note => {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'update_note')({ id: note.id, created_at: note.createdAt, address: note.address, note_input: { uuid: note.uuid, title: note.title, content: note.content, order: note.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateNote', { base: payload.base, data: res.Ok })
            }
          })
        })
      })
    },
    rebase: ({ state, commit, rootState }, payload) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('notes', 'notes', 'rebase_note')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    fetchNotes: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('notes', 'notes', 'list_notes')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setNotesList', { base: base, notes: res.Ok })
          }
        })
      })
    },
    saveNote: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.note.id === 'new' || payload.note.id === undefined) {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'create_note')({ base: payload.base, note_input: { uuid: uuidv4(), title: payload.note.title, content: payload.note.content, order: payload.note.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createNote', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'update_note')({ id: payload.note.id, created_at: payload.note.createdAt, address: payload.note.address, note_input: { uuid: payload.note.uuid, title: payload.note.title, content: payload.note.content, order: payload.note.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateNote', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteNote: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('notes', 'notes', 'delete_note')({ base: payload.base, id: payload.note.id, created_at: payload.note.createdAt, address: payload.note.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteNote', { base: payload.base, data: payload.note.id })
          }
        })
      })
    }
  }
}
