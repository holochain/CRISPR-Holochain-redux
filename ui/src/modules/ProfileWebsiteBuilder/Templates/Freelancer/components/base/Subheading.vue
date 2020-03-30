<template>
  <component
    :is="tag"
    class="display-1 v-heading mb-3 font-weight-light"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseSubHeading',
  props: {
    tag: {
      type: String,
      default: 'h1'
    }
  }
}
</script>
