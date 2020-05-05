export default {
  namespaced: true,
  state: {
    featured: [],
    baseNotes: [
      {
        base: 'PartEditor',
        notes: [
          {
            id: 'QmhashNote1',
            title: 'Demo Note 1',
            content: 'Content for Note 1'
          },
          {
            id: 'QmhashNote2',
            title: 'Demo Note 2',
            content: 'Content for Note 2'
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
        // base.notes.push(payload.data)
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
      // console.log(state)
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
        return baseNote.notes
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
    fetchNotes: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.holochainConnection.then(({ callZome }) => {
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
      if (payload.note.id === '' || payload.note.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'create_note')({ base: payload.base, note_input: { title: payload.note.title, content: payload.note.content } }).then((result) => {
            const res = JSON.parse(result)
            console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createNote', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'update_note')({ id: payload.note.id, created_at: payload.note.createdAt, address: payload.note.address, note_input: { title: payload.note.title, content: payload.note.content } }).then((result) => {
            const res = JSON.parse(result)
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
      rootState.holochainConnection.then(({ callZome }) => {
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
