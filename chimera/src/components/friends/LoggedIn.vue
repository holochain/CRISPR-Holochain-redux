<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="require('@/assets/avatars/philip.beadle.png')" />
    </v-list-item-avatar>

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
