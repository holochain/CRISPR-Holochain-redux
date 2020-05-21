import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    drawer: null,
    selectedGroup: 'Friends',
    groups: [
      {
        name: 'Friends',
        friends: [
          {
            id: 1,
            name: 'Rudy',
            online: true,
            info: {
              id: 10,
              avatar: 'avatars/rudy.jpeg',
              name: ''
            },
            notifications: 0,
            value: 10,
            start: 110
          },
          {
            id: 2,
            name: 'ErrolJ',
            online: false,
            info: {
              id: 10,
              avatar: 'avatars/errolj.jpeg',
              name: '@pherrol'
            },
            notifications: 1,
            value: 15,
            start: 200
          },
          {
            id: 1,
            name: 'Alex',
            online: true,
            info: {
              id: 10,
              avatar: 'avatars/alex.jpg',
              name: ''
            },
            notifications: 0,
            value: 30,
            start: 130
          }
        ]
      },
      {
        name: 'Producers',
        friends: [
          {
            id: 4,
            name: 'Mha Iri',
            online: false,
            info: {
              id: 10,
              avatar: 'avatars/mhairi.jpg',
              name: ''
            },
            notifications: 0,
            value: 0,
            start: 0
          },
          {
            id: 4,
            name: 'Miers',
            online: false,
            info: {
              id: 10,
              avatar: 'avatars/mittens.jpg',
              name: ''
            },
            notifications: 0,
            value: 0,
            start: 0
          }
        ]
      },
      {
        name: 'Family',
        friends: [
          {
            id: 1,
            name: 'Lucy',
            online: true,
            info: {
              id: 10,
              avatar: 'avatars/lucy.jpg',
              name: ''
            },
            notifications: 0,
            value: 30,
            start: 130
          }
        ]
      },
      {
        name: 'Esoteric Crew',
        friends: []
      },
      {
        name: 'Psylandians',
        friends: []
      }
    ]
  },

  getters: {
    online: state => {
      const total = state.friends.length
      const online = state.friends.filter(friend => friend.online).length
      return `(${online}/${total})`
    },
    allGroups: state => {
      return state.groups
    },
    friends: state => {
      console.log(state.selectedGroup)
      const group = state.groups.find(g => g.name === state.selectedGroup)
      console.log(group.friends)
      if (group) {
        return group.friends
      } else {
        return []
      }
    }
  },
  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer'),
    setGroup (state, group) {
      state.selectedGroup = group
      console.log(state.selectedGroup)
    }
  }
}
