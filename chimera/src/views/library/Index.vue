<template>
  <section>
    <v-toolbar flat>
      <v-btn icon to="/">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Apps</span>
      <v-spacer></v-spacer>
      <v-btn text @click="showProfile = 'true'">
        <v-icon>mdi-account</v-icon>
        Profiles
      </v-btn>
      <v-btn text to="/personas">
        <v-icon>mdi-account</v-icon>
        Personas
      </v-btn>
    </v-toolbar>
    <v-divider />
    <games :showProfile="showProfile"/>
  </section>
</template>
<script>
export default {
  name: 'Library',
  components: {
    Games: () => import('./Games')
  },
  data () {
    return {
      showProfile: false
    }
  }
}
</script>
