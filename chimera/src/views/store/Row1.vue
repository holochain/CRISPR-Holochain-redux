<template>
  <v-row>
    <v-col>
      <holochain-part :value="part" prominent />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    HolochainPart: () => import('@/components/HolochainPart')
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    part () {
      return this.value[0]
    }
  }
}
</script>
