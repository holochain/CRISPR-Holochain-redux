<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title text-truncate">Applications</span>
      <v-spacer></v-spacer>
      <v-btn text to="/personas">
        <v-icon>mdi-account-multiple</v-icon>
        Personas
      </v-btn>
      <v-btn text to="/library/true">
        <v-icon>mdi-account-multiple-outline</v-icon>
        Profiles
      </v-btn>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Click on an application to get more information about it.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click on 💻 Open to use the application.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Hover over the right side of the 💻 Open to reveal ⚙️ Settings
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click 🧬 Install to start the Installation process
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-account-multiple</v-icon> (Personas) to manage your personal information.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-account-multiple-outline</v-icon> (Profiles) to manage your personal information for each application.
    </v-alert>
    <v-divider />
    <applications :showProfile="showProfile"/>
    <v-overlay :absolute="true" :opacity="0.7" :value="splash">
      <v-card flat>
      <v-img height='600' :src="require('@/assets/icons/chimera-overlay.png')" @click="turnSplashOff" class="white--text align-end justify-center">
      </v-img>
      <v-img width="650" :src="require('@/assets/icons/powered-by-holochain.png')" />
      </v-card>
    </v-overlay>
  </section>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Library',
  components: {
    Applications: () => import('./Applications')
  },
  data () {
    return {
      showProfile: false,
      help: false
    }
  },
  methods: {
    ...mapActions('auth', ['turnSplashOff'])
  },
  computed: {
    ...mapState('auth', ['splash'])
  }
}
</script>
