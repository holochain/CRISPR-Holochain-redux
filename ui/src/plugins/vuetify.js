import Vue from 'vue'
import Vuetify, { VList } from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  components: {
    VList
  }
})

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#D3C3BC',
        secondary: '#BFADA5',
        accent: '#D8EBF1',
        info: '#5B5C79'
      },
      dark: {
        primary: '#7A00FF',
        secondary: '#425BEE',
        accent: '#5c007a',
        anchor: '#000051',
        portBase: '#ffb300',
        portTarget: '#ff6f00',
        entry: '#5e35b1',
        fillFunction: '#76ff03'
      }
    }
  }
})
