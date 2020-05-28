export default {
  namespaced: true,
  state: {
    featured: [],
    happs: [
      {
        id: 'QmHashykanban',
        name: 'Kanban',
        src: 'kanban',
        launch: '/kanbans',
        description: 'From Japanese, kanban is literally translated as billboard or signboard. Add the Kanban part and you can Kanban any other part you need. The image above shows the Notes List part being used in the Kanban board.',
        price: 6.99,
        compareAt: 6.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1545864353031
      },
      {
        id: 'QmHashyCRISPR',
        name: 'CRISPR',
        src: 'crispr',
        launch: '/projects',
        description: 'Holochain CRISPR brings you all the power of building your own Holochain Apps without writing any code. You can assemble your own apps from pre-built modules as well as get right into the technical side and build new DNA\'s with the DNA Modeller. Once you are confident customising your own Holochain experience you can even make a income building apps for others............. CRISPR runs inside Chimera and comes with Holochain Version Control System (HVCS) and a kanban board so you know exactly what needs doing and who is doing it. Each project has its own DHT and you control who is on your team and what team members can do.',
        price: 59.99,
        compareAt: 54.34,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1545864353030
      },
      // {
      //   id: 'QmHashySiteBuilder',
      //   name: 'Profile Site Builder',
      //   src: 'profile-site-builder',
      //   description: 'Build and deploy super fast static websites based on people\'s profiles. Awesome for artist websites and anyone promoting themselves. The image above is for DJ @philt3r\'s website http://philt3r.rocks',
      //   price: 19.99,
      //   compareAt: 27.99,
      //   publisher: 'Eat Sleep Code Repeat',
      //   updated: 1587694679490
      // },
      {
        id: 'QmHashyholopunk-records',
        name: 'Holopunk Records',
        src: 'holopunk-records',
        launch: '/holopunk-records/library',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1585864353040
      },
      {
        id: 'QmHashyFreckles',
        name: 'Freckles',
        src: 'freckles',
        launch: '/freckles',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1585864353040
      },
      {
        id: 'QmHashyOrigins',
        name: 'Origins',
        src: 'origins',
        launch: '/origins',
        price: 19.99,
        compareAt: 27.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1585864353040
      }
    ]
  },

  getters: {
    featured: (state, getters) => {
      return getters.parsedHapps.sort((a, b) => {
        if (a.updated < b.updated) return -1
        if (a.updated > b.updated) return 1
        return 0
      }).slice(0, 4)
    },
    parsedHapps: state => {
      const parsed = state.happs.map(happ => ({
        ...happ,
        bg: `happs/${happ.src}/bg.png`,
        bg2: `happs/${happ.src}/bg2.png`,
        logo: `happs/${happ.src}/logo.png`,
        avatar: `happs/${happ.src}/avatar.png`
      }))
      return parsed
    }
  }
}
