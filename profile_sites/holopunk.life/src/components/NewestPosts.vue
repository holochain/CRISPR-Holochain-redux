<template>
  <v-container class="pa-0">
    <base-subheading>Newest Blog Posts</base-subheading>

    <v-row
      v-for="(article, i) in articles.slice(11, 14)"
      :key="i"
      align="center"
      class="mb-2"
    >
      <v-col
        class="d-flex"
        cols="12"
      >
        <v-img
          :src="require(`@/assets/articles/${article.hero}`)"
          class="mr-3"
          height="36"
          max-width="36"
        />

        <div>
          <div class="subheading">
            Article Title
          </div>

          <div class="caption">
            Date
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'

  export default {
    name: 'NewestPosts',

    computed: {
      ...mapState(['articles']),
    },
  }
</script>
