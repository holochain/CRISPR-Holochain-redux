<template>
  <v-card fluid>
    <v-app-bar app clipped-left>
      <v-toolbar>
        <v-toolbar-title>Holochain Modules</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>
          Preview
        </v-btn>
        <v-btn @click="$vuetify.goTo('edit')" text>
          Edit
        </v-btn>
        <v-btn text>
          Publish
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row no-gutters>
      <v-col cols="12" id="view">
        <section id="view">
          <core-toolbar />
          <core-view />
          <core-footer />
        </section>
      </v-col>
      <v-col cols="12">
        <section id="edit">
          <core-toolbar />
          <core-edit :module="hApps[0].modules[0]"/>
          <core-footer />
        </section>
      </v-col>
      <v-col cols="12" id="publish">
          <h1>Publishing details here</h1>
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
  name: 'Freelancer',
  data () {
    return {
      view: true,
      edit: false,
      publish: false
    }
  },
  components: {
    CoreFooter: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/core/Footer'),
    CoreToolbar: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/core/Toolbar'),
    CoreView: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/core/View'),
    CoreEdit: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/core/Edit')
  },
  created () {
    this.$vuetify.theme.dark = false
  },
  computed: {
    ...mapState('app', ['hApps'])
  }
}
</script>
