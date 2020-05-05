export default {
  namespaced: true,

  state: {
    featured: [],
    games: [
      // {
      //   id: 'QmHashySiteBuilder',
      //   name: 'Profile Site Builder',
      //   src: 'profile-site-builder',
      //   launch: '/profile-site-builder',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Eat Sleep Code Repeat',
      //   updated: 1587694679490
      // },
      // {
      //   id: 'QmHashyPhase',
      //   name: 'Phase',
      //   src: 'phase',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Creten Studios',
      //   updated: 1545864353031
      // },
      // {
      //   id: 'QmHashyReplicate',
      //   name: 'Replicate',
      //   src: 'replicate',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Creten Studios',
      //   updated: 1545864353040
      // },
      // {
      //   id: 'QmHashysol643',
      //   name: 'SOL 643',
      //   src: 'sol643',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Creten Studios',
      //   updated: 1545864353039
      // },
      // {
      //   id: 'QmHashyholopunk-records',
      //   name: 'Holopunk Records',
      //   src: 'holopunk-records',
      //   launch: '/holopunk-records/library',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Holopunk Records',
      //   updated: 1585864353040
      // },
      // {
      //   id: 'QmHashyfallen-kingdoms',
      //   buyColor: '#3675A6',
      //   name: 'Fallen Kingdoms',
      //   src: 'fallen-kingdoms',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Creten Studios',
      //   updated: 1545864353030
      // },
      // {
      //   id: 'QmHashyastras',
      //   buyColor: '#804C9D',
      //   name: 'Astras II',
      //   src: 'astras',
      //   price: 6.99,
      //   compareAt: 6.99,
      //   publisher: 'Giant Games',
      //   updated: 1545864353030
      // },
      {
        id: 'QmHashykanban',
        name: 'Kanban',
        src: 'kanban',
        description: 'From Japanese, kanban is literally translated as billboard or signboard. Add the Kanban part and you can Kanban any other part you need. The image above shows the Notes List part being used in the Kanban board.',
        price: 6.99,
        compareAt: 6.99,
        publisher: 'Holochain.org',
        updated: 1545864353031
      },
      {
        id: 'QmHashyNotes',
        name: 'Notes',
        src: 'notes',
        launch: '/notes',
        description: 'The Notes part has a title and content field for you to record simple notes. You can add edit and delete notes and if an agent tries to edit or delete a note they do not have permission to a validation error will show.',
        price: 19.99,
        compareAt: 19.99,
        publisher: 'Holochain.org',
        updated: 1585864353040
      },
      {
        id: 'QmHashyTaskss',
        name: 'Tasks',
        src: 'tasks',
        description: 'Task lists are super handy. Manage your tasks in a list or combine with other parts such as Notes and Kanban to get the kanban board in the image above.',
        price: 9.99,
        compareAt: 12.99,
        publisher: 'Holochain.org',
        updated: 1588546955113
      },
      {
        id: 'QmHashyCRISPR',
        name: 'CRISPR',
        src: 'crispr',
        launch: '/projects',
        description: 'Holochain CRISPR brings you all the power of building your own Holochain Apps without writing any code. You can assemble your own apps from pre-built modules as well as get right into the technical side and build new DNA\'s with the DNA Modeller. Once you are confident customising your own Holochain experience you can even make a income building apps for others............. CRISPR runs inside Chimera and comes with Holochain Version Control System (HVCS) and a kanban board so you know exactly what needs doing and who is doing it. Each project has its own DHT and you control who is on your team and what team members can do.',
        price: 59.99,
        compareAt: 54.34,
        publisher: 'Holochain.org',
        updated: 1545864353030
      }
    ]
  },

  getters: {
    featured: (state, getters) => {
      return getters.parsedGames.sort((a, b) => {
        if (a.updated < b.updated) return -1
        if (a.updated > b.updated) return 1
        return 0
      }).slice(0, 4)
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
