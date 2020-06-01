<template>
    <v-row align="center">
        <v-col cols="12" md="6">
          <v-img :src="require('../assets/pherrol.jpg')">
              <v-container fill-height>
              <v-row align="center" class="white--text mx-auto" justify="center">
                  <v-col class="white--text text-center" cols="12">
                  <span class="font-weight-light" :class="[$vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4']">
                      @pherrol
                  </span>
                  <br>
                  <span :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-2']" class="font-weight-black">
                      Techno
                  </span>
                  </v-col>
              </v-row>
              </v-container>
          </v-img>
      </v-col>
      <v-col cols="12" md="6" class="pa-5">
          <h1 class="display-2">Bio</h1>
          <span class="body-1">The Techno Alliance of @philt3r and Errol J, two stalwarts of the Aussie bush party scene, brings you @pherrol! They strip it back and slow it down for the phattest and toughest Techno that tears up the dance floor and rumbles the biggest sound systems. The back to back style of @philt3r and Errol J produces a set with shovel loads of excitement and variety that is guaranteed to work the crowd into a stomping frenzy!</span>
      </v-col>
      <v-col cols="12">
          <h1 class="display-2">Videos</h1>
      </v-col>
      <v-col cols="12">
          <h2 class="title">Promo</h2>
          <div class="youtube-container">
            <iframe src="https://www.youtube.com/embed/cEx1uGpkbYU" frameborder="0" allowfullscreen class="video"></iframe>
          </div>
      </v-col>
      <v-col cols="12">
        <h2 class="title">Full Set Esoteric 2020 - Bush Techno</h2>
        <div class="youtube-container">
          <iframe src="https://www.youtube.com/embed/ZGJTS1Zb_Yk" frameborder="0" allowfullscreen class="video"></iframe>
        </div>
      </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import * as fs from 'fs'
function base64Encode (file) {
  var bitmap = fs.readFileSync(file)
  return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

export default {
  name: 'ProfileSite',
  components: {},
  data () {
    return {
      help: false
    }
  },
  methods: {
    base64Image (file) {
      return base64Encode(file)
    }
  },
  computed: {
    ...mapGetters('friends', ['agentProfile']),
    ...mapGetters('profiles', ['profileById']),
    whois () {
      return this.profileById(this.$route.params.id)
    },
    ...mapGetters('personalInformation', ['personas', 'personaFieldValue'])
  }
}
</script>

<style scoped>
.youtube-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  color: red;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
