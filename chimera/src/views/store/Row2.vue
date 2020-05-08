<template>
  <v-row>
    <v-col cols="12" md="6">
      <part :value="left" tall prominent />
    </v-col>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="12">
          <part :value="rightTop" />
        </v-col>
        <v-col cols="12">
          <holochain-part :value="rightBottom" />
        </v-col>
      </v-row>
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
    left () {
      return this.value[0]
    },
    rightBottom () {
      return this.value[2]
    },
    rightTop () {
      return this.value[1]
    }
  }
}
</script>
