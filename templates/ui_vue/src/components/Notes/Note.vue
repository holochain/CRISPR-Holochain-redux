<template>
  <v-card class="mx-auto" max-width="500" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-circle-edit-outline</v-icon>
      <v-icon v-if="isEditing" @click="isEditing = false">mdi-content-save</v-icon>
      <v-icon>mdi-delete-circle-outline</v-icon>
    </v-system-bar>
    <v-card-title>{{note.title}}</v-card-title>
    <v-card-text>{{note.content}}</v-card-text>
    <task-manager :tasks="note.tasks"/>
  </v-card>
</template>
<script>
export default {
  name: 'Note',
  components: {
    TaskManager: () => import('../Tasks/Tasks')
  },
  props: ['note'],
  data () {
    return {
      isEditing: false
    }
  }
}
</script>
