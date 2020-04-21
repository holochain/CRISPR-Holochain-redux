<template>
  <v-card class="mx-auto" max-width="520" color="info" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon @click="addNote">mdi-clipboard-plus-outline</v-icon>
      <v-icon>mdi-delete-circle-outline</v-icon>
    </v-system-bar>
    <v-col cols="12" v-for="note in notes" :key="note.id">
      <note :note="note"/>
    </v-col>
  </v-card>
</template>
<script>
export default {
  name: 'Notes',
  components: {
    Note: () => import('./Note')
  },
  props: ['notes'],
  methods: {
    addNote () {
      this.notes.splice(0, 0, {
        title: '',
        content: ''
      })
    }
  }
}
</script>
