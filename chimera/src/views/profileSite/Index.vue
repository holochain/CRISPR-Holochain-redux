<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Profile Site</span>
      <v-spacer></v-spacer>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <!-- <v-divider class="my-4 info" style="opacity: 0.22" /> -->
      Click <v-icon>mdi-publish</v-icon> (Publish) your site.
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-list-item v-if="whois" class="mx-n3">
          <v-progress-circular color="green" size="48" value="45" rotate="20">
            <!-- <v-list-item-avatar class="ml-4">
              <v-img :src="whois.info.avatar" />
            </v-list-item-avatar> -->
          </v-progress-circular>
          <v-list-item-content class="ml-4">
            <v-list-item-title>{{whois.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="6">
        Bio
      </v-col>
      <v-col cols="12" md="6">
        0
        {{whois.fields[0].mapping}}
        {{getPersonaValue(whois.fields[0].mapping)}}
      </v-col>
      <v-col cols="12" md="6">
        2
        {{whois.fields[2].mapping}}
        {{getPersonaValue(whois.fields[2].mapping)}}
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
      console.log(mapping)
      return this.personaFieldValue(mapping)
    }
  },
  computed: {
    ...mapGetters('friends', ['agentProfile']),
    ...mapGetters('profiles', ['profileById']),
    whois () {
      console.log(this.profileById(this.$route.params.id))
      return this.profileById(this.$route.params.id)
    },
    ...mapGetters('personalInformation', ['personas', 'personaFieldValue'])
  }
}
</script>
