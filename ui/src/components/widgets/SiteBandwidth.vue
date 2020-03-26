<template>
  <base-widget title="Site Bandwidth">
    <v-progress-circular
      :value="value"
      color="#D35253"
      rotate="270"
      size="128"
      width="24"
    />

    <div class="pa-3 headline font-weight-light">
      {{ value }}%
    </div>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsSiteBandwidth',

  data: () => ({
    value: 75
  })
}
</script>
