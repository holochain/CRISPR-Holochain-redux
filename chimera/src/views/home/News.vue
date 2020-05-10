<template>
  <v-container>
    <v-row>
      <v-col v-for="article in articles" :key="article.title" cols="12">
        <article-card :value="article" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HomeNews',
  components: {
    ArticleCard: () => import('./ArticleCard')
  },
  methods: {
    ...mapActions('home', ['fetchNews'])
  },
  computed: {
    ...mapGetters('home', ['listArticles']),
    articles () {
      return this.listArticles('all')
    }
  },
  created () {
    this.fetchNews()
  }
}
</script>
