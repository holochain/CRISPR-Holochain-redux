<template>
  <v-app>
    <v-content>
       <router-view />
    </v-content>
  </v-app>
</template>

<script>
// Utilities
export default {
  name: 'App'
}
</script>

<style>
  .v-card, .v-list {
    border-radius: 0;
  }
</style>
