<template>
  <v-row>
    <v-col cols="8">
      <v-card class="ma-1" height="88vh">
        <v-toolbar dark>
          <v-toolbar-title class="display-1">Task Part Code</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card v-resize="onResizeCode">
          <codemirror v-model="partCode" :options="cmOptions" ref="cmPartCode"></codemirror>
        </v-card>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card class="ma-1">
        <v-card-title>Task Part Preview
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn color="action" icon :to="`/partNotes/${id}`">
              <v-icon>mdi-notebook-outline</v-icon>
            </v-btn>
            <v-btn color="action" icon :to="`/project/${id}`">
              <v-icon>mdi-code-braces</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card-title>
        <v-divider />
        <v-row>
          <v-col cols="12">
            <tasks key="Demo Task" base="Demo Task List"/>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
import * as fs from 'fs'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'TasksModule',
  components: {
    Tasks: () => import('@/components/parts/Tasks/Tasks'),
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
      }
    }
  },
  methods: {
    onResizeCode () {
      console.log(window.innerWidth, window.innerHeight)
      this.partCodemirror.setSize(window.innerWidth - 625, window.innerHeight - 125)
    }
  },
  computed: {
    ...mapGetters('notes', ['listTasks']),
    id () {
      return this.$route.params.id
    },
    partCode () {
      return fs.readFileSync('/Users/philipbeadle/holochain/CRISPR/chimera/src/components/parts/Tasks/Tasks.vue', 'utf8')
    },
    partCodemirror () {
      return this.$refs.cmPartCode.codemirror
    }
  }
}
</script>
