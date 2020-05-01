<template>
  <v-card outlined tile height="100vh" width="100%">
    <v-row no-gutters>
      <v-col cols="4" class="ma-1 pa-1">
        <v-toolbar dark>
          <v-toolbar-title>Music</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-folder-plus</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </v-toolbar>
        <v-treeview
          v-model="tree"
          :open="open"
          :items="items"
          activatable
          item-key="name"
          open-on-click
          open-all>
          <template v-slot:prepend="{ item, open }">
            <v-btn icon @click="listTracks(item)">
              <v-icon>
                {{ open ? 'mdi-folder-open' : 'mdi-library-music' }}
              </v-icon>
            </v-btn>
          </template>
          <template v-slot:label="{ item }">
            <v-btn text @click="listTracks(item)">
              {{item.name}}
            </v-btn>
          </template>
        </v-treeview>
      </v-col>
      <v-divider v-if="tree" vertical></v-divider>
      <v-col class="ma-1 pa-1">
        <v-col v-for="(track) in tracks" :key="track.id" cols="12">
          <track-card ref="trackCard" :track="track" @playing="pauseOtherTracks" />
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MusicManager',
  components: {
    TrackCard: () => import('./TrackCard.vue')
  },
  data () {
    return {
      open: ['@philt3r'],
      tree: [],
      tracks: [],
      selectedFolder: ''
    }
  },
  methods: {
    listTracks (item) {
      if (this.selectedFolder !== item.id) {
        this.tracks = []
        if (item.tracks) {
          this.tracks = item.tracks
        }
      }
      this.selectedFolder = item.id
    },
    pauseOtherTracks: function (trackId) {
      const that = this
      this.tracks.forEach(function (track, i) {
        if (trackId !== track.id) {
          that.$refs.trackCard[i].pausedByOtherTrack()
        }
      })
    }
  },
  computed: {
    ...mapGetters('mediaLibrary', ['items'])
  }
}
</script>
