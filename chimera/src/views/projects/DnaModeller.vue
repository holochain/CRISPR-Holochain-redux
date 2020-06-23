<template>
  <dna-modeller :instanceId="this.$route.params.instanceId" :base="this.$route.params.base" :project="project" />
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DnaModellerView',
  components: {
    DnaModeller: () => import('@/components/DnaModeller/DnaModeller')
  },
  computed: {
    ...mapGetters('portfolio', ['projectById']),
    project () {
      return this.projectById({ instanceId: this.$route.params.instanceId, base: this.$route.params.base, projectId: this.$route.params.projectId })
    }
  }
}
</script>
