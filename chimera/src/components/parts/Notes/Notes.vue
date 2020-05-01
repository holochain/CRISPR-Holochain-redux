<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-note-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(base)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-col cols="12" v-for="note in notes" :key="note.id">
      <note :key="note.id" :base="base" :note="note">
        <task-manager v-if="note.id" :key="note.id" :base="note.id" />
      </note>
    </v-col>
    <slot></slot>
    <v-avatar left v-if="chimera">
      <v-icon small @click="addPart">mdi-dna</v-icon>
    </v-avatar>
    <v-chip v-if="chimera" class="ma-2" close color="teal" text-color="white" close-icon="mdi-biohazard" @click:close="close">
      <v-avatar left>
        <v-icon small @click="acceptInvite">mdi-dna</v-icon>
      </v-avatar>
      Tasks - Art Brock
    </v-chip>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Notes',
  components: {
    TaskManager: () => import('../Tasks/Tasks'),
    Note: () => import('./Note')
    // NoteProseMirror: () => import('./NoteProseMirror')
  },
  props: ['base', 'title'],
  methods: {
    add () {
      console.log('this.notes', this.notes)
      this.notes.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    ...mapActions('notes', ['fetchNotes', 'acknowledgeErrors'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('notes', ['errors']),
    ...mapGetters('notes', ['listNotes', 'listErrors']),
    notes () {
      return this.listNotes(this.base)
    },
    errors () {
      return this.listErrors(this.base)
    }
  },
  created () {
    this.fetchNotes(this.base)
  }
}
</script>
