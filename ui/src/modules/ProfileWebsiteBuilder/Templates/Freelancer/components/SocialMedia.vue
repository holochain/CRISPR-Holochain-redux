<template>
  <div>
    <v-btn v-for="(item, i) in items.slice(0, large ? items.length : 3)" :key="i" fab class="ma-2" :large="large" color="info">
      <v-icon dark v-text="item.icon" />
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'SocialMedia',
  props: {
    large: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items: [
      {
        name: 'Twitter',
        icon: 'mdi-twitter'
      },
      {
        name: 'Instagram',
        icon: 'mdi-instagram'
      },
      {
        name: 'Facebook',
        icon: 'mdi-facebook'
      },
      {
        name: 'Email',
        icon: 'mdi-email'
      },
      {
        name: 'Phone',
        icon: 'mdi-phone'
      }
    ]
  })
}
</script>
