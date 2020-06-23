<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Freckles</span>
      <v-spacer></v-spacer>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Write a new freckle in the open editor.
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12" md="6" lg="4">
        <draggable-column key="QmFreckles1" :instance="instance" title="My Freckles" base="" :hasProfile="true"/>
      </v-col>
      <!-- <v-col cols="12" md="6" lg="4">
        <draggable-column :isDraggable="true" key="origin1" :instance="instanceOrigin" title="Broadcast" base="" :hasProfile="true"/>
      </v-col> -->
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FrecklesView',
  components: {
    DraggableColumn: () => import('@/components/lists/DraggableColumn')
  },
  data () {
    return {
      help: false,
      instance: { zome: 'freckles', type: 'freckle', instanceId: '0d765fcf-118f-4122-8f03-f5f9ba74e7fa', partBase: '0d765fcf-118f-4122-8f03-f5f9ba74e7fa', instanceName: 'My Freckles', entry: { content: '' } },
      instanceOrigin: { zome: 'origins', type: 'origin', instanceId: '57c01ed8-30ae-4fca-b6f9-40192821fed2', partBase: '57c01ed8-30ae-4fca-b6f9-40192821fed2', instanceName: 'Broadcast', entry: { content: '' } }
    }
  },
  computed: {
    ...mapGetters('instancemanager', ['listInstances']),
    instances () {
      return this.listInstances('Freckles')
    }
  }
}
</script>
