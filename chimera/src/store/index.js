import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from '@/store/modules/app'
import auth from '@/store/modules/auth'
import downloads from '@/store/modules/downloads'
import friends from '@/store/modules/friends'
import games from '@/store/modules/games'
import home from '@/store/modules/home'
import install from '@/store/modules/install'
import library from '@/store/modules/library'
import portfolio from '@/store/modules/portfolio'
import projects from '@/store/modules/projects'
import snackbar from '@/store/modules/snackbar'
import verify from '@/store/modules/verify'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    downloads,
    friends,
    games,
    home,
    install,
    library,
    portfolio,
    projects,
    snackbar,
    verify
  },
  actions: {
    init: async () => {
      await Promise.all([])
    }
  }
})

store.dispatch('init')

export default store
