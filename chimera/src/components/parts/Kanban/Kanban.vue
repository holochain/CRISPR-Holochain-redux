<template>
  <v-card class="mx-auto" color="accent" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-piano</v-icon>
      <span class="subtitle">{{title}} Board</span>
      <v-spacer></v-spacer>
      <v-icon @click="fetchColumns(base)">mdi-refresh</v-icon>
      <v-icon @click="newColumn = true">mdi-table-column-plus-after</v-icon>
      <part-manager :base="base" @add-part="addPart" @accept-invite="acceptInvite" @reject-invite="rejectInvite"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to the Kanban board.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Drag & Drop Notes between columns.
      Click <v-icon>mdi-table-column-plus-after</v-icon> to add a new column.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-table-column-remove</v-icon> on a column to remove that column.
    </v-alert>
    <v-row class="pl-1 pr-1">
      <v-col v-for="column in columns" :key="column.id">
        <notes-kanban-column :key="column.id" :base="base" :column="column">
        </notes-kanban-column>
      </v-col>
      <v-col v-if="newColumn">
        <v-card class="mx-auto" max-width="520" color="secondary" dark>
          <v-system-bar color="indigo darken-2" dark>
            <v-icon>mdi-note-multiple-outline</v-icon>
            <span class="subtitle">{{title}}</span>
            <v-spacer></v-spacer>
          </v-system-bar>
          <v-text-field class="ml-2 white--text" v-model="newColumnTitle" label="Column Title" @keydown.enter="saveColumn({ base: base, column: { title: newColumnTitle, order: columns.length}}); newColumn=false" append-icon="mdi-content-save" @click:append="saveColumn({ base: base, column: { title: newColumnTitle, order: columns.length}}); newColumn=false"/>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Kanban',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    NotesKanbanColumn: () => import('@/components/parts/Kanban/NotesKanbanColumn')
  },
  props: ['base', 'title'],
  data () {
    return {
      newColumn: false,
      newColumnTitle: '',
      help: false
    }
  },
  methods: {
    ...mapActions('kanban', ['fetchColumns', 'saveColumn', 'acknowledgeErrors', 'agentAddress', 'fetchProfiles']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('kanban', ['listColumns']),
    columns () {
      return this.listColumns(this.base)
    }
  },
  created () {
    this.fetchColumns(this.base)
    this.fetchProfiles()
    this.agentAddress()
  }
}
</script>
