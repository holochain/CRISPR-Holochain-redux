<template>
  <v-container class="py-0">
    <v-img
      :src="require(`@/assets/${game.bg}`)"
      min-height="50vh"
    >
      <router-link to="/store">
        <v-subheader>
          Back to Store
        </v-subheader>
      </router-link>
      <v-row
        class="fill-height"
        justify="center"
        align="center"
      >
        <v-col class="text-center">
          <v-img
            :src="require(`@/assets/${game.logo}`)"
            contain
            class="mx-auto mb-5"
            width="200"
          />

          <v-btn v-if="!game.launch" :color="game.buyColor || 'blue'" style="min-width: 225px; height: 52px;">
            Add to Cart
          </v-btn>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet
      class="py-5 px-3"
      color="grey lighten-2"
      light
    >
      <h1
        class="display-3 font-weight-bold mb-4"
        v-text="game.name"
      />
      <v-row
        align="center"
      >
        <v-col
          class="grey--text text--darken-2"
          cols="12"
          md="6"
        >
          <p>
            Holochain CRISPR brings you all the power of building your own Holochain Apps without writing any code. You can assemble your own apps from pre-built modules as well as get right into the technical side and build new DNA's with the DNA Modeller.
            Once you are confident customising your own Holochain experience you can even make a income building apps for others.............
          </p>
          <p>
            CRISPR runs inside Chimera and comes with Holochain Version Control System (HVCS) and a Workflow project management system so you know exactly what needs doing and who is doing it. Each project has its own DHT and you control who is on your team and what team members can do.
          </p>
          <p>
          </p>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            class="mx-auto"
            elevation="24"
            max-width="400"
          >
            <v-img
              max-height="250"
              :src="require(`@/assets/${game.bg2}`)"
            />
          </v-card>
        </v-col>

        <v-col
          class="text-center my-5"
          cols="12"
        >
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
