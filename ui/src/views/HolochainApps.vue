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
        <v-btn text to="modules">
          <v-icon>mdi-view-module</v-icon>
          Holochain Modules
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row>
      <v-col v-for="(hApp) in hApps" :key="hApp.name" cols="3">
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
import { mapState } from 'vuex'
export default {
  name: 'HolochainApps',
  components: {
    HolochainApp: () => import('../components/HolochainApp')
  },
  data () {
    return {
      new: {
        id: '',
        name: '',
        url: '',
        contact: '',
        mobile: ''
      }
    }
  },
  methods: {
    addHolochainApp: function () {
      console.log('Add New Holochain App')
      this.hApps.push(this.new)
    },
    deleteHolochainApp: function (hApp) {
      console.log('Delete Entry Type')
      const hAppName = hApp.name
      this.hApps = this.hApps.filter(function (hApp) {
        return hApp.name !== hAppName
      })
    }
  },
  computed: {
    ...mapState('app', ['hApps'])
  }
}
</script>
