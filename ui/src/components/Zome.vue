<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="require(`@/assets/happs/${hApp.name}/preview.png`)"
    >
      <v-card-title>{{ hApp.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      {{ hApp.contact }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      {{ hApp.mobile }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="orange" text :href="'http://' + hApp.url" target="_blank">
        hApp Store
      </v-btn>
      <v-btn color="orange" text :href="'http://' + hApp.name" target="_blank">
        View
      </v-btn>
      <v-btn color="orange" text to="/entry-types">
        Build
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Zome',
  props: {
    hApp: {
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
