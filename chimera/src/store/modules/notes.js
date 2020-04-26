export default {
  namespaced: true,
  state: {
    featured: [],
    notes: [
      {
        anchorText: 'To do',
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
        anchorText: 'In Progress',
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
        anchorText: 'Done',
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
  getters: {
    featured: (state, getters) => {
      return getters.parsedGames.sort((a, b) => {
        if (a.updated < b.updated) return -1
        if (a.updated > b.updated) return 1
        return 0
      }).slice(0, 3)
    },
    listNotes: state => {
      return state.notes
    }
  }
}
