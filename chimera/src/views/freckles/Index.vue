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
      Click the <v-icon>mdi-plus</v-icon> to write a new freckle.
    </v-alert>
    <v-row no-gutters>
      <!-- <v-col v-for="instance in instances" :key="instance.id" cols="12" md="6" lg="4">
        <draggable-column :isDraggable="false" :key="instance.id" :contentInstance="instance" :title="instance.instanceName" contentBase="" :hasProfile="true"/>
      </v-col> -->
      <v-col cols="12">
        <draggable-column v-if="instance" :isDraggable="false" :key="instance.id" :contentInstance="instance" :title="instance.instanceName" contentBase="" :hasProfile="true"/>
      </v-col>
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
      help: false
    }
  },
  computed: {
    ...mapGetters('instancemanager', ['listInstances']),
    instance () {
      return this.listInstances('Freckles').find(i => i.instanceId === this.$route.params.instanceId)
    }
  }
}
</script>
