<template>
  <base-widget title="Fast Contact">
    <v-card-text class="text-center">
      <v-text-field
        filled
        label="Name"
      />

      <v-text-field
        filled
        label="Email"
      />

      <v-textarea
        filled
        label="Message"
      />

      <v-btn
        color="accent"
        depressed
      >
        Send
      </v-btn>
    </v-card-text>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsFastContact'
}
</script>
