<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <span class="subtitle">{{column.title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-note-plus-outline</v-icon>
      <v-icon @click="deleteColumn({ column: column})">mdi-delete-outline</v-icon>
    </v-system-bar>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(column.id)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-col cols="12" v-for="note in notes" :key="note.id">
      <note :key="note.id" :base="column.id" :note="note">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar left v-if="chimera">
              <v-icon small v-on="on">mdi-dna</v-icon>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <task-manager v-if="note.id" :key="note.id" :base="note.id" />
      </note>
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'KanbanColumn',
  components: {
    TaskManager: () => import('../Tasks/Tasks'),
    Note: () => import('../Notes/Note')
  },
  props: ['column'],
  data () {
    return {
      items: [
        { title: 'Tasks' },
        { title: 'Ratings' },
        { title: 'Comments' }
      ]
    }
  },
  methods: {
    add () {
      this.notes.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    ...mapActions('notes', ['fetchNotes', 'acknowledgeErrors']),
    ...mapActions('kanban', ['deleteColumn'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('notes', ['errors']),
    ...mapGetters('notes', ['listNotes', 'listErrors']),
    notes () {
      return this.listNotes(this.column.id)
    },
    errors () {
      return this.listErrors(this.column.id)
    }
  },
  created () {
    this.fetchNotes(this.column.id)
  }
}
</script>
