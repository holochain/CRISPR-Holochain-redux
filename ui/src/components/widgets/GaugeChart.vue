<template>
  <base-widget title="Gauge Chart">
    <v-icon
      class="mb-3"
      x-large
    >
      mdi-gauge
    </v-icon>

    <v-progress-circular
      :value="value"
      rotate="270"
      size="128"
      width="24"
    >
      <h3 class="title secondary--text">
        {{ value }}%
      </h3>
    </v-progress-circular>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsGaugeChart',

  data: () => ({
    value: 25
  })
}
</script>
