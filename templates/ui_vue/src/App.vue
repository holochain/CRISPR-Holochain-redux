<template>
  <v-app>
    <v-content>
       <router-view />
    </v-content>
    <v-footer dark padless>
      <v-row no-gutters align="start">
        <v-col cols="12" justify="end" class="pl-1">
          <v-img width="250" :src="require('@/assets/POWERED_HOLOCHAIN_HORIZONTAL_WHITE.png')" />
        </v-col>
      </v-row>
    </v-footer>
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
