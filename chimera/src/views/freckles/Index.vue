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
        <freckle key="new" :freckle="newFreckle" placeholder="What's your freckle?"/>
      </v-col>
      <v-col v-for="(freckle) in freckles" :key="freckle.id" cols="12" md="6" lg="4">
        <freckle :key="freckle.id" partBase="QmHashyFreckles" :freckle="freckle"/>
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
      help: false,
      newFreckle: {
        id: 'new',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions('freckles', ['agentAddress', 'fetchProfiles', 'fetchFreckles'])
  },
  computed: {
    ...mapGetters('freckles', ['listFreckles']),
    freckles () {
      return this.listFreckles('')
    }
  },
  created () {
    this.fetchProfiles()
    this.fetchFreckles('')
    this.agentAddress()
  }
}
</script>
