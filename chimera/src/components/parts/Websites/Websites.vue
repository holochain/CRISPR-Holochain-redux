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
    <v-col cols="12" v-for="website in websites" :key="website.id">
      <website :key="website.id" :base="base" :website="website">
      </website>
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Websites',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    Website: () => import('./Website')
  },
  props: ['base', 'title'],
  data () {
    return {
      help: false
    }
  },
  methods: {
    add () {
      this.websites.splice(0, 0, {
        id: 'new',
        content: ''
      })
    },
    ...mapActions('websites', ['fetchWebsites', 'acknowledgeErrors', 'agentAddress', 'fetchProfiles']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('websites', ['errors']),
    ...mapGetters('websites', ['listWebsites', 'listErrors']),
    websites () {
      return this.listWebsites(this.base)
    },
    errors () {
      return this.listErrors(this.base)
    }
  },
  created () {
    this.agentAddress()
    this.fetchProfiles()
    this.fetchWebsites(this.base)
  }
}
</script>
