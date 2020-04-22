<template>
  <section>
    <v-toolbar flat>
      <v-btn icon to="/">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      News
    </v-toolbar>
    <news />
  </section>
</template>

<script>
export default {
  name: 'Home',

  components: {
    News: () => import('./News')
  }
}
</script>
