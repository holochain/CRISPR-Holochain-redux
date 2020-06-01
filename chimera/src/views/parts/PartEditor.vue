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
          <v-tabs v-model="tab" dark>
            <v-tab v-for="(file, index) in files" :key="index">
              {{file}}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item key="0">
              <v-card v-resize="onResizeCode">
                <codemirror v-model="partCodeItem" :options="cmOptions" ref="cmPartCodeItem"></codemirror>
              </v-card>
            </v-tab-item>
            <v-tab-item key="1">
              <v-card v-resize="onResizeCode">
                <codemirror v-model="partCodeItems" :options="cmOptions" ref="cmPartCodeItems"></codemirror>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
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
            Click <v-icon>mdi-notebook-outline</v-icon> (Kanban) to go to the Kanban Board.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-code-braces</v-icon> (Code) to go to the Zome Modeller.
          </v-alert>
          <v-row>
            <v-col cols="12">
              <component :is="project.name" base="PartEditor" title="Part Editor" :agent="agentAddress" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import * as fs from 'fs'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/vue/vue.js'
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'PartEditor',
  components: {
    codemirror
  },
  data () {
    return {
      tab: 0,
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
      this.partCodemirrorItem.setSize(window.innerWidth - 625, window.innerHeight - 125)
      this.partCodemirrorItems.setSize(window.innerWidth - 625, window.innerHeight - 125)
    }
  },
  computed: {
    ...mapState('auth', ['developer', 'agentAddress']),
    ...mapGetters('notes', ['listTasks']),
    ...mapGetters('portfolio', ['projectById']),
    project () {
      return this.projectById(this.$route.params.id)
    },
    partCodemirrorItem () {
      return this.$refs.cmPartCodeItem.codemirror
    },
    partCodemirrorItems () {
      return this.$refs.cmPartCodeItems.codemirror
    },
    files () {
      const components = []
      fs.readdirSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}`).forEach(file => {
        console.log(file)
        components.push(file)
      })
      return components
    },
    partCodeItem () {
      console.log(this.files)
      return fs.readFileSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.files[0]}`, 'utf8')
    },
    partCodeItems () {
      if (this.files[1]) return fs.readFileSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.files[1]}`, 'utf8')
      return ''
    }
  }
}
</script>
