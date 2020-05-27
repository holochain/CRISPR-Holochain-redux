import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

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
        profile: '#00838f',
        fillFunction: '#76ff03',
        wave: '#673ab7'
      }
    }
  }
})
