<template>
  <v-card class="mx-auto" color="accent" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-note-multiple-outline</v-icon>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="newColumn = true">mdi-note-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-row>
      <v-col cols="12" md="4" v-for="column in columns" :key="column.id">
        <kanban-column :key="column.id" :column="column"/>
      </v-col>
      <v-col cols="12" md="4" v-if="newColumn">
        <v-card class="mx-auto" max-width="520" color="secondary" dark>
          <v-system-bar color="indigo darken-2" dark>
            <v-icon>mdi-note-multiple-outline</v-icon>
            <span class="subtitle">{{title}}</span>
            <v-spacer></v-spacer>
            <v-icon @click="add">mdi-note-plus-outline</v-icon>
            <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
          </v-system-bar>
          <v-text-field class="ml-2 white--text" v-model="newColumnTitle" label="Column Title" @keydown.enter="saveColumn({ base: base, column: { title: newColumnTitle, order: 1}}); newColumn=false" append-icon="mdi-content-save" @click:append="saveColumn({ base: base, column: { title: newColumnTitle, order: 1}}); newColumn=false"/>
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
    add () {
      this.columns.splice(0, 0, {
        title: '',
        order: this.columns.length
      })
      console.log('add', this.columns)
    },
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
