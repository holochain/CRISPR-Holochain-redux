<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Chimera Holochain Parts</span>
      <v-spacer></v-spacer>
    <v-icon @click="help=!help">mdi-help</v-icon>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Click on an part to get more information about it.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      You can personalise your Holochain experience by turning on Chimera mode in the <v-icon>mdi-head-cog-outline</v-icon> Settings. You will then be able to add any of the parts below to your applications and also accept invitations from others to share their part information. This means that the person sending you the invite will be sharing their Holochain DHT with you so you can share data.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      When you turn on Chimera mode you will see a <v-icon>mdi-dna</v-icon> icon on your applications where you can add new parts.
    </v-alert>
    <v-divider />
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
