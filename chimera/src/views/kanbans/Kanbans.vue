<template>
  <section>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-toolbar dark>
            <v-btn icon @click="$router.go(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>All Project Kanban Boards</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="help=!help">mdi-help</v-icon>
          </v-toolbar>
          <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
            Click <v-icon>mdi-notebook-outline</v-icon> (Kanban) to go to the Kanban Board for that project.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-application</v-icon> (UI) to go to the Part Editor for that project.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-code-braces</v-icon> (Code) to go to the Zome Modeller for that project.
          </v-alert>
          <v-row no-gutters>
            <v-col v-for="(project) in applicationProjects" :key="project.name" cols="12">
              <v-card class="ma-5">
              <v-card-title>{{project.name}} Project Kanban Board
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn color="action" icon :to="`/partNotes/${project.id}`">
                    <v-icon>mdi-notebook-outline</v-icon>
                  </v-btn>
                  <v-btn color="action" icon :to="`/part/${project.id}`">
                    <v-icon>mdi-application</v-icon>
                  </v-btn>
                  <v-btn color="action" icon :to="`/project/${project.id}`">
                    <v-icon>mdi-code-braces</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-title>
                <v-row>
                  <v-col>
                    <kanban :key="project.id" :base="project.id" :title="project.name"/>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col v-for="(project) in partProjects" :key="project.name" cols="12">
              <v-card class="ma-5">
              <v-card-title>{{project.name}} Part Kanban Board
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn color="action" icon :to="`/partNotes/${project.id}`">
                    <v-icon>mdi-notebook-outline</v-icon>
                  </v-btn>
                  <v-btn color="action" icon :to="`/part/${project.id}`">
                    <v-icon>mdi-application</v-icon>
                  </v-btn>
                  <v-btn color="action" icon :to="`/project/${project.id}`">
                    <v-icon>mdi-code-braces</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-title>
                <v-row>
                  <v-col>
                    <kanban :key="project.id" :base="project.id" :title="project.name"/>
                  </v-col>
                </v-row>
              </v-card>
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
  name: 'Kanbans',
  components: {
    Kanban: () => import('@/components/parts/Kanban/Kanban')
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
