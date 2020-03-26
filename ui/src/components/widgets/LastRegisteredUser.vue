<template>
  <base-widget title="Last Registered User">
    <v-avatar
      class="mb-3"
      color="grey"
      size="88"
      tile
    >
      <v-img src="https://randomuser.me/api/portraits/women/83.jpg" />
    </v-avatar>

    <h3 class="headline mb-1">
      Pat Quirk
    </h3>

    <div class="accent--text title font-weight-light">
      Dublin Ireland
    </div>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsLastRegisteredUser'
}
</script>
