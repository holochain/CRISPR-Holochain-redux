<template>
  <base-widget title="Accordion">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="n in 3"
        :key="n"
        class="transparent"
      >
        <v-expansion-panel-header>
          <span>Collapsible Group #{{ n }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="transparent">
          <v-card-text>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla iaculis
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsAccordion'
}
</script>

<style lang="sass">
  .v-expansion-panel:before
    box-shadow: none
</style>
