<template>
  <v-card elevation="6">
    <v-card-title>
      <div>
        <h2 class="title font-weight-regular" v-text="value.title" />
        <v-row align="center" class="grey--text text--lighten-1 mx-0 py-3">
          <v-avatar class="mr-2" color="grey darken-1" size="22">
            <v-icon small color="grey lighten-1" @click="() => {}">
              mdi-pencil
            </v-icon>
          </v-avatar>
          <span class="v-card--article__author" v-text="value.author" />
          &nbsp;•&nbsp;
          <span v-text="value.data" />
        </v-row>
      </div>
    </v-card-title>
    <router-link :to="`/article/${value.guid}`">
      <v-img :src="value.img" height="400" />
    </router-link>
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
