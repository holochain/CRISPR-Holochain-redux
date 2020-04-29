<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <span class="subtitle">Title</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-note-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-alert v-if="errorAlert" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{error}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="errorAlert = false">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-col cols="12" v-for="note in notes" :key="note.id">
      <note :note="note" @note-updated="updated" @note-updated-failed="noteUpdateFailed" @note-deleted="noteDeleted" @note-deleted-failed="noteDeleteFailed">
        <task-manager :key="note.id" :base="note.id" />
      </note>
    </v-col>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Notes',
  components: {
    Note: () => import('./Note'),
    // NoteProseMirror: () => import('./NoteProseMirror')
    TaskManager: () => import('../Tasks/Tasks')
  },
  props: ['base', 'title'],
  data () {
    return {
      errorAlert: false,
      error: ''
    }
  },
  methods: {
    add () {
      this.notes.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    updated () {

    },
    noteUpdateFailed (error) {
      this.error = error
      this.errorAlert = true
    },
    noteDeleteFailed (error) {
      this.error = error
      this.errorAlert = true
    },
    noteDeleted (note) {
      const index = this.notes.findIndex(n => n.id === note.id)
      this.notes.splice(index, 1)
    },
    ...mapActions('notes', ['fetchNotes'])
  },
  computed: {
    ...mapGetters('notes', ['listNotes']),
    notes () {
      return this.listNotes(this.base)
    }
  },
  created () {
    this.fetchNotes(this.base)
  }
}
</script>
