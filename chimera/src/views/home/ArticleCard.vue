<template>
  <v-card elevation="6">
    <router-link :to="`/article/${value.guid}`">
      <v-img class="white--text align-end" :src="value.img" height="400">
        <v-card-title v-text="value.title" />
      </v-img>
    </router-link>
    <v-card-subtitle class="pb-0" v-text="value.author" />
    <v-card-text class="text--primary">
      <div v-text="value.date" />
      <div v-text="value.snippet" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'HomeArticleCard',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
