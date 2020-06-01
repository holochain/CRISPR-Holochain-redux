<template>
  <v-container
    id="social"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <instagram />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <newest-posts />
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <tags />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomeSocial',

    components: {
      NewestPosts: () => import('@/components/NewestPosts'),
      Instagram: () => import('@/components/Instagram'),
      Tags: () => import('@/components/Tags'),
    },
  }
</script>
