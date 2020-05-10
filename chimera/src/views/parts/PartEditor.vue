<template>
  <section>
    <v-row no-gutters>
      <v-col cols="8">
        <v-card height="88vh">
          <v-toolbar dark>
            <v-btn icon @click="$router.go(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>{{project.name}} UI Code</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card v-resize="onResizeCode">
            <codemirror v-model="partCode" :options="cmOptions" ref="cmPartCode"></codemirror>
          </v-card>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="action darken-1" text @click="alert('Edit the UI directly is coming soon')">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>{{project.name}} UI Preview</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn color="action" icon :to="`/partNotes/${project.id}`">
                <v-icon>mdi-notebook-outline</v-icon>
              </v-btn>
              <v-btn color="action" icon :to="`/project/${project.id}`">
                <v-icon>mdi-code-braces</v-icon>
              </v-btn>
              <v-btn color="action" icon @click="help=!help">
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-toolbar>
          <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
            Click <v-icon>mdi-notebook-outline</v-icon> to go to the Kanban Board.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-code-braces</v-icon> to go to the Zome Modeller.
          </v-alert>
          <v-row>
            <v-col v-if="project.name === 'Tasks'" cols="12">
              <tasks key="Demo Tasks" base="PartEditor"/>
            </v-col>
            <v-col v-if="project.name === 'Notes'" cols="12">
              <notes key="Demo Notes" base="PartEditor" title="Demo"/>
            </v-col>
            <v-col v-if="project.name === 'Kanban'" cols="12">
              <kanban key="Demo Kanban" base="PartEditor" title="Demo"/>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import * as fs from 'fs'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'PartEditor',
  components: {
    Notes: () => import('@/components/parts/Notes/Notes'),
    Tasks: () => import('@/components/parts/Tasks/Tasks'),
    Kanban: () => import('@/components/parts/Kanban/Kanban'),
    codemirror
  },
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'javascript',
        theme: 'base16-dark',
        readOnly: true,
        line: true
      },
      help: false
    }
  },
  methods: {
    alert (message) {
      alert(message)
    },
    onResizeCode () {
      this.partCodemirror.setSize(window.innerWidth - 625, window.innerHeight - 125)
    }
  },
  computed: {
    ...mapGetters('notes', ['listTasks']),
    ...mapGetters('portfolio', ['projectById']),
    project () {
      return this.projectById(this.$route.params.id)
    },
    partCodemirror () {
      return this.$refs.cmPartCode.codemirror
    },
    partCode () {
      return fs.readFileSync(`/Users/philipbeadle/holochain/CRISPR/chimera/src/components/parts/${this.project.name}/${this.project.name}.vue`, 'utf8')
    }
  }
}
</script>
