<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <span class="subtitle">To Do</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-note-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-col cols="12" v-for="note in notes" :key="note.id">
      <note :note="note" @note-updated="updated" @note-deleted="deleted"/>
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
    add () {
      this.notes.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    updated () {

    },
    deleted (note) {
      const index = this.notes.findIndex(n => n.id === note.id)
      console.log('delete', note, index)
      this.notes.splice(index, 1)
    }
  }
}
</script>
