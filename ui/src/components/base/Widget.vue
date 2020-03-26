<template>
  <base-card :title="title">
    <v-row
      :style="styles"
      class="ma-0 flex-column"
    >
      <v-col
        align-self="center"
        class="d-flex"
      >
        <v-row
          align="center"
          justify="center"
          class="flex-column py-3"
        >
          <slot />
        </v-row>
      </v-col>

      <v-card-text
        v-if="$scopedSlots.actions"
        class="text-center"
      >
        <slot name="actions" />
      </v-card-text>
    </v-row>
  </base-card>
</template>

<script>
export default {
  name: 'BaseWidget',

  props: {
    title: {
      type: String,
      default: null
    }
  },

  computed: {
    styles () {
      return {
        height: `calc(100% - ${this.title ? '37px' : '0'})`
      }
    }
  }
}
</script>
