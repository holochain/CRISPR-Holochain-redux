export default {
  namespaced: true,

  state: {
    featured: [],
    games: [
      {
        id: 'QmHashySiteBuilder',
        name: 'Profile Site Builder',
        src: 'profile-site-builder',
        launch: '/profile-site-builder',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1587694679490
      },
      {
        id: 'QmHashyPhase',
        name: 'Phase',
        src: 'phase',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Creten Studios',
        updated: 1545864353031
      },
      {
        id: 'QmHashyReplicate',
        name: 'Replicate',
        src: 'replicate',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Creten Studios',
        updated: 1545864353040
      },
      {
        id: 'QmHashysol643',
        name: 'SOL 643',
        src: 'sol643',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Creten Studios',
        updated: 1545864353039
      },
      {
        id: 'QmHashyholopunk-records',
        name: 'Holopunk Records',
        src: 'holopunk-records',
        launch: '/holopunk-records/library',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Holopunk Records',
        updated: 1585864353040
      },
      {
        id: 'QmHashyfallen-kingdoms',
        buyColor: '#3675A6',
        name: 'Fallen Kingdoms',
        src: 'fallen-kingdoms',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Creten Studios',
        updated: 1545864353030
      },
      {
        id: 'QmHashyastras',
        buyColor: '#804C9D',
        name: 'Astras II',
        src: 'astras',
        price: 6.99,
        compareAt: 6.99,
        publisher: 'Giant Games',
        updated: 1545864353030
      },
      {
        id: 'QmHashystorm-peak',
        name: 'Storm Peak',
        src: 'storm-peak',
        price: 6.99,
        compareAt: 6.99,
        publisher: 'Giant Games',
        updated: 1545864353031
      },
      {
        id: 'QmHashyCRISPR',
        name: 'CRISPR',
        src: 'crispr',
        launch: '/projects',
        description: 'Each CRISPR Project gets its own DHT and can be linked to the same store info sp many profiles can have the same looking store images. So Profiles page shows the current Apps page. Click on  an Apps link to see the list of profiles you have. Projects can use their store info as well. Install --> Profile added.',
        price: 59.99,
        compareAt: 54.34,
        publisher: 'Holochain.org',
        updated: 1545864353030
      },
      {
        id: 'QmHashyNotes',
        name: 'Notes',
        src: 'notes',
        launch: '/notes',
        price: 19.99,
        compareAt: 19.99,
        publisher: 'Holochain.org',
        updated: 1545864353040
      },
      {
        id: 'QmHashyTaskss',
        name: 'Tasks',
        src: 'tasks',
        price: 9.99,
        compareAt: 12.99,
        publisher: 'Holochain.org',
        updated: 1588546955113
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
    parsedGames: state => {
      return state.games.map(game => ({
        ...game,
        bg: `games/${game.src}/bg.png`,
        bg2: `games/${game.src}/bg2.png`,
        logo: `games/${game.src}/logo.png`,
        avatar: `games/${game.src}/avatar.png`
      }))
    }
  }
}
