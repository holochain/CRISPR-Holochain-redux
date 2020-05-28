<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-calendar-plus</v-icon>
      <part-manager :base="base" @add-part="addPart" @accept-invite="acceptInvite" @reject-invite="rejectInvite"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to the Kanban board.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
    </v-alert>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(base)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-col cols="12" v-for="origin in origins" :key="origin.id">
      <origin :key="origin.id" :base="base" :origin="origin">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-avatar left v-if="chimera">
              <v-icon small v-on="on">mdi-dna</v-icon>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </origin>
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Origins',
  components: {
    Origin: () => import('./Origin')
  },
  props: ['base', 'title'],
  data () {
    return {}
  },
  methods: {
    add () {
      this.origins.splice(0, 0, {
        content: ''
      })
    },
    ...mapActions('origins', ['fetchOrigins', 'acknowledgeErrors'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('origins', ['errors']),
    ...mapGetters('origins', ['listOrigins', 'listErrors']),
    notes () {
      return this.listOrigins(this.base)
    },
    errors () {
      return this.listErrors(this.base)
    }
  },
  created () {
    this.fetchOrigins(this.base)
  }
}
</script>
