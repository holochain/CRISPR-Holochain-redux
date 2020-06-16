<template>
  <v-card class="mx-auto" max-width="520" dark>
    <v-system-bar color="indigo darken-2" dark>
      <span class="subtitle">{{instanceName}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-plus</v-icon>
      <part-manager :base="base" @add-part="addPart" @accept-invite="acceptInvite" @reject-invite="rejectInvite"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to the Kanban board.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click the <v-icon @click="add">mdi-plus</v-icon> to start a new Freckle.
    </v-alert>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(instanceBase)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12" v-for="freckle in freckles" :key="freckle.id">
        <freckle :key="freckle.id" :instanceId="instanceId" :base="base" :partBase="base" :freckle="freckle">
        </freckle>
      </v-col>
    </v-row>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Freckles',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    Freckle: () => import('./Freckle')
  },
  props: ['instanceId', 'instanceName', 'base'],
  data () {
    return {
      help: false,
      instanceBase: { instanceId: this.instanceId, instanceName: this.instanceName, base: this.base }
    }
  },
  methods: {
    add () {
      this.freckles.splice(0, 0, {
        id: 'new',
        content: ''
      })
    },
    ...mapActions('freckles', ['fetchFreckles', 'acknowledgeErrors', 'agentAddress', 'fetchProfiles']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite']),
    ...mapMutations('friends', ['setGroup'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('freckles', ['listFreckles', 'listErrors']),
    freckles () {
      return this.listFreckles(this.instanceBase)
    },
    errors () {
      return this.listErrors(this.instanceBase)
    }
  },
  created () {
    this.setGroup(this.instanceBase)
    this.agentAddress(this.instanceId)
    this.fetchProfiles(this.instanceBase)
    this.fetchFreckles(this.instanceBase)
  }
}
</script>
