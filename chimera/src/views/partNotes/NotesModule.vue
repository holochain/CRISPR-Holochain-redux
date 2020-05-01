<template>
  <v-row>
    <v-col cols="12" md="4">
      <notes key="demoAlice" base="demoAlice" title="Do"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="demoPhil" base="demoPhil" title="Doing"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="demoLucy" base="demoLucy" title="Done"/>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NotesModule',
  components: {
    Notes: () => import('@/components/modules/Notes/Notes')
  },
  computed: {
    ...mapGetters('notes', ['listNotes'])
  }
}
</script>
