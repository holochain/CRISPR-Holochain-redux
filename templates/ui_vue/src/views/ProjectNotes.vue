<template>
  <v-card>
    <notes :notes="notes"/>
  </v-card>
</template>
<script>
export default {
  name: 'ProjectNotes',
  components: {
    Notes: () => import('@/components/Notes/Notes')
  },
  data () {
    return {
      notes: [
        {
          id: 'Qmhash1',
          title: 'Note with no tasks',
          content: 'A simple note card - phase 1 of Hoplochain IDE project'
        },
        {
          id: 'Qmhash2',
          title: 'Note with tasks',
          content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.',
          tasks: [
            {
              done: false,
              title: 'Click <-- to see progress.'
            },
            {
              done: false,
              title: 'Generate DNA from model'
            },
            {
              done: false,
              title: 'Hook up this Note component to DNA.'
            }
          ]
        }
      ]
    }
  }
}
</script>
