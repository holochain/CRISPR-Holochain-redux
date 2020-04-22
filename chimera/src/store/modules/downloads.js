import { set, toggle } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    drawer: false,
    downloading: []
  },

  mutations: {
    setDownloading: set('downloading'),
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer')
  }
}
