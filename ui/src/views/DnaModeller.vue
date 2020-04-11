<template>
  <dna-modeller />
</template>
<script>
export default {
  name: 'DnaModellerView',
  components: {
    DnaModeller: () => import('../components/DnaModeller/DnaModeller')
  }
}
</script>
