<template>
  <v-card>
    <task-manager :tasks="this.taskList"/>
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
      taskList: [
        {
          done: false,
          title: 'Homework',
          content: 'Do the questions in the homework book'
        },
        {
          done: false,
          title: 'Chores',
          content: 'Mow the lawn, change the bunnies.'
        }
      ]
    }
  }
}
</script>
