<template>
  <v-card>
    <v-col cols="12" v-for="note in notes" :key="note.id">
      <note :note="note"/>
    </v-col>
  </v-card>
</template>
<script>
export default {
  name: 'Notes',
  components: {
    Note: () => import('./Note')
  },
  props: ['notes']
}
</script>
