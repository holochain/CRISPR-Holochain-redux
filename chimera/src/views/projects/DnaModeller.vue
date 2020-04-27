<template>
  <dna-modeller :base="base" />
</template>
<script>
export default {
  name: 'DnaModellerView',
  components: {
    DnaModeller: () => import('@/components/DnaModeller/DnaModeller')
  },
  computed: {
    base () {
      return this.$route.params.id
    }
  }
}
</script>
