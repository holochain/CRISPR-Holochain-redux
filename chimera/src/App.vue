<template>
  <v-app class="grey darken-4">
    <core-drawer />
    <core-view />
    <core-friends />
    <core-snackbar />
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  components: {
    // CoreAppBar: () => import('@/components/core/AppBar'),
    // CoreDownloads: () => import('@/components/core/Downloads'),
    CoreDrawer: () => import('@/components/core/Drawer'),
    CoreFriends: () => import('@/components/core/Friends'),
    CoreSnackbar: () => import('@/components/core/Snackbar'),
    CoreView: () => import('@/components/core/View')
  },
  methods: {
    ...mapActions('fieldNames', ['fetchFields']),
    ...mapActions('personas', ['fetchPersonas']),
    ...mapActions('projects', ['fetchProjects']),
    ...mapActions('root', ['agentAddress', 'fetchProfiles']),
    ...mapMutations('friends', ['setGroup'])
  },
  created () {
    this.fetchFields()
    this.fetchPersonas()
    // this.setGroup({ instanceId: 'ef5ba968-0048-4135-b831-a86b615a89b2', instanceName: 'Holochain Projects' })
    // this.fetchProfiles({ zome: 'projects', type: 'project', instanceId: 'ef5ba968-0048-4135-b831-a86b615a89b2', instanceName: 'Holochain Projects', base: '' })
    // this.agentAddress({ zome: 'projects', type: 'project', instanceId: 'ef5ba968-0048-4135-b831-a86b615a89b2', instanceName: 'Holochain Projects', base: '' })
    this.$store.subscribe((mutation, state) => {
      if (mutation.type !== 'route/ROUTE_CHANGED') {
        // console.log(`Mutation -${mutation.type}`)
      }
    })
  }
}
</script>

<style>
.v-card {
  border-radius: 6px;
}
a {
  text-decoration: none;
}
</style>
