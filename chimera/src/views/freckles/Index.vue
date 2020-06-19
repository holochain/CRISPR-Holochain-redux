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
        <column key="QmFreckles1" :instance="instance"/>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <column key="origin1" :instance="instanceOrigin"/>
      </v-col>
      <!-- <v-col v-for="instance in instances" :key="instance.id" cols="12" md="6" lg="4">
        <column :key="instance.id" :instance="{ zome: instance.zome, type: instance.type, instanceId: instance.instanceId, partBase:instance.instanceId, base:'', instanceName: instance.instanceName }"/>
      </v-col> -->
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FrecklesView',
  components: {
    Column: () => import('@/components/lists/Column')
  },
  data () {
    return {
      help: false,
      instance: { zome: 'freckles', type: 'freckle', instanceId: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce', partBase: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce', base: '', instanceName: 'My Friends Freckles', entry: { content: '' } },
      instanceOrigin: { zome: 'origins', type: 'origin', instanceId: '57c01ed8-30ae-4fca-b6f9-40192821fed2', partBase: '57c01ed8-30ae-4fca-b6f9-40192821fed2', base: '', instanceName: 'Broadcast', entry: { content: '' } }
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
