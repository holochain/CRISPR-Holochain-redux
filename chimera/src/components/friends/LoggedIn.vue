<template>
  <v-list-item class="mx-n3">
    <v-progress-circular color="green" size="48" value="45" rotate="20">
      <v-list-item-avatar class="ml-4">
        <v-img :src="profile.info.avatar" />
      </v-list-item-avatar>
    </v-progress-circular>
    <v-list-item-content>
      <v-list-item-title>{{profile.name}}</v-list-item-title>
      <v-list-item-subtitle>{{profile.info.name}}</v-list-item-subtitle>
    </v-list-item-content>
    <!-- <v-list-item-action>
      <v-btn icon :to="`/profile-site/${profile.id}`" >
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </v-list-item-action> -->
  </v-list-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'FriendsLoggedIn',
  methods: {
    ...mapActions('auth', ['logout'])
  },
  computed: {
    ...mapGetters('friends', ['agentProfile']),
    ...mapGetters('personalInformation', ['profileByDna']),
    profile () {
      console.log(this.agentProfile)
      if (this.agentProfile) {
        return this.agentProfile
      } else {
        return {
          id: '',
          agentAddress: '',
          name: '',
          online: true,
          info: {
            id: 10,
            avatar: '',
            name: ''
          },
          notifications: 0,
          value: 0,
          start: 0
        }
      }
    }
  }
}
</script>
