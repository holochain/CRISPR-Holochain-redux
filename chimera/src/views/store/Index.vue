<template>
  <section>
    <v-toolbar flat>
      <v-btn icon to="/">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      Store
    </v-toolbar>
    <featured />

    <games />
  </section>
</template>

<script>
export default {
  components: {
    Featured: () => import('./Featured'),
    Games: () => import('./Games')
  },

  metaInfo () {
    return {
      title: this.$i18n.t('Home.title')
    }
  },

  data: () => ({

  })
}
</script>
