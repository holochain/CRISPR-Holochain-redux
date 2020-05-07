<template>
  <v-container class="py-0">
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">{{game.name}}</span>
      <v-spacer></v-spacer>
      <v-btn text to="/personas">
        <v-icon>mdi-account</v-icon>
        Personas
      </v-btn>
    </v-toolbar>
    <v-img :src="require(`@/assets/${game.bg}`)" min-height="50vh">
    <v-divider />
      <v-row class="fill-height" justify="center" align="center">
        <v-col class="text-center">
          <v-img :src="require(`@/assets/${game.logo}`)" contain class="mx-auto mb-5" width="200" />
          <v-btn v-if="!game.launch" :color="game.buyColor || 'blue'" style="min-width: 225px; height: 52px;">
            Add to Cart
          </v-btn>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet class="py-5 px-3" color="grey lighten-2" light>
      <h1 class="display-3 font-weight-bold mb-4" v-text="game.name" />
      <v-row align="center">
        <v-col class="grey--text text--darken-2" cols="12" md="6">
          <p v-text="game.description" />
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mx-auto" elevation="24" max-width="400">
            <v-img max-height="250" :src="require(`@/assets/${game.bg2}`)" />
          </v-card>
        </v-col>
        <v-col class="text-center my-5" cols="12">
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            frameborder="0"
            height="315"
            src="https://www.youtube.com/embed/7X8II6J-6mU"
            width="100%"
          />
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet
      height="400"
      color="grey darken-2"
      tile
    />
    <v-sheet
      height="200"
      color="grey darken-3"
      tile
    />
  </v-container>
</template>

<script>
// Utilities
import {
  mapGetters,
  mapState
} from 'vuex'

export default {
  name: 'StorePage',

  computed: {
    ...mapGetters('games', ['parsedGames']),
    ...mapState('route', ['params']),
    game () {
      console.log(this.params.id, this.parsedGames)
      return this.parsedGames.find(game => game.id === this.params.id)
    }
  }
}
</script>
