<template>
  <v-card class="mx-auto" max-width="500" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveNote">mdi-content-save</v-icon>
      <v-icon @click="deleteNote">mdi-delete-outline</v-icon>
    </v-system-bar>
    <v-card-title v-if="!isEditing">{{instanceNote.title}}</v-card-title>
    <v-text-field v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.title" label="Title" />
    <v-card-text v-if="!isEditing">{{instanceNote.content}}</v-card-text>
    <v-textarea v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.content" label="Content" />
    <task-manager :key="note.id" :base="note.id" />
  </v-card>
</template>
<script>
import { connect } from '@holochain/hc-web-client'
function makeHolochainCall (holochainConnection, callString, params, callback) {
  const [instanceId, zome, func] = callString.split('/')
  holochainConnection.then(({ callZome }) => {
    callZome(instanceId, zome, func)(params).then((result) => callback(JSON.parse(result)))
  })
}
export default {
  name: 'Note',
  components: {
    TaskManager: () => import('../Tasks/Tasks')
  },
  props: ['note'],
  data () {
    return {
      instanceNote: {},
      isEditing: this.note.id === undefined,
      holochainConnection: {},
      clean: {}
    }
  },
  methods: {
    saveNote () {
      if (this.instanceNote.id === '' || this.instanceNote.id === undefined) {
        makeHolochainCall(this.holochainConnection, 'notes/notes/create_note', { note_input: { title: this.instanceNote.title, content: this.instanceNote.content } }, (result) => {
          if (result.Ok === undefined) {
            this.$emit('note-created-failed', JSON.parse(result.Err.Internal).kind)
          } else {
            const newNote = result.Ok
            this.instanceNote.id = newNote.id
            this.instanceNote.createdAt = newNote.createdAt
            this.instanceNote.address = newNote.address
            this.instanceNote.updatedAt = newNote.updatedAt
            this.$emit('note-created', this.instanceNote)
          }
        })
      } else {
        makeHolochainCall(this.holochainConnection, 'notes/notes/update_note', { id: this.instanceNote.id, created_at: this.instanceNote.createdAt, address: this.instanceNote.address, note_input: { title: this.instanceNote.title, content: this.instanceNote.content } }, (result) => {
          if (result.Ok === undefined) {
            this.instanceNote = this.clean
            this.$emit('note-updated-failed', JSON.parse(result.Err.Internal).kind)
          } else {
            const newNote = result.Ok
            this.instanceNote.address = newNote.address
            this.instanceNote.updatedAt = newNote.updatedAt
            this.$emit('note-updated', this.instanceNote)
          }
        })
      }
      this.isEditing = false
    },
    deleteNote () {
      makeHolochainCall(this.holochainConnection, 'notes/notes/delete_note', { id: this.instanceNote.id, created_at: this.instanceNote.createdAt, address: this.instanceNote.address }, (result) => {
        console.log(result)
        if (result.Ok === undefined) {
          this.$emit('note-deleted-failed', JSON.parse(result.Err.Internal).kind)
        } else {
          this.$emit('note-deleted', this.instanceNote)
        }
      })
    }
  },
  created () {
    this.holochainConnection = connect({ url: 'ws://localhost:33000' })
    this.clean = { ...this.note }
    this.instanceNote = { ...this.note }
  }
}
</script>
