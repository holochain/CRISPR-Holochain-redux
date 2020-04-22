import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    drawer: null,
    friends: [
      {
        id: 1,
        name: 'Arthur Brock',
        online: true,
        info: {
          id: 10,
          avatar: 'avatars/arthur.brock.png',
          name: 'Holochain'
        },
        notifications: 1
      },
      {
        id: 2,
        name: 'Guillem Cordoba',
        online: true,
        info: {
          id: 10,
          avatar: 'avatars/guillem.png',
          name: '_protocol'
        },
        notifications: 0
      },
      {
        id: 2,
        name: 'Tom Gowan',
        online: true,
        info: {
          id: 10,
          avatar: 'avatars/tom.gowan.jpeg',
          name: 'Holochain'
        },
        notifications: 0
      },
      {
        id: 2,
        name: 'Hedayat',
        online: true,
        info: {
          id: 10,
          avatar: 'avatars/hedayat.png',
          name: 'Holochain'
        },
        notifications: 0
      },
      {
        id: 3,
        name: 'Mary Camacho',
        online: false,
        info: {
          id: 10,
          avatar: 'avatars/mary.camacho.png',
          name: 'Holochain'
        },
        notifications: 0
      },
      {
        id: 4,
        name: 'David Meister',
        online: false,
        info: {
          id: 10,
          avatar: 'avatars/david.meister.jpeg',
          name: 'Holochain'
        },
        notifications: 1
      }
    ]
  },

  getters: {
    online: state => {
      const total = state.friends.length
      const online = state.friends.filter(friend => friend.online).length

      return `(${online}/${total})`
    }
  },

  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer')
  }
}
