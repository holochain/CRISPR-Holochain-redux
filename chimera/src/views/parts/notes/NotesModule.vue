<template>
  <v-card class="ma-5">
  <v-card-title>Notes - Part</v-card-title>
    <v-row>
      <v-col cols="12" md="4">
        <notes key="DoNotes" base="DoNotes" title="Do"/>
      </v-col>
    </v-row>
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
  </v-card>
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
