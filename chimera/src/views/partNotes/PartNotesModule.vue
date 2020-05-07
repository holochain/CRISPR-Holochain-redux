<template>
  <section>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-toolbar dark>
            <v-btn icon @click="$router.go(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          <v-toolbar-title>{{project.name}} Project Kanban Board</v-toolbar-title>
          <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn color="action" icon :to="`/part/${project.id}`">
                <v-icon>mdi-application</v-icon>
              </v-btn>
              <v-btn color="action" icon :to="`/project/${project.id}`">
                <v-icon>mdi-code-braces</v-icon>
              </v-btn>
            </v-card-actions>
          </v-toolbar>
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
  computed: {
    ...mapGetters('portfolio', ['projectById']),
    project () {
      return this.projectById(this.$route.params.id)
    }
  }
}
</script>
