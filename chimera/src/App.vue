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
    this.$store.subscribe((mutation, state) => {
      console.log('listen for mutations')
      console.log(mutation.type)
      if (mutation.type === 'knowledgeBaseStore/updateEntry') {
        console.log('updateEntry')
        console.log('and if they are made by this agent then send WebRTC data')
        console.log('eg knowledgeBaseStore/updateEntry send knowledgeBaseStore/updateEntryReceiver with mutation.payload')
        console.log('this.rtc.send(\'instanceId\', { mutation.payload })')
        console.log(mutation.type)
        console.log(mutation.payload)
        console.log('channel to send on is instanceId in mutation.payload.instance for datachannelMessage (instanceId, message) { updateEntryReceiver')
        console.log('use instanceId to get instance')
        mutation.type = `${mutation.type}Receiver`
        // this.sendMutation(mutation)
        console.log('offline catch up --> git pull changes from "server" can rebuild Holochain private entries??? from entry files')
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
