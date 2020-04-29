<template>
  <v-card class="mx-auto" max-width="500" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveNote, isEditing = false">mdi-content-save</v-icon>
      <v-icon @click="deleteNote">mdi-delete-outline</v-icon>
    </v-system-bar>
    <v-card-title v-if="!isEditing">{{instanceNote.title}}</v-card-title>
    <v-text-field v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.title" label="Title" />
    <v-card-text v-if="!isEditing">{{instanceNote.content}}</v-card-text>
    <v-textarea v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.content" label="Content" />
    <slot></slot>
    <v-avatar left v-if="chimeraOn">
      <v-icon small @click="addPart">mdi-dna</v-icon>
    </v-avatar>
    <v-chip v-if="chimeraOn" class="ma-2" close color="teal" text-color="white" close-icon="mdi-biohazard" @click:close="close">
      <v-avatar left>
        <v-icon small @click="acceptInvite">mdi-dna</v-icon>
      </v-avatar>
      Tasks - Art Brock
    </v-chip>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Note',
  components: {
  },
  props: ['note'],
  data () {
    return {
      instanceNote: {},
      clean: {},
      isEditing: false
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
    ...mapState('auth', ['chimeraOn'])
  }
}
</script>
