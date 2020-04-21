<template>
  <v-card>
    <notes :notes="notes"/>
    <v-card-text>
      <div class="text--primary">
      Adds a task list manager to your app.
      </div>
    </v-card-text>
    <v-card-actions>
    <v-btn color="orange" text>
      Add to Project
    </v-btn>
    <v-btn color="orange" text >
      Demo
    </v-btn>
  </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ToDos',
  components: {
    TaskManager: () => import('@/modules/components/TaskManager')
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
