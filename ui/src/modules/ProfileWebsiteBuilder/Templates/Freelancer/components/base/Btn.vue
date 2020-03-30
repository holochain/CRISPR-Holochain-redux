<template>
  <v-btn
    color="secondary"
    rounded
  >
    <slot />
  </v-btn>
</template>
<script>
export default {
  name: 'BaseBtn',
  props: {
    tag: {
      type: String,
      default: 'h1'
    }
  }
}
</script>
