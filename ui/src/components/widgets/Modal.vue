<template>
  <base-widget title="Modal">
    <v-dialog max-width="344">
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          light
          v-on="on"
        >
          Example Modal Window
        </v-btn>
      </template>

      <v-card light>
        <v-card-title class="headline">
          Title
        </v-card-title>

        <v-card-text>
          Phasellus nec sem in justo pellentesque facilisis. Curabitur a felis in nunc fringilla tristique. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Suspendisse potenti. Phasellus accumsan cursus velit.

          Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Quisque ut nisi. Etiam imperdiet imperdiet orci. Praesent vestibulum dapibus nibh. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.

          Donec mollis hendrerit risus. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. Vivamus elementum semper nisi. Curabitur a felis in nunc fringilla tristique.
        </v-card-text>

        <v-card-text>
          Phasellus nec sem in justo pellentesque facilisis. Curabitur a felis in nunc fringilla tristique. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Suspendisse potenti. Phasellus accumsan cursus velit.
        </v-card-text>
      </v-card>
    </v-dialog>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsModal'
}
</script>
