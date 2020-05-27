<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">CRISPR Application Projects</span>
      <v-spacer></v-spacer>
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
    <v-row no-gutters>
      <v-col v-for="(project) in applicationProjects" :key="project.name" cols="12" sm="6" md="2">
        <holochain-project :project="project"/>
      </v-col>
    </v-row>
    <v-toolbar flat>
      <span class="title">CRISPR Part Projects</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row no-gutters>
      <v-col v-for="(project) in partProjects" :key="project.name" cols="12" sm="6" md="2">
        <holochain-project :project="project"/>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Projects',
  components: {
    HolochainProject: () => import('./HolochainProject')
  },
  data () {
    return {
      help: false
    }
  },
  computed: {
    ...mapGetters('portfolio', ['applicationProjects', 'partProjects'])
  }
}
</script>
