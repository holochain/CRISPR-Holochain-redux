<template>
  <v-card class="mx-auto" max-width="520" dark>
    <v-system-bar color="indigo darken-2" dark>
      <span class="subtitle">{{instance.instanceName}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-plus</v-icon>
      <part-manager :base="instance.partBase" @add-part="addPart" @accept-invite="acceptInvite" @reject-invite="rejectInvite"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to the Kanban board.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click the <v-icon @click="add">mdi-plus</v-icon> to start a new Freckle.
    </v-alert>
    <v-alert v-if="errors" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="resetErrors(instance)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12" v-for="entry in entries" :key="entry.id">
        <component :is="instance.type" :key="entry.id" :instanceId="instance.instanceId" :base="instance.base" :partBase="instance.partBase" :entry="entry" />
      </v-col>
    </v-row>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Column',
  components: {
    PartManager: () => import('@/components/chimera/PartManager')
  },
  props: ['instance'],
  data () {
    return {
      help: false
    }
  },
  methods: {
    add () {
      this.instance.entry.id = 'new'
      this.entries.splice(0, 0, this.instance.entry)
    },
    ...mapActions('origins', ['fetchEntries', 'resetErrors', 'agentAddress', 'fetchProfiles']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite']),
    ...mapMutations('friends', ['setGroup'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      entries (state) {
        return state.origins.entries[`${this.instance.instanceId}${this.instance.base}`]
      },
      errors (state) {
        return state.origins.errors[`${this.instance.instanceId}${this.instance.base}`]
      }
    })
  },
  created () {
    this.setGroup(this.instance)
    this.agentAddress(this.instance)
    this.fetchProfiles(this.instance)
    this.fetchEntries(this.instance)
  }
}
</script>
