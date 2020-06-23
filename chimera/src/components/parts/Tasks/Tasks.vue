<template>
  <v-card flat v-if="tasks && tasks.length > 0" :key="base">
    <v-card-title v-if="title">{{title}}</v-card-title>
    <v-slide-y-transition class="py-0" group tag="v-list">
      <template v-for="(task, i) in tasks">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
        <task :base="base" :task="task" :partBase="base" :key="i" />
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
    <!-- <v-text-field class="ml-2 white--text" v-model="task.title" label="Add a task" solo @keydown.enter="saveTask({ base: base, task: task})" append-icon="mdi-plus" @click:append="saveTask({ base: base, task: task})"/> -->
  </v-card>
  <v-card v-else>
    <!-- <v-text-field class="ml-2 white--text" v-model="task.title" label="Add a task" solo @keydown.enter="saveTask({ base: base, task: task})" append-icon="mdi-plus" @click:append="saveTask({ base: base, task: task})"/> -->
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Tasks',
  components: {
    Task: () => import('./Task')
  },
  props: ['instance', 'base', 'title'],
  data () {
    return {
      task: {
        title: '',
        done: false
      }
    }
  },
  methods: {
    ...mapActions('root', ['fetchEntries', 'resetErrors', 'agentAddress', 'fetchProfiles'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      errors (state) {
        return state.root.errors[`${this.instance.instanceId}${this.base}`]
      },
      tasks (state) {
        return state.root.entries[`${this.instance.instanceId}${this.base}`]
      }
    }),
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
  created () {
    this.fetchEntries({ instance: this.instance, base: this.base })
  },
  watch: {
    tasks () {
      this.task.title = ''
    }
  }
}
</script>
