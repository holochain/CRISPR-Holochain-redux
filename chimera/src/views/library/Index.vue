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
      Learn about Chimera in the Knowledge base. Just click <v-icon>mdi-thought-bubble-outline</v-icon> Support in the left menu
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Chimera has help built in everywhere you may need it. Just click the <v-icon>mdi-help</v-icon> help icon 😎
      <v-divider class="my-4 info" style="opacity: 0.22" />
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
    ...mapActions('auth', ['turnSplashOff', 'turnSplashOn'])
  },
  computed: {
    ...mapState('auth', ['splash'])
  }
}
</script>
