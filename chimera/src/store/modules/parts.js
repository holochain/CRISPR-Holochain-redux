export default {
  namespaced: true,
  state: {
    parts: [
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
        id: 'QmHashyTasks',
        name: 'Tasks',
        src: 'tasks',
        description: 'Task lists are super handy. Manage your tasks in a list or combine with other parts such as Notes and Kanban to get the kanban board in the image above.',
        price: 9.99,
        compareAt: 12.99,
        publisher: 'Holochain.org',
        updated: 1588546955113
      },
      {
        id: 'QmHashyratings',
        name: 'Ratings',
        src: 'ratings',
        description: 'Add a ratings part to any other part.',
        price: 1.99,
        compareAt: 8.99,
        publisher: 'Holochain.org',
        updated: 1588890779424
      }
    ],
    baseParts: [
      {
        base: 'PartEditor',
        parts: ['QmHashyTasks', 'QmHashyratings']
      }
    ]
  },
  getters: {
    parsedParts: state => {
      console.log(state.parts)
      return state.parts.map(part => ({
        ...part,
        bg: `parts/${part.src}/bg.png`,
        bg2: `parts/${part.src}/bg2.png`,
        logo: `parts/${part.src}/logo.png`,
        avatar: `parts/${part.src}/avatar.png`
      }))
    }
  }
}
