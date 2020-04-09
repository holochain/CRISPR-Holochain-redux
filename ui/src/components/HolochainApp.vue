<template>
  <v-card>
    <v-img class="white--text align-end" width="300" :src="require(`@/assets/happs/${hApp.name}/preview.png`)">
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
      <v-btn color="orange" text :to="`/model/${hApp.id}`">
        Develop
      </v-btn>
        <v-btn color="orange" text href="http://localhost:8080" target="_blank">
        Demo
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
