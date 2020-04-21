<template>
  <v-card v-if="tasks && tasks.length > 0">
    <v-slide-y-transition class="py-0" group tag="v-list">
      <template v-for="(task, i) in tasks">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
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
    </v-slide-y-transition>
    <v-row align="center" class="ml-5 mr-3">
      <v-progress-linear :value="progress" height="20" rounded color="info">
      <template>
        <strong class="mr-1 ml-5 white--text text--darken-2">
        {{ completedTasks }} of
      </strong>
      <strong class="ml-0 white--text text--darken-2">
        {{ tasks.length }}
      </strong>
      </template>
      </v-progress-linear>
    </v-row>
    <v-text-field class="ml-2 white--text" v-model="task.title" label="Add a task" solo @keydown.enter="create" append-icon="mdi-plus" @click:append="create"/>
  </v-card>
</template>
<script>
export default {
  name: 'Tasks',
  props: ['tasks'],
  data: () => ({
    task: {
      done: false,
      title: '',
      content: ''
    }
  }),
  computed: {
    completedTasks () {
      return this.tasks.filter(task => task.done).length
    },
    progress () {
      return this.completedTasks / this.tasks.length * 100
    },
    remainingTasks () {
      return this.tasks.length - this.completedTasks
    }
  },

  methods: {
    create () {
      this.tasks.push({
        done: false,
        title: this.task.title,
        content: this.task.content
      })
      this.task = {
        done: false,
        title: '',
        content: ''
      }
    }
  }
}
</script>
