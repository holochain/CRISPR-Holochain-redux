<template>
  <base-widget title="Disk Space">
    <v-progress-circular
      :value="value"
      color="#39C2B2"
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
  name: 'WidgetsDiskSpace',

  data: () => ({
    value: 50
  })
}
</script>
