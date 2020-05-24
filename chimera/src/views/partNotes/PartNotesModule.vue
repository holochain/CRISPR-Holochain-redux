<template>
  <section>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-toolbar dark>
            <v-btn icon @click="$router.go(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          <v-toolbar-title>{{project.name}} Synth</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn color="action" icon :to="`/part/${project.id}`">
                <v-icon>mdi-application</v-icon>
              </v-btn>
              <v-btn color="action" icon :to="`/project/${project.id}`">
                <v-icon>mdi-code-braces</v-icon>
              </v-btn>
              <v-btn color="action" icon @click="help=!help">
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
            Click <v-icon>mdi-application</v-icon> (UI) to go to the Part Editor.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-code-braces</v-icon> (Code) to go to the Zome Modeller.
          </v-alert>
          <v-row>
            <v-col cols="12">
              <kanban :key="project.id" :base="project.id" :title="project.name"/>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PartNotesModule',
  components: {
    Kanban: () => import('@/components/parts/Kanban/Kanban')
  },
  data () {
    return {
      help: false
    }
  },
  computed: {
    ...mapGetters('portfolio', ['projectById']),
    project () {
      return this.projectById(this.$route.params.id)
    }
  }
}
</script>
