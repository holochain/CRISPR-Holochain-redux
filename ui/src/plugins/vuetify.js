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
        primary: '#33404D',
        secondary: '#FEA21E',
        accent: '#39C2B2'
      },
      dark: {
        primary: '#FFFFFF',
        secondary: '#FEA21E',
        accent: '#39C2B2'
      }
    }
  }
})
