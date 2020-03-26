<template>
  <base-widget title="Server Uptime">
    <v-list
      class="transparent"
      two-line
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-server</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">
            Up
          </v-list-item-title>
          <v-list-item-subtitle>2d 3h 45m</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:actions>
      Highest uptime: 12d 9h 32m
    </template>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsServerUptime'
}
</script>
