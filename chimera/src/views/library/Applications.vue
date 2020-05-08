<template>
  <v-container>
    <v-row>
      <v-col v-for="happ in happs" :key="happ.id" cols="12" sm="6" md="4">
        <holochain-application :value="happ" :understate="!happ.installed" dense static show-action :showProfile="showProfile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Applications',
  components: {
    HolochainApplication: () => import('@/components/HolochainApplication')
  },
  props: ['showProfile'],
  computed: {
    ...mapGetters('library', ['happs'])
  }
}
</script>
<style scoped>
.v-sheet {
  cursor: pointer;
}
</style>
