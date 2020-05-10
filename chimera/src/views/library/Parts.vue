<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Apps</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider />
    <h2 class="pl-5">Chimera Parts</h2>
    <v-row>
      <v-col v-for="part in parts" :key="part.id" cols="12" sm="6" md="4">
        <holochain-part :value="part" :understate="!part.installed" dense static show-action />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Parts',
  components: {
    HolochainPart: () => import('@/components/HolochainPart')
  },
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
