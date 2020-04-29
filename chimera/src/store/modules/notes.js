export default {
  namespaced: true,
  state: {
    featured: [],
    baseNotes: [],
    editing: false
  },
  mutations: {
    createNote (state, baseNote) {
      const base = state.baseNotes.find(b => b.base === baseNote.base)
      if (base) {
        base.notes.push(baseNote.note)
      } else {
        state.baseNotes.push((baseNote))
      }
    },
    setNotesList (state, baseNotes) {
      const baseNote = state.baseNotes.find(b => b.base === baseNotes.base)
      if (baseNote) {
        baseNote.notes = baseNotes.notes
      } else {
        state.baseNotes.push(baseNotes)
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
        return baseNote.notes
      } else {
        return []
      }
    }
  },
  actions: {
    fetchNotes: ({ state, commit, rootState }, base) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('notes', 'notes', 'list_notes')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setNotesList', { base: base, notes: res.Ok })
          }
        })
      })
    },
    saveNote: ({ state, commit, rootState }, base, note) => {
      if (this.note.id === '' || this.note.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'create_note')({ base: base, note_input: { title: note.title, content: note.content } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              console.log(res)
            } else {
              commit('createNote', { base: base, note: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('notes', 'notes', 'update_note')({ id: note.id, created_at: note.createdAt, address: note.address, note_input: { title: note.title, content: note.content } }).then((result) => {
            const res = JSON.parse(result)
            if (res.Ok === undefined) {
              console.log(res)
            } else {
              console.log(res.Ok)
              commit('updateNote', { base: base, note: res.Ok })
            }
          })
        })
      }
    },
    deleteNote: ({ state, commit, rootState }, base, note) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('notes', 'notes', 'delete_note')({ base: base, id: note.id, created_at: note.createdAt, address: note.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('deleteNote', { base: base, note: res.Ok })
          }
        })
      })
    }
  }
}
