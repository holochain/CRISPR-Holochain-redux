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
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click to write a new freckle.
    </v-alert>
    <v-row no-gutters>
      <v-col v-for="(freckle) in freckles" :key="freckle.id" cols="12" sm="6" md="3" class="red">
        <freckle :key="freckle.id" :freckle="freckle"/>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Freckles',
  components: {
    Freckle: () => import('@/components/parts/Freckle/Freckle')
  },
  data () {
    return {
      help: false
    }
  },
  methods: {
    ...mapActions('freckles', ['fetchFreckles'])
  },
  computed: {
    ...mapGetters('freckles', ['listFreckles']),
    freckles () {
      return this.listFreckles('')
    }
  },
  created () {
    this.fetchFreckles('')
  }
}
</script>
