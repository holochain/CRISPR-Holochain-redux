<template>
  <v-menu open-on-hover top offset-y>
    <template v-slot:activator="{ on }">
      <v-btn bottom color="secondary" fab fixed right style="z-index: 9" @click="toggleDrawer" v-on="on">
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(group, index) in groups" :key="index" @click="setFriendsList(group.name)">
        <v-list-item-title>{{ group.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
// Utilities
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CoreFab',
  methods: {
    ...mapMutations('friends', ['toggleDrawer', 'setDrawer', 'setGroup']),
    setFriendsList (name) {
      this.setDrawer()
      this.setGroup(name)
    }
  },
  computed: {
    ...mapGetters('friends', ['allGroups']),
    groups () {
      return this.allGroups
    }
  }
}
</script>
