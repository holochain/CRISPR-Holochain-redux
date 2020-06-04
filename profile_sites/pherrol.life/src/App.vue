<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title :class="[$vuetify.breakpoint.smAndDown ? 'title': 'display-2']">
        @pherrol ❤️ techno
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <profile/>
    <v-footer class="justify-center" color="#292929" height="100">
      <div class="sub-title font-weight-light grey--text text--lighten-1 text-center">
        <p>
          &copy; {{ (new Date()).getFullYear() }} — See you on the dance floor
        </p>
        <p>
          💚 @philt3r & Errol J 💚
        </p>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Profile from './components/Profile'

export default {
  name: 'App',

  components: {
    Profile
  },

  data: () => ({
    //
  })
}
</script>
