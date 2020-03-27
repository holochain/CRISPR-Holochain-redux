<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="require(`@/assets/anchors/anchor.png`)"
    >
      <v-card-title>{{ Anchor.type }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      {{ Anchor.text }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn color="orange" text :href="'http://' + Anchor.url" target="_blank">
        Anchor Store
      </v-btn>
      <v-btn color="orange" text :href="'http://' + Anchor.name" target="_blank">
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
    Anchor: {
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
