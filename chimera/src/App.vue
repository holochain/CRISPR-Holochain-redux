<template>
  <v-app class="grey darken-4">
    <core-drawer />
    <core-view />
    <core-friends />
    <core-snackbar />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
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
    ...mapActions('fieldNames', ['fetchFields'])
  },
  created () {
    console.log('fetch fields')
    this.fetchFields()
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
