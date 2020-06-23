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
    this.setGroup({ instanceId: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce', instanceName: 'My Friends' })
    this.fetchProfiles({ zome: 'freckles', type: 'freckle', instanceId: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce', instanceName: 'My Friends', base: '' })
    this.agentAddress({ zome: 'freckles', type: 'freckle', instanceId: '0098d2a1-5668-4a5a-8ef8-503d58dd38ce', instanceName: 'My Friends', base: '' })
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
