import Vue from 'vue'
import Vuetify, { VLayout, VFlex, VList } from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
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
        primary: '#ffffff',
        secondary: '#1697F6',
        accent: '#8D99AE',
        anchor: '#000051',
        portBase: '#ffb300',
        portTarget: '#ff6f00',
        entry: '#5e35b1',
        fillFunction: '#76ff03',
        wave: '#673ab7'
      }
    }
  }
})
