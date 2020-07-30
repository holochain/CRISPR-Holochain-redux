<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">CRISPR</span>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="action" icon v-bind="attrs" v-on="on" @click="details=!details">
            <v-icon>mdi-details</v-icon>
          </v-btn>
        </template>
        <span>Show the description of the project.</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="alert" v-bind="attrs" v-on="on" icon @click="showNewProject = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Start a new project.</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="alert" v-bind="attrs" v-on="on" icon @click="help=!help">
            <v-icon>mdi-help</v-icon>
          </v-btn>
        </template>
        <span>Explains the icons and how to use CRISPR</span>
      </v-tooltip>
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
      <v-col cols="12">
        <projects :instance="instance" base="Parts" :details="details" :showPartEditor="true" :showNewProject="showNewProject" @close-new-project-dialog="showNewProject = false"/>
        <projects :instance="instance" base="Applications"/>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'AllProjects',
  components: {
    Projects: () => import('@/components/parts/Projects/Projects.vue')
  },
  data () {
    return {
      help: false,
      details: false,
      showNewProject: false,
      instance: { zome: 'projects', type: 'project', instanceId: 'ef5ba968-0048-4135-b831-a86b615a89b2', partBase: '', instanceName: 'Holochain Projects' }
    }
  }
}
</script>
