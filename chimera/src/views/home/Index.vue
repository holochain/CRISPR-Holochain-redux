<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">News</span>
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
