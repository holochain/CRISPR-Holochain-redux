<template>
  <v-toolbar
    v-scroll="onScroll"
    :color="isTransparent ? 'transparent' : '#F5F5F5'"
    flat
  >
    <v-spacer />
    <SocialMedia />
  </v-toolbar>
</template>

<script>
export default {
  components: {
    SocialMedia: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/SocialMedia')
  },

  data: () => ({
    isTransparent: true
  }),

  methods: {
    onScroll () {
      this.isTransparent = window.pageYOffset < 200
    }
  }
}
</script>
