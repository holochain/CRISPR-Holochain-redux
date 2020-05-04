<template>
  <v-row>
    <v-col cols="12">
      <v-card class="ma-5">
      <v-card-title>Notes
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="action" icon :to="`/partNotes/Qmmorebighashes333`">
            <v-icon>mdi-notebook-outline</v-icon>
          </v-btn>
          <v-btn color="action" icon :to="`/part/Qmmorebighashes333`">
            <v-icon>mdi-application</v-icon>
          </v-btn>
          <v-btn color="action" icon :to="`/project/Qmmorebighashes333`">
            <v-icon>mdi-code-braces</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card-title>
        <v-row>
          <v-col cols="12" md="4">
            <notes key="NotesDo" base="NotesDo" title="Do"/>
          </v-col>
          <v-col cols="12" md="4">
            <notes key="NotesDoing" base="NotesDoing" title="Doing"/>
          </v-col>
          <v-col cols="12" md="4">
            <notes key="NotesDone" base="NotesDone" title="Done"/>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="ma-5">
      <v-card-title>Tasks
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="action" icon :to="`/partNotes/QmmorehashyTasks`">
            <v-icon>mdi-notebook-outline</v-icon>
          </v-btn>
          <v-btn color="action" icon :to="`/part/QmmorehashyTasks`">
            <v-icon>mdi-application</v-icon>
          </v-btn>
          <v-btn color="action" icon :to="`/project/QmmorehashyTasks`">
            <v-icon>mdi-code-braces</v-icon>
          </v-btn>
        </v-card-actions>
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
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NotesModule',
  components: {
    Notes: () => import('@/components/parts/Notes/Notes')
  },
  computed: {
    ...mapGetters('notes', ['listNotes'])
  }
}
</script>
