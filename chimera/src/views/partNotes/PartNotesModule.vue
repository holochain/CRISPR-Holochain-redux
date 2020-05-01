<template>
<v-card class="ma-5">
  <v-card-title>Tasks Part
    <v-spacer></v-spacer>
    <v-card-title-actions>
      <v-btn color="action" icon :to="`/part/QmmorehashyTasks`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/QmmorehashyTasks`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
    </v-card-title-actions>
  </v-card-title>
  <v-row>
    <v-col cols="12" md="4">
      <notes key="TasksDo" base="TasksDo" title="Do"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="TasksDoing" base="TasksDoing" title="Doing"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="TasksDone" base="TasksDone" title="Done"/>
    </v-col>
  </v-row>
</v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PartNotesModule',
  components: {
    Notes: () => import('@/components/parts/Notes/Notes')
  },
  computed: {
    ...mapGetters('notes', ['listNotes'])
  }
}
</script>
