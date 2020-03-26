<template>
  <v-app>
    <v-container fluid>
       <router-view />
    </v-container>
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
