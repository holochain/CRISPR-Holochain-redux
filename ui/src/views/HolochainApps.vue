<template>
  <v-card fluid>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>Holochain Apps</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="addHolochainApp">
          <v-icon>mdi-plus</v-icon>
          Holochain Application
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row>
      <v-col v-for="(hApp) in hApps" :key="hApp.name" cols="12">
        <holochain-app :hApp="hApp" @delete-holochain-app="deleteHolochainApp"/>
      </v-col>
    </v-row>
    </v-content>
    <v-footer app>
      <span>Holochain</span>
    </v-footer>
  </v-card>
</template>

<script>
// import { dnas } from '../test-data/dnas.js'

export default {
  name: 'HolochainApps',
  components: {
    HolochainApp: () => import('../components/HolochainApp')
  },
  data () {
    return {
      newHolochainApp: {
        name: 'New Holochain App',
        url: '',
        contact: '',
        mobile: ''
      },
      hApps: [
        {
          name: 'holochain-developer',
          folder: '/Users/philipbeadle/eat-sleep-code-repeat/dashboard',
          url: '/entry-types',
          contact: 'Philip Beadle',
          mobile: '+61 999 999 999'
        }
      ]
    }
  },
  methods: {
    addHolochainApp: function () {
      console.log('Add New Holochain App')
      this.hApps.push(this.newHolochainApp)
    },
    deleteHolochainApp: function (hApp) {
      console.log('Delete Entry Type')
      const hAppName = hApp.name
      this.hApps = this.hApps.filter(function (hApp) {
        return hApp.name !== hAppName
      })
    }
  }
}
</script>
