<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-freckle-multiple-outline</v-icon>
      <span class="subtitle">{{instanceName}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-freckle-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
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
    <v-col cols="12" v-for="freckle in freckles" :key="freckle.id">
      <freckle :key="freckle.id" :instanceId="instanceId" :base="base" :partBase="base" :freckle="freckle">
      </freckle>
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Freckles',
  components: {
    Freckle: () => import('./Freckle')
  },
  props: ['instanceId', 'instanceName', 'base'],
  data () {
    return {
      instanceBase: { instanceId: this.instanceId, instanceName: this.instanceName, base: this.base }
    }
  },
  methods: {
    add () {
      this.freckles.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    ...mapActions('freckles', ['fetchFreckles', 'acknowledgeErrors']),
    ...mapActions('freckles', ['agentAddress', 'fetchProfiles'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('freckles', ['errors']),
    ...mapGetters('freckles', ['listFreckles', 'listErrors']),
    freckles () {
      return this.listFreckles(this.instanceBase)
    },
    errors () {
      return this.listErrors(this.instanceBase)
    }
  },
  created () {
    this.agentAddress(this.instanceId)
    this.fetchProfiles(this.instanceBase)
    this.fetchFreckles(this.instanceBase)
  }
}
</script>
