<template>
  <v-card flat class="mx-auto" dark>
    <v-alert v-if="errors" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="resetErrors({ instance: instance, base: base })">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-row no-gutters>
      <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" lg="3">
        <project :key="project.id" :instance="instance" :base="base" :project="project" :details="details" :showPartEditor="showPartEditor" />
      </v-col>
    </v-row>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Projects',
  components: {
    Project: () => import('./Project')
  },
  props: ['instance', 'base', 'title', 'details', 'showPartEditor'],
  methods: {
    ...mapActions('root', ['fetchEntries', 'resetErrors', 'agentAddress', 'fetchProfiles']),
    ...mapMutations('friends', ['setGroup'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('portfolio', ['listProjects']),
    projects () {
      return this.listProjects({ instance: this.instance, base: this.base })
    },
    ...mapState({
      errors (state) {
        return state.root.errors[`${this.instance.instanceId}${this.base}`]
      }
    })
  },
  created () {
    this.setGroup(this.instance)
    this.agentAddress(this.instance)
    this.fetchProfiles(this.instance)
    this.fetchEntries({ instance: this.instance, base: this.base })
  }
}
</script>
