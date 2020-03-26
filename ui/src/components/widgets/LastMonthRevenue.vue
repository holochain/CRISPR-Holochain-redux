<template>
  <base-widget title="Last Month Revenue">
    <v-list
      class="transparent pa-0"
      two-line
    >
      <v-list-item
        v-for="({ icon, value, text }, i) in fields"
        :key="i"
      >
        <v-list-item-avatar>
          <v-icon large>
            {{ icon }}
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">
            ${{ value }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:actions>
      15% Compared Last Month
    </template>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsLastMonthRevenue',

  data: () => ({
    fields: [
      {
        icon: 'mdi-check',
        text: 'Approved',
        value: 726
      },
      {
        icon: 'mdi-progress-clock',
        text: 'Pending',
        value: 531
      },
      {
        icon: 'mdi-delete',
        text: 'Denied',
        value: 156
      }
    ]
  })
}
</script>
