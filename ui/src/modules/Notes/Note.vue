<template>
  <v-card class="mx-auto" max-width="500" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-circle-edit-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveNote">mdi-content-save</v-icon>
      <v-icon @click="deleteNote">mdi-delete-circle-outline</v-icon>
    </v-system-bar>
    <v-card-title v-if="!isEditing">{{note.title}}</v-card-title>
    <v-text-field v-if="isEditing" class="ml-2 white--text" v-model="note.title" label="Title" />
    <v-card-text>{{note.content}}</v-card-text>
    <task-manager :tasks="note.tasks"/>
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
      isEditing: this.note.id === '',
      holochainConnection: {}
    }
  },
  methods: {
    saveNote () {
      if (this.note.id === '' || this.note.id === undefined) {
        makeHolochainCall(this.holochainConnection, 'notes/notes/create_note', { note_input: { title: this.note.title, content: this.note.content } }, (result) => {
          console.log(result.Ok)
          const newNote = result.Ok
          this.note.id = newNote.id
          this.note.createdAt = newNote.createdAt
          this.note.address = newNote.address
        })
      } else {
        makeHolochainCall(this.holochainConnection, 'notes/notes/update_note', { id: this.note.id, created_at: this.note.createdAt, address: this.note.address, note_input: { title: this.note.title, content: this.note.content } }, (result) => {
          console.log(result)
        })
      }
      this.isEditing = false
    },
    deleteNote () {
      makeHolochainCall(this.holochainConnection, 'notes/notes/delete_note', { id: this.note.id, created_at: this.note.createdAt, address: this.note.address }, (result) => {
        console.log(result)
      })
    }
  },
  created () {
    this.holochainConnection = connect({ url: 'ws://localhost:33000' })
  }
}
</script>
