<template>
  <section>
    <knowledgebase :instance="instance" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Help',
  components: {
    Knowledgebase: () => import('@/components/chimera/Knowledgebase')
  },
  computed: {
    ...mapGetters('instancemanager', ['listInstances']),
    instance () {
      console.log(this.listInstances('Knowledge Base').find(i => i.instanceId === 'ChimeraKnowledgeBase'))
      return this.listInstances('Knowledge Base').find(i => i.instanceId === 'ChimeraKnowledgeBase')
    }
  }
}
</script>
