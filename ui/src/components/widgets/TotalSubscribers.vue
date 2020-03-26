<template>
  <base-widget title="Base Subscribers">
    <h2 class="headline">
      105,578
    </h2>

    <v-sparkline
      :value="value"
      class="px-3 mt-4"
      color="rgba(255, 255, 255, .2)"
    />

    <template v-slot:actions>
      98 Subscribed Today
    </template>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsTotalSubscribers',

  data: () => ({
    value: [105, 120, 103, 110, 113, 127, 105]
  })
}
</script>
