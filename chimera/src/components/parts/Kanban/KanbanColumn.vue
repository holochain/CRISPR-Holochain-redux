<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <v-icon @click="deleteColumn({ column: column})">mdi-delete-outline</v-icon>
      <span class="subtitle">{{column.title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-note-plus-outline</v-icon>
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
    <draggable class="list-group" tag="v-layout" v-model="notes" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
      <transition-group type="transition" :name="'flip-list'">
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
            <task-manager v-if="note.id !== 'new'" :key="note.id" :base="note.id" />
          </note>
        </v-col>
      </transition-group>
    </draggable>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
export default {
  name: 'KanbanColumn',
  components: {
    TaskManager: () => import('../Tasks/Tasks'),
    Note: () => import('../Notes/Note'),
    draggable
  },
  props: ['column'],
  data () {
    return {
      items: [
        { title: 'Tasks' },
        { title: 'Ratings' },
        { title: 'Comments' }
      ],
      editable: true,
      isDragging: false,
      delayedDragging: false
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
      console.log(this.notes)
    },
    ...mapActions('notes', ['fetchNotes', 'acknowledgeErrors']),
    ...mapActions('kanban', ['deleteColumn']),
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('notes', ['errors']),
    ...mapGetters('notes', ['listNotes', 'listErrors']),
    notes: {
      get () {
        console.log(this.listNotes(this.column.id))
        return this.listNotes(this.column.id)
      },
      set (val) {
        val.map((note, index) => ({
          ...note,
          order: index
        }))
        console.log(val)
        this.$store.dispatch('notes/order', { base: this.column.id, notes: val })
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
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
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
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
