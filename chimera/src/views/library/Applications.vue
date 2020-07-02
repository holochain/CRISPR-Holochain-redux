<template>
  <v-row class="pl-2">
    <v-col v-for="happ in happs" :key="happ.id" cols="12" sm="6" lg="3">
      <holochain-application :value="happ" :understate="!happ.installed" dense static show-action :showProfile="showProfile" />
    </v-col>
  </v-row>
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
