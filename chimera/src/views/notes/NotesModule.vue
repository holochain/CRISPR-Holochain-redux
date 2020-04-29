<template>
  <v-row>
    <v-col cols="12" md="4">
      <notes key="To do" base="demoAlice"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="In progress" base="demoPhil"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="Done" base="demoLucy"/>
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
