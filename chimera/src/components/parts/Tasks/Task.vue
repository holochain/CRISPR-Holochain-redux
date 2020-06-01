<template>
  <v-list-item :key="`${i}-${task.title}`">
    <v-list-item-action>
    <v-checkbox v-model="task.done" :color="task.done && 'grey' || 'white'">
      <template v-slot:label>
      <div :class="task.done && 'grey--text' || 'white--text'" class="ml-4" v-text="task.title"></div>
      </template>
    </v-checkbox>
    </v-list-item-action>
    <v-spacer></v-spacer>
    <v-scroll-x-transition>
    <v-icon v-if="task.done" color="success">mdi-check</v-icon>
    </v-scroll-x-transition>
  </v-list-item>
</template>

<script>
export default {
  name: 'Task',
  components: {
    // PartManager: () => import('@/components/chimera/PartManager'),
  },
  props: ['base', 'task', 'partBase']
}
</script>
