<template>
  <v-container v-if="article" class="article pt-0 px-0">
    <iframe height="1000" frameborder="0" :src="article.link" width="100%" />
  </v-container>
</template>

<script>
// Utilities
import {
  mapState
} from 'vuex'

export default {
  name: 'Article',

  computed: {
    ...mapState('home', ['articles']),
    ...mapState('route', ['params']),
    article () {
      return this.articles.find(article => article.slug === this.params.slug)
    }
  }
}
</script>

<style lang="scss">
.article {
  p {
    line-height: 2;
    padding: 0 12px 20px;
  }
}
</style>
