import Vue from 'vue'
import Vuetify, { VLayout, VFlex } from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  components: {
    VFlex,
    VLayout
  }
})

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#FFF',
        secondary: '#1697F6',
        accent: '#8D99AE',
        anchor: '#000051',
        portBase: '#ffb300',
        portTarget: '#ff6f00',
        entry: '#5e35b1',
        fillFunction: '#76ff03'
      }
    }
  }
})
