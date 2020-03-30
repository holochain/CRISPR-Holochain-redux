<template>
  <v-card>
    <v-img class="white--text align-end" height="420" :src="require(`@/modules/ProfileWebsiteBuilder/preview.jpg`)">
      <v-card-title>Profile Website Builder</v-card-title>
    </v-img>
     <v-card-text>
      <div class="text--primary">
        Build & Publish beautiful fast websites from templates and Profile information.
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text>
        Add to Project
      </v-btn>
      <v-dialog v-model="profileWebSiteBuilderPreviewDialog" fullscreen>
        <template v-slot:activator="{ on }">
          <v-btn text  v-on="on">
            Demo
          </v-btn>
        </template>
        <v-card flat>
          <profile-website-builder />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="action darken-1" text @click="demoDone">
              Done
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ProfileWebsiteBuilderPreview',
  components: {
    ProfileWebsiteBuilder: () => import('/Users/philipbeadle/holochain/holochain-developer/ui/src/modules/ProfileWebsiteBuilder/ProfileWebsiteBuilder')
  },
  data () {
    return {
      profileWebSiteBuilderPreviewDialog: false
    }
  },
  methods: {
    demoDone: function () {
      this.profileWebSiteBuilderPreviewDialog = false
    }
  }
}
</script>
