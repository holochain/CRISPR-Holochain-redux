<template>
  <v-card class="mx-auto" color="accent" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-piano</v-icon>
      <span class="subtitle">{{title}} Board</span>
      <v-spacer></v-spacer>
      <v-icon @click="fetchEntries({ instance: this.instance, base: this.base })">mdi-refresh</v-icon>
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
        <draggable-column :isDraggable="true" :key="column.id" :instance="noteInstance" :title="column.title" :base="column.id"/>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Kanban',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    DraggableColumn: () => import('@/components/lists/DraggableColumn')
  },
  props: ['instance', 'base', 'title'],
  data () {
    return {
      noteInstance: { zome: 'notes', type: 'note', instanceId: 'a23de7fe-bff7-4e6e-87f0-f4c44d038888', partBase: 'a23de7fe-bff7-4e6e-87f0-f4c44d038888', instanceName: 'All Notes', entry: { title: '', content: '' } },
      newColumn: false,
      newColumnTitle: '',
      help: false
    }
  },
  methods: {
    ...mapActions('origins', ['fetchEntries', 'resetErrors']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      columns (state) {
        return this.$store.state.origins.entries[`${this.instance.instanceId}${this.base}`]
      }
    })
  },
  created () {
    this.fetchEntries({ instance: this.instance, base: this.base })
  }
}
</script>
