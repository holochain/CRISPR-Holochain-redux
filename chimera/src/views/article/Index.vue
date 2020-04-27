<template>
  <v-container
    v-if="article"
    class="article pt-0 px-0"
  >
    <v-img
      :src="require(`@/assets/${article.img}`)"
      gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,0)"
      height="50vh"
    >
      <router-link to="/">
        <v-subheader>
          Back to Home
        </v-subheader>
      </router-link>
    </v-img>

    <v-sheet
      class="py-5 px-3"
      color="grey lighten-2"
      light
    >
      <h1
        class="display-3 font-weight-bold mb-4"
        v-text="article.title"
      />

      <v-row>
        <v-col
          cols="12"
          md="6"
          class="grey--text text--darken-2 title font-weight-light"
        >
          <p>
            In the works: RAD tools and IDE progress
You may have heard about the first iteration of our rapid application development tools, which scaffolds and runs a note-taking hApp for you. If you’re a developer, you might have even tried it out and discovered how easy it is to get started.

But as a RAD scaffolding tool, it’s necessarily limited—it was meant to demonstrate a front-end stack and developer tooling within a precreated hApp. We’re rolling out functionality in stages, where the next iteration(s) will generate code from your own specifications.

There are two projects being developed in tandem. First, the second iteration of the RAD tool, which will auto-generate front-end and DNA code from your spec file. This spec file format will be easy to write by hand, so in a sense it will be the tool's UI.

Philip Beadle, team alumnus and close collaborator, is also working on an IDE with a graphical builder for creating a data schema. The IDE will also likely include Guillem’s Holochain Playground, described above. As you can see from the GitHub repo, it’s still in early stages but in active development. Take a look at the wiki to see what features are planned.
          </p>

          <p>
            Nunc nec neque. Vestibulum fringilla pede sit amet augue. Curabitur at lacus ac velit ornare lobortis. Pellentesque commodo eros a enim. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla.

            Vivamus in erat ut urna cursus vestibulum. Quisque ut nisi. Curabitur nisi. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Donec vitae sapien ut libero venenatis faucibus.
          </p>

          <p>
            Nunc nec neque. Vestibulum fringilla pede sit amet augue. Curabitur at lacus ac velit ornare lobortis. Pellentesque commodo eros a enim. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla.

            Vivamus in erat ut urna cursus vestibulum. Quisque ut nisi. Curabitur nisi. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Donec vitae sapien ut libero venenatis faucibus.

            Maecenas nec odio et ante tincidunt tempus. Pellentesque commodo eros a enim. Suspendisse feugiat. Nulla facilisi. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </p>

          <v-row
            align="center"
            justify="space-between"
            class="pt-4 white mx-0"
            tag="p"
          >
            <span class="pl-3 subheading">
              Share this on social media
            </span>

            <div class="d-flex">
              <v-btn icon>
                <v-icon>mdi-discord</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-reddit</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="mt-5"
        >
          <v-card
            class="mx-auto"
            elevation="24"
            max-width="400"
          >
            <v-img :src="require(`@/assets/${article.altImg}`)" />
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
// Utilities
import {
  mapState
} from 'vuex'

export default {
  name: 'Article',

  computed: {
    ...mapState('home', ['articles']),
    ...mapState('route', ['params']),
    article () {
      return this.articles.find(article => article.slug === this.params.slug)
    }
  }
}
</script>

<style lang="scss">
.article {
  p {
    line-height: 2;
    padding: 0 12px 20px;
  }
}
</style>
