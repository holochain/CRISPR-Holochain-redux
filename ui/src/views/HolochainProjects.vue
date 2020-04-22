<template>
  <v-card fluid height="99vh">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Holochain CRISPR</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="addHolochainApp">
        <v-icon>mdi-plus</v-icon>
        Holochain Project
      </v-btn>
      <v-btn text to="modules">
        <v-icon>mdi-view-module</v-icon>
        Holochain Modules
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center" class="fill-height">
        <v-col v-for="(project) in projects" :key="project.name" cols="3">
          <holochain-project :project="project"/>
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>

<script>
import { projects } from '../store/projects.js'
export default {
  name: 'HolochainProjects',
  components: {
    HolochainProject: () => import('../components/HolochainProject')
  },
  data () {
    return {
      projects: projects,
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
      this.projects.push(this.new)
    },
    deleteHolochainApp: function (project) {
      console.log('Delete Entry Type')
      const projectName = project.name
      this.projects = this.projects.filter(function (project) {
        return project.name !== projectName
      })
    }
  }
}
</script>
