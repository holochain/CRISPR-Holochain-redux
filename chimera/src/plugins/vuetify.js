import Vue from 'vue'
import Vuetify, { VLayout, VFlex, VList } from 'vuetify/lib'
import { Touch } from 'vuetify/lib/directives'
import '@mdi/font/css/materialdesignicons.css'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  directives: {
    Touch
  },
  components: {
    VFlex,
    VLayout,
    VList
  }
})

const vuetify = new Vuetify()
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
})

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#A279DE',
        accent: '#FF4081',
        secondary: '#ffe18d',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
        anchor: '#000051',
        portBase: '#ffb300',
        portTarget: '#ff6f00',
        entry: '#5e35b1',
        profile: '#00838f',
        fillFunction: '#76ff03',
        wave: '#673ab7'
      },
      light: {
        primary: '#1976D2',
        accent: '#e91e63',
        secondary: '#30b1dc',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }
})
