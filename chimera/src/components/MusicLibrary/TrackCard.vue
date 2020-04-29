<template>
  <v-card class="mx-auto">
    <v-list-item class="ml-n3">
      <v-list-item-avatar v-if="isPlaying" @click="pauseTrack">
        <v-icon x-large>mdi-pause-circle-outline</v-icon>
      </v-list-item-avatar>
      <v-list-item-avatar v-if="!isPlaying" @click="playTrack">
        <v-icon x-large>mdi-play-circle-outline</v-icon>
      </v-list-item-avatar>
      <v-list-item-content align="start">
        <v-list-item-title class="headline" v-text="track.title"></v-list-item-title>
        <v-list-item-subtitle>by @philt3r</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item class="grow">
          <v-row align="center" justify="end">
            <v-icon class="mr-1">mdi-headphones</v-icon>
            <span class="subheading mr-2">2</span>
          </v-row>
        </v-list-item>
      </v-list-item-action>
    </v-list-item>
    <track-surfer ref="track" :track="track" :play="isPlaying" @duration="updateDuration" @played="updatePlayed" class="ml-2 mr-2"/>
    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center" justify="end">
          <span class="subheading mr-2">{{this.formattedDuration}}</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-headphones</v-icon>
          <span class="subheading mr-2">1256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">mdi-heart</v-icon>
          <span class="subheading mr-2">45</span>
          <span class="mr-1">·</span>
          <v-btn icon class="mr-1 ml-n1">
            <template>
              <img src="@/assets/icons/holo-32x32.png" style="height: 20px">
            </template>
          </v-btn>
          <span class="subheading ml-n1 mr-2">67</span>
          <span class="mr-1">·</span>
          <v-btn icon class="mr-1 ml-n1">
            <template>
              <img src="@/assets/icons/holochain-circle.png" style="height: 20px">
            </template>
          </v-btn>
          <span class="subheading ml-n2 mr-2">45</span>
          <v-chip key="track.id" v-if="chimeraOn" class="ma-2" close color="teal" text-color="white" close-icon="mdi-biohazard" @click:close="close">
            <v-avatar left>
              <v-icon small @click="acceptInvite">mdi-dna</v-icon>
            </v-avatar>
            Collab - ErrolJ
          </v-chip>
        </v-row>
      </v-list-item>
    </v-card-actions>
    <v-footer app class="font-weight-medium" v-if="playerVisible">
      <v-row no-gutters align-content="center">
        <v-col cols="4">
          <h2>{{ track.title }}</h2>
          <v-btn icon @click="this.$refs.track.skipBackward">
            <v-icon>mdi-skip-backward</v-icon>
          </v-btn>
          <v-btn icon @click="stopTrack">
            <v-icon>mdi-stop</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon v-if="!isPlaying" @click="playTrack">mdi-play</v-icon>
            <v-icon v-if="isPlaying" @click="pauseTrack">mdi-pause</v-icon>
          </v-btn>
          <v-btn icon @click="this.$refs.track.skipForward">
            <v-icon>mdi-skip-forward</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8">
          <v-container bg fill-height grid-list-md text-xs-center>
            <v-layout row wrap align-center>
              <v-flex>
                <v-slider v-model="progress" @change="setCurrentTime" track-color="grey" always-dirty min="0" max="100">
                  <template v-slot:prepend>
                    <span>{{formattedPlayed}}</span>
                  </template>
                  <template v-slot:append>
                    <span>{{formattedTimeLeft}}</span>
                  </template>
                </v-slider>
              </v-flex>
            </v-layout>
          </v-container>
        </v-col>
      </v-row>
    </v-footer>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TrackCard',
  components: {
    TrackSurfer: () => import('./TrackSurfer.vue')
  },
  data () {
    return {
      duration: 0,
      formattedDuration: '',
      played: 0,
      formattedPlayed: '',
      formattedTimeLeft: '',
      isPlaying: false,
      playerVisible: false,
      progress: 0
    }
  },
  props: ['track'],
  methods: {
    playTrack () {
      this.playerVisible = true
      this.isPlaying = true
      this.$emit('playing', this.track.id)
    },
    pauseTrack: function () {
      if (this.isPlaying === true) {
        this.isPlaying = false
      }
    },
    stopTrack () {
      this.$refs.track.stop()
      this.isPlaying = false
    },
    pausedByOtherTrack: function () {
      if (this.isPlaying === true) {
        this.isPlaying = false
      }
      this.playerVisible = false
    },
    formatTime (duration) {
      const d = Number(duration)
      const h = Math.floor(d / 3600)
      const m = Math.floor(d % 3600 / 60)
      const s = Math.floor(d % 3600 % 60).toFixed(0)
      const hDisplay = h > 0 ? ('0' + h).slice(-2) + ':' : ''
      const mDisplay = ('0' + m).slice(-2) + ':'
      const sDisplay = ('0' + s).slice(-2)
      if (this.duration > 3600) {
        return hDisplay + mDisplay + sDisplay
      } else if (this.duration > 60) {
        return mDisplay + sDisplay
      } else {
        return sDisplay
      }
    },
    updateDuration: function (duration) {
      this.duration = duration // (duration / 60).toFixed(2)
      this.formattedDuration = this.formatTime(duration)
      this.formattedPlayed = this.formatTime(0)
      this.formattedTimeLeft = this.formatTime(duration)
    },
    updatePlayed: function (played, source) {
      this.played = played
      this.formattedPlayed = this.formatTime(played)
      this.formattedTimeLeft = this.formatTime(this.duration - played)
      this.progress = this.played / this.duration * 100
    },
    setCurrentTime: function () {
      this.$refs.track.setCurrentTime(this.progress * this.duration / 100)
    }
  },
  computed: {
    ...mapState('auth', ['chimeraOn'])
  }
}
</script>
