<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-table-column</v-icon>
      <span class="subtitle">{{column.title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-note-plus-outline</v-icon>
      <v-icon @click="deleteColumn({ base: base, column: column})">mdi-table-column-remove</v-icon>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Click <v-icon>mdi-note-plus-outline</v-icon> to add a new Note.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-table-column-remove</v-icon> to remove this column.
    </v-alert>
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
    <draggable v-model="notes" :id="column.id" :animation="200" ghost-class="ghost-card" group="notes" class="pa-1" :move="move">
      <note v-for="note in notes" :key="note.id" :base="column.id" :note="note" class="mb-1 cursor-move">
        <!-- <task-manager v-if="note.id !== 'new'" :key="note.id" :base="note.id" /> -->
      </note>
      <slot></slot>
    </draggable>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
export default {
  name: 'KanbanColumn',
  components: {
    // TaskManager: () => import('../Tasks/Tasks'),
    Note: () => import('../Notes/Note'),
    draggable
  },
  props: ['base', 'column'],
  data () {
    return {
      help: false
    }
  },
  methods: {
    add () {
      this.notes.splice(0, 0, {
        id: 'new',
        title: '',
        content: '',
        order: 0
      })
    },
    move (evt) {
      if (evt.from.id !== evt.to.id) {
        console.log(evt.draggedContext.element.id)
        console.log(evt.draggedContext.element.createdAt)
        console.log(evt.from.id)
        console.log(evt.to.id)
        this.rebase({ from: evt.from.id, to: evt.to.id, id: evt.draggedContext.element.id, createdAt: evt.draggedContext.element.createdAt })
      }
    },
    ...mapActions('notes', ['fetchNotes', 'rebase', 'acknowledgeErrors']),
    ...mapActions('kanban', ['deleteColumn'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('notes', ['errors']),
    ...mapGetters('notes', ['listNotes', 'listErrors']),
    notes: {
      get () {
        return this.listNotes(this.column.id)
      },
      set (val) {
        const newOrder = val.map((note, index) => ({
          ...note,
          order: index
        }))
        this.$store.dispatch('notes/order', { base: this.column.id, notes: newOrder })
      }
    },
    errors () {
      return this.listErrors(this.column.id)
    },
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  created () {
    this.fetchNotes(this.column.id)
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 80px;
  background: red;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
