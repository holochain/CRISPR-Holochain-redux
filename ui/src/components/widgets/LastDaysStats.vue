<template>
  <base-widget title="Last 30 Days Stats">
    <v-sparkline
      :color="$vuetify.theme.themes.light.secondary"
      :value="values"
    />

    <template v-slot:actions>
      StatCounter Information
    </template>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsLastDaysStats',

  data: () => ({
    values: [0, 3, 2, 5, 4, 4.5, 3.5, 7]
  })
}
</script>
