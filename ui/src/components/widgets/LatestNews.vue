<template>
  <base-widget title="Latest News">
    <v-card-text class="text-center">
      <v-icon size="48">
        mdi-newspaper
      </v-icon>
    </v-card-text>

    <v-card-text v-text="article.blurb" />

    <template v-slot:actions>
      Last Updated: {{ article.ago }}
    </template>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsLatestNews',

  data: () => ({
    article: {
      blurb: 'A beautiful new dashboard theme released by John Leider. Please visit vuetifyjs.com for more details.',
      ago: '15 minutes ago'
    }
  })
}
</script>
