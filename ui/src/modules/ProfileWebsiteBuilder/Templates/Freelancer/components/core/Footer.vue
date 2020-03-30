<template>
  <v-footer
    height="88"
    class="justify-center"
  >
    <social-media large />
  </v-footer>
</template>

<script>
export default {
  components: {
    SocialMedia: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/SocialMedia')
  }
}
</script>
