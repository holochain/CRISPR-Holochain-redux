<template>
  <v-list-item class="mx-n3">
    <v-progress-circular color="green" size="48" value="45" rotate="20">
      <v-list-item-avatar class="ml-4">
        <v-img :src="require('@/assets/avatars/philip.beadle.png')" />
      </v-list-item-avatar>
    </v-progress-circular>
    <v-list-item-content>
      <v-list-item-title>Philip Beadle</v-list-item-title>
      <v-list-item-subtitle>@philt3r</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn icon to="/library/true" >
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
// Utilities
import {
  mapActions
} from 'vuex'

export default {
  name: 'FriendsLoggedIn',

  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
