<template>
  <v-card class="mx-auto" color="accent" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="newColumn = true">mdi-note-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-row class="pl-1 pr-1">
      <v-col v-for="column in columns" :key="column.id">
        <kanban-column :key="column.id" :column="column"/>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Kanban',
  components: {
    KanbanColumn: () => import('@/components/parts/Kanban/KanbanColumn')
  },
  props: ['base', 'title'],
  data () {
    return {
      newColumn: false,
      newColumnTitle: ''
    }
  },
  methods: {
    ...mapActions('kanban', ['fetchColumns', 'saveColumn', 'acknowledgeErrors'])
  },
  computed: {
    ...mapGetters('kanban', ['listColumns']),
    columns () {
      return this.listColumns(this.base)
    }
  },
  created () {
    this.fetchColumns(this.base)
  }
}
</script>
