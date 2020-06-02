import Vue from 'vue'
import Vuex from 'vuex'
import { connect } from '@holochain/hc-web-client'
import origins from '@/components/parts/Origins/OriginsStore'
import notes from '@/components/parts/Notes/NotesStore'
import freckles from '@/components/parts/Freckles/FrecklesStore'
import tasks from '@/components/parts/Tasks/TasksStore'
// NewImportModule
import app from '@/store/modules/app'
import auth from '@/store/modules/auth'
import downloads from '@/store/modules/downloads'
import friends from '@/store/modules/friends'
import happs from '@/store/modules/happs'
import parts from '@/store/modules/parts'
import home from '@/store/modules/home'
import install from '@/store/modules/install'
import library from '@/store/modules/library'
import portfolio from '@/store/modules/portfolio'
import projects from '@/store/modules/projects'
import personalInformation from '@/store/modules/personalInformation'
import fieldNames from '@/store/modules/fieldNames'
import profiles from '@/store/modules/profiles'
import personas from '@/store/modules/personas'
import snackbar from '@/store/modules/snackbar'
import zomes from '@/store/modules/zomes'
import mediaLibrary from '@/store/modules/mediaLibrary'
import tracks from '@/store/modules/tracks'
import kanban from '@/store/modules/kanban'
import verify from '@/store/modules/verify'

Vue.use(Vuex)
console.log(process.env.VUE_APP_HOLOCHAIN_URL)
const store = new Vuex.Store({
  state: {
    // holochainConnection: connect({ url: 'ws://localhost:4435' }),
    devHolochainConnection: connect({ url: process.env.VUE_APP_HOLOCHAIN_URL })
  },
  modules: {
    origins,
    notes,
    freckles,
    tasks,
    // NewModule
    app,
    auth,
    downloads,
    friends,
    happs,
    parts,
    home,
    install,
    library,
    portfolio,
    projects,
    personalInformation,
    fieldNames,
    profiles,
    personas,
    snackbar,
    kanban,
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
