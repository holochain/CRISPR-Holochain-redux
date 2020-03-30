<template>
  <v-card>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>Profile Website Templates</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">
          <v-icon>mdi-view-dashboard</v-icon>
          Dashboard
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row>
      <v-col cols="4">
      </v-col>
        <v-col cols="4">
        DJ/Artist Template
      </v-col>
      <v-col cols="4">
        <profile-website-builder-freelancer-preview />
      </v-col>
    </v-row>
    </v-content>
    <v-footer app>
      <span>Holochain</span>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileWebsiteBuilder',
  components: {
    ProfileWebsiteBuilderFreelancerPreview: () => import('/Users/philipbeadle/holochain/holochain-developer/ui/src/modules/ProfileWebsiteBuilder/Templates/Freelancer/views/PreviewCard')
  }
}
</script>
