<template>
    <v-row align="center">
        <v-col cols="12" md="6">
          <v-img :src="require('../assets/pherrol4.jpg')">
          </v-img>
      </v-col>
      <v-col cols="12" md="6" class="pa-5">
        <h1 :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-2']" class="font-weight-black">Bio 🇦🇺 🍺 🎧</h1>
        <span :class="[$vuetify.breakpoint.smAndDown ? 'body-1': 'title']">The Techno Alliance of @philt3r and Errol J, two stalwarts of the Aussie bush party scene, brings you @pherrol! They strip it back and slow it down for the phattest and toughest Techno that tears up the dance floor and rumbles the biggest sound systems. The back to back style of @philt3r and Errol J produces a set with shovel loads of excitement and variety that is guaranteed to work the crowd into a stomping frenzy!</span>
        <br /><br />
        <span :class="[$vuetify.breakpoint.smAndDown ? 'body-1': 'title']">Contact: Text ErrolJ on 0419 403 753</span>
      </v-col>
      <v-col cols="12" md="6">
        <v-col cols="12">
          <h2 class="title">Promo</h2>
          <div class="youtube-container">
            <iframe src="https://www.youtube.com/embed/4-HtPL4JvGY" frameborder="0" allowfullscreen class="video"></iframe>
          </div>
        </v-col>
        <v-col cols="12">
          <h2 class="title" v-if="$vuetify.breakpoint.smAndDown">Esoteric 2020 - Bush Techno</h2>
          <h2 class="title" v-else>Full Set Esoteric 2020 - Bush Techno</h2>
          <div class="youtube-container">
            <iframe src="https://www.youtube.com/embed/ZGJTS1Zb_Yk" frameborder="0" allowfullscreen class="video"></iframe>
          </div>
        </v-col>
      </v-col>
      <v-col cols="12" md="6" v-if="!$vuetify.breakpoint.smAndDown">
          <v-img :src="require('../assets/pherrol.jpg')">
          </v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-col cols="12">
            <h2 class="title">Recently played at</h2>
            <v-img :src="require('../assets/images/psyland-2020.jpg')">
            </v-img>
        </v-col>
        <v-col cols="12">
            <v-img :src="require('../assets/images/endofnow.png')">
            </v-img>
        </v-col>
        <v-col cols="12">
            <v-img :src="require('../assets/pherrol7.jpg')">
            </v-img>
        </v-col>
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="title">Set Recordings</h2>
        <v-row no-gutters class="mx-auto">
          <v-col cols="12">
            <iframe width="100%" height="400" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/841473073&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/user-602930137" title="End Of Now" target="_blank" style="color: #cccccc; text-decoration: none;">End Of Now</a> · <a href="https://soundcloud.com/user-602930137/survivor-series-ep-4-pherrol" title="Survivor Series: Ep 4- Pherrol" target="_blank" style="color: #cccccc; text-decoration: none;">Survivor Series: Ep 4- Pherrol</a></div>
          </v-col>
          <v-col cols="12">
            <iframe width="100%" height="400" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/835531798&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/pherrol" title="@pherrol" target="_blank" style="color: #cccccc; text-decoration: none;">@pherrol</a> · <a href="https://soundcloud.com/pherrol/psyland-2020-pherrol" title="Psyland - 2020 - @pherrol" target="_blank" style="color: #cccccc; text-decoration: none;">Psyland - 2020 - @pherrol</a></div>
          </v-col>
          <v-col cols="12">
            <iframe width="100%" height="400" src="https://www.mixcloud.com/widget/iframe/?feed=%2Fpherrol%2Fpherrol-esoteric-festival-2020-bush-techno-stage-sunday-130pm%2F" frameborder="0" ></iframe>
          </v-col>
          <v-col cols="12">
            <iframe width="100%" height="400" src="https://www.mixcloud.com/widget/iframe/?feed=%2Fphilt3r%2Fpherrol-debut-beats-in-the-valley-2018-part-1%2F" frameborder="0" ></iframe>
          </v-col>
          <v-col cols="12">
            <iframe width="100%" height="400" src="https://www.mixcloud.com/widget/iframe/?feed=%2Fphilt3r%2Fpherrol-debut-beats-in-the-valley-2018-part-2%2F" frameborder="0" ></iframe>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-img :src="require('@/assets/images/esoteric-festival-2020-bush-techno-pherrol.jpg')">
        </v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-img :src="require('@/assets/pherrol6.jpg')">
        </v-img>
      </v-col>
  </v-row>
</template>

<script>
// v-if="$vuetify.breakpoint.smAndDown"
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
