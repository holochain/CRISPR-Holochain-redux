<template>
  <v-app-bar
    app
    color="transparent"
    flat
  >
    <v-app-bar-nav-icon @click="toggleDrawer" />
  </v-app-bar>
</template>

<script>
// Utilities
import {
  mapMutations
} from 'vuex'

export default {
  name: 'CoreAppBar',

  methods: {
    ...mapMutations('app', ['toggleDrawer'])
  }
}
</script>
