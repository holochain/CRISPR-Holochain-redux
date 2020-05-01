<template>
  <v-card class="ma-5">
    <v-card-title>Task Part</v-card-title>
    <v-divider />
    <v-row>
      <v-col cols="12" md="4">
        <tasks key="Demo Task" base="Demo Task List"/>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-btn color="action" icon :to="`/notes`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/${id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TasksModule',
  components: {
    Tasks: () => import('@/components/modules/Tasks/Tasks')
  },
  computed: {
    ...mapGetters('notes', ['listTasks']),
    id () {
      return this.$route.params.id
    }
  }
}
</script>
