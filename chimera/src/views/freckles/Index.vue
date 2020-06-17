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
      <v-col v-for="instance in instances" :key="instance.id" cols="12" md="6" lg="4">
        <freckles :instanceId="instance.instanceId" base="" :instanceName="instance.instanceName"/>
      </v-col>
      <!-- <v-col cols="12" md="6" lg="4">
        <tasks :instance="instance" base="a note id" title="name of the instance"/>
      </v-col> -->
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FrecklesView',
  components: {
    Freckles: () => import('@/components/parts/Freckles/Freckles')
  },
  data () {
    return {
      help: false
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
