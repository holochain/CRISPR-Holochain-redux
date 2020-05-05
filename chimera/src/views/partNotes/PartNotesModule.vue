<template>
<v-card class="ma-5">
  <v-card-title>{{project.name}} Kanban
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn color="action" icon :to="`/part/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/${project.id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card-title>
  <v-row>
    <v-col cols="12">
      <kanban :key="project.id" :base="project.id" :title="project.name"/>
    </v-col>
  </v-row>
</v-card>
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
