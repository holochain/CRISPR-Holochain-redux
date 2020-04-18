<template>
  <v-card fluid>
      <v-toolbar>
        <v-toolbar-title>Holochain Modules</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">
          <v-icon>mdi-view-dashboard</v-icon>
          Dashboard
        </v-btn>
      </v-toolbar>
    <v-content>
      <v-row>
        <v-col cols="4">
          <notes-module />
        </v-col>
          <v-col cols="4">
          <chat />
        </v-col>
        <v-col cols="4">
          <profile-website-builder-preview />
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>

<script>
export default {
  name: 'Modules',
  components: {
    NotesModule: () => import('@/modules/NotesModule'),
    Chat: () => import('@/modules/Chat'),
    ProfileWebsiteBuilderPreview: () => import('@/modules/ProfileWebsiteBuilder/Preview')
  }
}
</script>
