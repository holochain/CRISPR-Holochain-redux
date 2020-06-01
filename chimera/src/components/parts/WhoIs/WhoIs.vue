<template>
  <v-list-item v-if="whois" class="mx-n3">
    <v-progress-circular color="green" size="48" :value="whois.name" :rotate="whois.start">
      <v-list-item-avatar class="ml-4">
        <v-img :src="whois.info.avatar" />
      </v-list-item-avatar>
    </v-progress-circular>
    <v-list-item-content class="ml-4">
      <v-list-item-title>{{whois.name}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Whois',
  props: ['agent'],
  computed: {
    ...mapGetters('friends', ['friend', 'agentProfile']),
    whois () {
      if (this.agent) return this.friend(this.agent)
      return this.agentProfile
    }
  }
}
</script>
