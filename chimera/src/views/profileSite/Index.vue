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
        Pic
      </v-col>
      <v-col cols="12" md="6">
        Bio
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'ProfileSite',
  components: {},
  data () {
    return {
      help: false
    }
  }
}
</script>
