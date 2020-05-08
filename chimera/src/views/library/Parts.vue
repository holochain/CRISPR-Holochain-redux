<template>
  <v-container>
    <v-row>
      <v-col v-for="part in parts" :key="part.id" cols="12" sm="6" md="4">
        <holochain-part :value="part" :understate="!part.installed" dense static show-action :showProfile="showProfile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Parts',
  components: {
    HolochainPart: () => import('@/components/HolochainPart')
  },
  props: ['showProfile'],
  computed: {
    ...mapGetters('library', ['parts'])
  }
}
</script>
<style scoped>
.v-sheet {
  cursor: pointer;
}
</style>
