<template>
  <v-card
    v-bind="$attrs"
    color="#556371"
    dark
    v-on="$listeners"
  >
    <template v-if="title">
      <v-card-text
        class="secondary--text text-uppercase py-2"
        v-text="title"
      />
      <v-divider class="black" />
    </template>
    <slot />
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',

  inheritAttrs: false,

  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
