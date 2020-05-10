<template>
  <v-container class="py-0">
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">{{storePart.name}}</span>
      <v-spacer></v-spacer>
      <v-btn text to="/personas">
        <v-icon>mdi-account</v-icon>
        Personas
      </v-btn>
    </v-toolbar>
    <v-img :src="require(`@/assets/${storePart.bg}`)" min-height="50vh">
    <v-divider />
      <v-row class="fill-height" justify="center" align="center">
        <v-col class="text-center">
          <v-img :src="require(`@/assets/${storePart.logo}`)" contain class="mx-auto mb-5" width="200" />
          <!-- <v-btn v-if="!storePart.launch" :color="storePart.buyColor || 'blue'" style="min-width: 225px; height: 52px;">
            Add to Cart
          </v-btn> -->
        </v-col>
      </v-row>
    </v-img>
    <v-sheet class="py-5 px-3" color="grey lighten-2" light>
      <h1 class="display-3 font-weight-bold mb-4" v-text="storePart.name" />
      <v-row align="center">
        <v-col class="grey--text text--darken-2" cols="12" md="6">
          <p v-text="storePart.description" />
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mx-auto" elevation="24" max-width="400">
            <v-img max-height="250" :src="require(`@/assets/${storePart.bg2}`)" />
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'PartStorePage',
  computed: {
    ...mapGetters('library', ['parts']),
    ...mapState('route', ['params']),
    storePart () {
      return this.parts.find(storePart => storePart.id === this.params.id)
    }
  }
}
</script>
