export default {
  namespaced: true,
  state: {
    featured: [],
    baseNotes: [
      {
        base: 'demoAlice',
        notes: [
          {
            id: 'QmhashTodo1',
            title: 'Note with no tasks',
            content: 'A simple note card - phase 1 of Hoplochain IDE project'
          },
          {
            id: 'QmhashTodo2',
            title: 'Note with tasks',
            content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.'
          }
        ]
      },
      {
        base: 'demoPhil',
        notes: [
          {
            id: 'QmhashProgress1',
            title: 'In Progress Note with no tasks',
            content: 'A simple note card - phase 1 of Hoplochain IDE project'
          },
          {
            id: 'QmhashProgress2',
            title: 'In Progress Note with tasks',
            content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.'
          }
        ]
      },
      {
        base: 'demoLucy',
        notes: [
          {
            id: 'QmhashDone1',
            title: 'Done Note with no tasks',
            content: 'A simple note card - phase 1 of Hoplochain IDE project'
          },
          {
            id: 'QmhashDone2',
            title: 'Done Note with tasks',
            content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.'
          }
        ]
      }
    ]
  },
  mutations: {
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
      return state.baseNotes.find(n => n.base === base).notes
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
    }
  }
}
