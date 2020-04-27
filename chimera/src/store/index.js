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
import personalInformation from '@/store/modules/personalInformation'
import profiles from '@/store/modules/profiles'
import personas from '@/store/modules/personas'
import snackbar from '@/store/modules/snackbar'
import notes from '@/store/modules/notes'
import tasks from '@/store/modules/tasks'
import zomes from '@/store/modules/zomes'
import mediaLibrary from '@/store/modules/mediaLibrary'
import tracks from '@/store/modules/tracks'
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
    personalInformation,
    profiles,
    personas,
    snackbar,
    notes,
    tasks,
    zomes,
    verify,
    mediaLibrary,
    tracks
  },
  actions: {
    init: async () => {
      await Promise.all([])
    }
  }
})

store.dispatch('init')

export default store
