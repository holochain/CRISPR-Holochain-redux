<template>
  <v-row>
    <v-col v-for="(part, i) in value" :key="i" cols="12" md="6">
      <holochain-part :value="part" />
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
  }
}
</script>
