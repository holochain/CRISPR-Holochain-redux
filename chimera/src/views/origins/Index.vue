<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Origins</span>
      <v-spacer></v-spacer>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Write a new freckle in the open editor.
    </v-alert>
    <v-row no-gutters>
      <v-col v-for="instance in instances" :key="instance.id" cols="12" md="6" lg="4">
        <column :instance="instance" base="" :title="instance.instanceName"/>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'OriginsView',
  components: {
    Column: () => import('@/components/lists/Column')
  },
  data () {
    return {
      help: false
    }
  },
  computed: {
    ...mapGetters('instancemanager', ['listInstances']),
    instances () {
      return this.listInstances('Origins')
    }
  }
}
</script>
