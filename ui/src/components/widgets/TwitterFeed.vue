<template>
  <base-widget title="Twitter">
    <v-list
      class="column transparent"
      tag="v-layout"
      three-line
    >
      <template v-for="n in 3">
        <v-list-item :key="n">
          <v-list-item-avatar color="cyan">
            <v-icon dark>
              mdi-twitter
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              Poster
            </v-list-item-title>
            <v-list-item-subtitle>
              Lots of text that will need to be truncated
              Lots of text that will need to be truncated
              Lots of text that will need to be truncated
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsTwitterFeed'
}
</script>
