<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Apps</span>
      <v-spacer></v-spacer>
      <v-btn text to="/personas">
        <v-icon>mdi-account</v-icon>
        Personas
      </v-btn>
    </v-toolbar>
    <v-divider />
    <h2>Holochain Applications</h2>
    <applications :showProfile="showProfile"/>
    <v-divider />
    <h2>Chimera Parts</h2>
    <parts :showProfile="showProfile"/>
    </section>
</template>
<script>
export default {
  name: 'Library',
  components: {
    Applications: () => import('./Applications'),
    Parts: () => import('./Parts')
  },
  data () {
    return {
      showProfile: false
    }
  }
}
</script>
