<template>
  <h2
    class="subheading text-uppercase font-weight-medium mb-3"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </h2>
</template>

<script>
  export default {
    name: 'BaseSubheading',
  }
</script>
