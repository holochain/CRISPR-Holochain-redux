<template>
  <v-container class="pt-0">
    <game-group v-for="(group, i) in groups" :key="i" :value="group" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    GameGroup: () => import('./GameGroup.vue')
  },

  data: () => ({
    order: [
      { component: 'row1', count: 1 },
      { component: 'row2', count: 3 },
      { component: 'row3', count: 3 },
      { component: 'row2', count: 3 },
      { component: 'row3', count: 3 },
      { component: 'row4', count: 4 }
    ]
  }),

  computed: {
    ...mapGetters('parts', ['parsedParts']),
    groups () {
      const parts = this.parsedParts
      const groups = []
      for (const order of this.order) {
        if (groups.length === parts.length || !parts.length) {
          break
        }
        const group = parts.splice(0, order.count)
        groups.push({
          ...order,
          group
        })
      }
      return groups
    }
  }
}
</script>
