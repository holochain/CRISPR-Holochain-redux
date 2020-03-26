<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="require(`@/websites/${website.domain}/preview.jpg`)"
    >
      <v-card-title>{{ website.domain }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      {{ website.player }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      {{ website.mobile }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="orange" text :href="'http://' + website.domain" target="_blank">
        View
      </v-btn>
      <v-btn
        color="orange"
        text
      >
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'WidgetsWebSite',
  props: {
    website: {
      type: Object,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return {
          domain: 'escr',
          player: 'Philip Beadle',
          mobile: '0417301024'
        }
      }
    }
  }
}
</script>
