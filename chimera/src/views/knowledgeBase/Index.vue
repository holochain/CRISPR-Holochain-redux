<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Knowledgebase</span>
    </v-toolbar>
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
