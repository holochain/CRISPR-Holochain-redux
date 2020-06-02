<template>
  <v-card flat class="mx-auto" dark>
    <v-toolbar dark>
      <v-icon>mdi-project-multiple-outline</v-icon>
      <span class="title">{{title}}</span>
      <v-spacer></v-spacer>
      <v-btn color="action" icon @click="details=!details">
        <v-icon>mdi-details</v-icon>
      </v-btn>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="text--primary">
            Holochain CRISPR makes it easy to edit your DNA by changing the fields in your entries, the DNA pattern and the permissions for who can add, edit and delete entries. Holochain is based on Biomimicry and like CRISPR Cas9 genetic editing Holochain CRISPR Cas enables editing of Holochain DNA.
          </div>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto">
            <v-card-text>
              <p class="display-1 text--primary">
                CRISPR - Cas
              </p>
              <p>Holochain DNA Editing</p>
              <div class="text--primary">
                Clone Rearrange Identify Socialise Personalise Repeat
              </div>
              <div class="text--primary">
                (Content addressable system)
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="mx-auto">
            <v-card-text>
              <p class="display-1 text--primary">
                C•R•I•S•P•R - Cas9
              </p>
              <p>Genetic DNA Editing</p>
              <div class="text--primary">
                Clustered Regularly Interspaced Short Palindromic Repeats
              </div>
              <div class="text--primary">
                (CRISPR associated protein 9)
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-notebook-outline</v-icon> (Kanban) to go to the Kanban Board.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-application</v-icon> (UI) to go to the Part Editor.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-code-braces</v-icon> (Code) to go to the Zome Modeller.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-publish</v-icon> (Publish) to publish your part to the Parts Store.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-dna</v-icon> (Clone) to create a new DNA from an existing one.
    </v-alert>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(base)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-row no-gutters>
      <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" md="3">
        <project :key="project.id" :base="base" :project="project" :details="details">
        </project>
      </v-col>
    </v-row>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Projects',
  components: {
    Project: () => import('./Project')
  },
  data () {
    return {
      help: false,
      details: false
    }
  },
  props: ['base', 'title'],
  methods: {
    add () {
      this.projects.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    ...mapActions('projects', ['fetchProjects', 'acknowledgeErrors'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('projects', ['errors']),
    ...mapGetters('projects', ['listProjects', 'listErrors']),
    projects () {
      return this.listProjects(this.base)
    },
    errors () {
      return this.listErrors(this.base)
    }
  },
  created () {
    this.fetchProjects(this.base)
  }
}
</script>
