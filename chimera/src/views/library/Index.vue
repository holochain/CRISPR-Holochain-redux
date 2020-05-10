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
    <applications :showProfile="showProfile"/>
  </section>
</template>
<script>
export default {
  name: 'Library',
  components: {
    Applications: () => import('./Applications')
  },
  data () {
    return {
      showProfile: false
    }
  }
}
</script>
