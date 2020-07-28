<template>
  <section>
    <v-row no-gutters>
      <v-col cols="8">
        <v-card>
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
              <v-card v-resize="onResizeCodeItem">
                <codemirror v-model="partCodeItem" :options="cmOptions" ref="cmPartCodeItem"></codemirror>
              </v-card>
            </v-tab-item>
            <v-tab-item key="1">
              <v-card v-resize="onResizeCodeItems">
                <codemirror v-model="partCodeItems" :options="cmOptions" ref="cmPartCodeItems"></codemirror>
              </v-card>
            </v-tab-item>
            <v-tab-item key="2">
              <v-card v-resize="onResizeCodeStore">
                <codemirror v-model="partCodeStore" :options="cmOptionsJs" ref="cmPartCodeStore"></codemirror>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="action darken-1" text @click="save">
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
              <v-btn color="action" icon :to="`/projectKanban/${this.$route.params.instanceId}/${this.$route.params.base}/${project.id}`">
                <v-icon>mdi-notebook-outline</v-icon>
              </v-btn>
              <v-btn color="action" icon :to="`/project/${this.$route.params.instanceId}/${this.$route.params.base}/${project.id}`">
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
          <v-tabs-items v-model="tab">
            <v-tab-item key="0">
              <draggable-column v-if="editorInstance" :isDraggable="false" :key="editorInstance.id" :contentInstance="editorInstance" :title="editorInstance.instanceName" contentBase="" :hasProfile="true"/>
              <component :is="part(0)" :instance="editorInstance" base="PartEditor" title="Part Editor" :agent="agentAddress" />
            </v-tab-item>
            <v-tab-item key="1">
              <component :is="part(1)" :instance="editorInstance" base="PartEditor" title="Part Editor" :agent="agentAddress" />
            </v-tab-item>
          </v-tabs-items>
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
import '../../components/vscode-dark.css'
export default {
  name: 'PartEditor',
  components: {
    codemirror,
    DraggableColumn: () => import('@/components/lists/DraggableColumn')
  },
  data () {
    return {
      tab: 0,
      cmOptions: {
        tabSize: 4,
        mode: 'vue',
        theme: 'vscode-dark',
        readOnly: false,
        lineNumbers: true
      },
      cmOptionsJs: {
        tabSize: 4,
        mode: 'javascript',
        theme: 'vscode-dark',
        readOnly: false,
        lineNumbers: true,
        line: true
      },
      help: false,
      partCodeItem: '',
      partCodeItemFileName: '',
      partCodeItems: '',
      partCodeItemsFilename: '',
      partCodeStore: '',
      partCodeStoreFileName: ''
    }
  },
  methods: {
    alert (message) {
      alert(message)
    },
    onResizeCodeItem () {
      this.$refs.cmPartCodeItem.codemirror.setSize(null, window.innerHeight - 155)
    },
    onResizeCodeItems () {
      this.$refs.cmPartCodeItems.codemirror.setSize(null, window.innerHeight - 155)
    },
    onResizeCodeStore () {
      this.$refs.cmPartCodeStore.codemirror.setSize(null, window.innerHeight - 155)
    },
    part (index) {
      return this.files[index].replace('.vue', '').toLowerCase()
    },
    save () {
      if (this.$refs.cmPartCodeItem) {
        fs.writeFileSync(this.partCodeItemFileName, this.partCodeItem, (err) => {
          if (err) throw err
          console.log('The file has been saved!')
        })
      }
      if (this.$refs.cmPartCodeItems) {
        fs.writeFileSync(this.partCodeItemsFileName, this.partCodeItems, (err) => {
          if (err) throw err
          console.log('The file has been saved!')
        })
      }
      if (this.$refs.cmPartCodeStore) {
        fs.writeFileSync(this.partCodeStoreFileName, this.partCodeStore, (err) => {
          if (err) throw err
          console.log('The file has been saved!')
        })
      }
    }
  },
  computed: {
    ...mapState('auth', ['developer', 'agentAddress']),
    ...mapGetters('instancemanager', ['partEditorInstance']),
    ...mapGetters('portfolio', ['projectById']),
    editorInstance () {
      console.log(this.project.name)
      const inst = this.partEditorInstance(this.project.name)
      inst.entry.createdBy = this.agentAddress
      return inst
    },
    project () {
      return this.projectById({ instanceId: this.$route.params.instanceId, base: this.$route.params.base, projectId: this.$route.params.projectId })
    },
    files () {
      const components = []
      fs.readdirSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}`).forEach(file => {
        components.push(file)
      })
      return components
    }
  },
  created () {
    if (this.files[0]) {
      this.partCodeItemFileName = `${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.files[0]}`
      this.partCodeItem = fs.readFileSync(this.partCodeItemFileName, 'utf8')
    } else {
      this.partCodeItem = ''
    }
    if (this.files[1]) {
      this.partCodeItemsFileName = `${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.files[1]}`
      this.partCodeItems = fs.readFileSync(this.partCodeItemsFileName, 'utf8')
    } else {
      this.partCodeItems = ''
    }
    if (this.files[2]) {
      this.partCodeStoreFileName = `${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.files[2]}`
      this.partCodeStore = fs.readFileSync(this.partCodeStoreFileName, 'utf8')
    } else {
      this.partCodeStore = ''
    }
  }
}
</script>
