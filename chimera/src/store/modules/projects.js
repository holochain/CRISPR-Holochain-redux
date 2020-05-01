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
        description: 'This is the project management tool with Notes in workflow swim lanes that is being built with CRISPR.\nSelecting permissions and roles generates the code for the Zome & UI based on Entry Type fields and links.',
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
        description: 'A clone of Notes DNA. CRUD functions also pass the id of the entry they link to so anchor with anchorText=entryid.',
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
