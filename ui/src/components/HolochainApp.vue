<template>
  <v-card>
    <v-img class="white--text align-end" height="200px" :src="require(`@/assets/happs/${hApp.name}/preview.png`)">
      <v-card-title>{{ hApp.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      {{ hApp.contact }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      {{ hApp.mobile }}
    </v-card-subtitle>
     <v-card-text>
      <div class="text--primary">
        {{ hApp.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text to="/model">
        Develop
      </v-btn>
      <v-btn color="orange" text :href="'http://' + hApp.name" target="_blank">
        Build
      </v-btn>
      <v-btn color="orange" text>
        Publish
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'HolochainApp',
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
