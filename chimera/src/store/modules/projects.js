export default {
  namespaced: true,

  state: {
    projects: [
      // {
      //   id: 'QmHashyChimera',
      //   name: 'Chimera',
      //   folder: '/Users/philipbeadle/holochain/hApps',
      //   url: '/happ-store/Chimera',
      //   contact: 'Philip Beadle',
      //   mobile: '+61 999 999 999',
      //   description: 'IDE for building Holochain hApps from models and templates. Uses Holochain anchors as a git like source control with branching, permission control and traceability of changes.',
      //   zomes: [],
      //   modules: []
      // },
      {
        id: 'Qmmorebighashes333',
        name: 'Notes',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        url: '/happ-store/Notes',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Notes have a title, content and order. Set the permissions at build time to control who can update and delete notes.',
        zomes: [],
        modules: []
      },
      {
        id: 'QmmorehashyTasks',
        name: 'Tasks',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        url: '/store/games/QmHashyTasks',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A clone of Notes DNA. Tasks have title, done and order.',
        zomes: []
      },
      {
        id: 'QmHashyKanban',
        name: 'Kanban',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        url: '/happ-store/Kanban',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A kanban board that you can kanban any type of part using the slot.',
        zomes: []
      }
    ]
  },
  getters: {
    allProjects: state => {
      return state.projects
    },
    projectById: (state) => (projectId) => {
      return state.projects.find(p => p.id === projectId)
    }
  }
}
