<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Profile Site</span>
      <v-btn icon>
        <v-icon>
          mdi-application-export
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <!-- <v-divider class="my-4 info" style="opacity: 0.22" /> -->
      Click <v-icon>mdi-publish</v-icon> (Publish) your site.
    </v-alert>
    <v-row align="center">
      <v-col cols="12" md="6">
        <v-img :src="getPersonaValue(whois.fields[2].mapping)">
          <v-container fill-height>
            <v-row align="center" class="white--text mx-auto" justify="center">
              <v-col class="white--text text-center" cols="12">
                <span class="font-weight-light" :class="[$vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4']">
                  {{getPersonaValue(whois.fields[0].mapping)}}
                </span>
                <br>
                <span :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-2']" class="font-weight-black">
                  {{getPersonaValue(whois.fields[3].mapping)}}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="display-2">Bio</h1>
        <span class="body-1">{{getPersonaValue(whois.fields[4].mapping)}}</span>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileSite',
  components: {},
  data () {
    return {
      help: false
    }
  },
  methods: {
    getPersonaValue (mapping) {
      // console.log(mapping)
      // console.log(this.personaFieldValue(mapping))
      return this.personaFieldValue(mapping)
    }
  },
  computed: {
    ...mapGetters('friends', ['agentProfile']),
    ...mapGetters('profiles', ['profileById']),
    whois () {
      console.log(this.$route.params.id)
      console.log(this.profileById(this.$route.params.id))
      return this.profileById(this.$route.params.id)
    },
    ...mapGetters('personalInformation', ['personas', 'personaFieldValue'])
  }
}
</script>
