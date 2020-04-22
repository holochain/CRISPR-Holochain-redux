<template>
  <v-container>
    <v-row>
      <v-col v-for="article in articles" :key="article.slug" cols="12">
        <article-card :value="article" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import {
  mapState
} from 'vuex'

export default {
  name: 'HomeNews',

  components: {
    ArticleCard: () => import('./ArticleCard')
  },

  computed: {
    ...mapState('home', ['articles'])
  }
}
</script>
