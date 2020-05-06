<template>
  <v-card class="mx-auto" max-width="500" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveNote({ base: base, note: instanceNote}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteNote({ base: base, note: instanceNote})">mdi-delete-outline</v-icon>
    </v-system-bar>
    <v-card-title v-if="!isEditing">{{instanceNote.title}}</v-card-title>
    <v-text-field v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.title" label="Title" />
    <v-card-text v-if="!isEditing">{{instanceNote.content}}</v-card-text>
    <v-textarea v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.content" label="Content" />
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Note',
  components: {
  },
  props: ['base', 'note'],
  data () {
    return {
      instanceNote: {},
      clean: {},
      isEditing: this.note.id === 'new'
    }
  },
  methods: {
    close () {
      alert('Chip close clicked')
    },
    acceptInvite () {
      alert('Accept the invite')
    },
    addPart () {
      alert('Add a new part like Tasks')
    },
    ...mapActions('notes', ['saveNote', 'deleteNote'])
  },
  created () {
    this.clean = { ...this.note }
    this.instanceNote = { ...this.note }
  },
  computed: {
    ...mapState('auth', ['chimera'])
  }
}
</script>
