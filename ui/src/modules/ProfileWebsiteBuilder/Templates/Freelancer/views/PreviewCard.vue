<template>
  <v-card class="mx-auto">
    <v-img class="white--text align-end" height="420" :src="require(`@/modules/ProfileWebsiteBuilder/Templates/Freelancer/assets/aboutme.png`)">
      <v-card-title>Freelancer</v-card-title>
    </v-img>
     <v-card-text>
      <div class="text--primary">
        A beautiful Material Design inspired single page website ideal for freelancers.
      </div>
    </v-card-text>
    <v-card-actions>
      <v-dialog v-model="profileWebSiteBuilderDialog" fullscreen>
        <template v-slot:activator="{ on }">
          <v-btn text  v-on="on">
            Demo
          </v-btn>
        </template>
        <v-card flat>
          <freelancer />
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
  name: 'ProfileWebsiteBuilderFreelancerPreview',
  components: {
    Freelancer: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/views/Home')
  },
  data () {
    return {
      profileWebSiteBuilderDialog: false
    }
  },
  methods: {
    demoDone: function () {
      this.$vuetify.theme.dark = true
      this.profileWebSiteBuilderDialog = false
    }
  }
}
</script>
