<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Projects</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row no-gutters>
      <v-col v-for="(project) in projects" :key="project.name" cols="12" sm="6" md="4">
        <holochain-project :project="project"/>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Projects',
  components: {
    HolochainProject: () => import('./HolochainProject')
  },
  computed: {
    ...mapGetters('portfolio', ['projects'])
  }
}
</script>
