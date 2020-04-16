<template>
  <v-card height="99vh" flat tile>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Application Builder - Selected Zome [{{this.zome.name}}]</v-toolbar-title>
      <v-btn icon>
        <v-icon>
          mdi-application-export
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-plus</v-icon>
        Entry Type
      </v-btn>
      <v-btn text to="/">
        <v-icon>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
    </v-toolbar>
    <v-row no-gutters align="start" justify="center">
      <v-col cols="3">
        <v-card height="90vh" flat tile width="100%" class="pa-0 ma-0 overflow-auto">
          <v-row no-gutters>
            <v-col cols="12">
              <v-treeview v-model="tree" :open="open" :items="this.zome.items" activatable item-key="name" open-on-click>
                <template v-slot:prepend="{ item, open }">
                  <v-icon v-if="!item.file">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                  </v-icon>
                  <v-icon v-else>
                    {{ files[item.file] }}
                  </v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <v-btn v-if="item.index!==undefined" text @click="loadZome(item.index)" class="text-none">
                    {{item.name}}
                  </v-btn>
                  <v-btn v-else text @click="loadFile(item)" class="text-none">
                    {{item.name}}
                  </v-btn>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card height="100%" width="100%" flat tile>
          <v-content>
            <v-row no-gutters align="start" justify="center">
              <v-col v-if="showModel" cols="12">
                <zome-modeller :zome="zome" :key="zome.id" @functions-code-updated="functionsCodeUpdated"/>
              </v-col>
              <v-col v-if="showCode" cols="12">
                <code-window :code="code" :options="options"/>
              </v-col>
            </v-row>
          </v-content>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { zomes } from '../../store/zome.js'
export default {
  name: 'DnaModeller',
  components: {
    ZomeModeller: () => import('./ZomeModeller'),
    CodeWindow: () => import('./CodeWindow')
  },
  data () {
    return {
      applicationName: 'Notes',
      zomeTab: null,
      zomes: zomes,
      zome: zomes[0],
      tree: [],
      open: ['Notes App', 'DNA', 'Zomes', 'UI'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
        code: 'mdi-file-code',
        nix: 'mdi-nix',
        rs: 'mdi-code-braces',
        md: 'mdi-language-markdown',
        model: 'mdi-merge'
      },
      showModel: false,
      showCode: false,
      code: '',
      options: {}
    }
  },
  methods: {
    loadZome (index) {
      this.zome = this.zomes[index]
      this.showModel = true
      this.showCode = false
    },
    functionsCodeUpdated (code) {
      console.log(code)
    },
    loadFile (item) {
      switch (item.file) {
        case 'rs':
          this.code = ''
          this.options = {
            tabSize: 4,
            mode: 'rust',
            theme: 'base16-dark',
            readOnly: true,
            lineNumbers: true,
            line: true
          }
          this.code = item.code
          break
        case 'json':
        case 'nix':
        case 'code':
          this.options = {
            tabSize: 4,
            mode: 'javascript',
            json: true,
            theme: 'base16-dark',
            lineNumbers: true,
            line: true
          }
          this.code = item.code
          break
        case 'js':
          this.options = {
            tabSize: 4,
            mode: 'javascript',
            json: false,
            theme: 'base16-dark',
            lineNumbers: true,
            line: true
          }
          this.code = item.code
          break
        case 'md':
          this.options = {
            tabSize: 4,
            mode: 'markdown',
            theme: 'base16-dark',
            lineNumbers: true,
            line: true
          }
          this.code = item.code
          break
      }
      this.showModel = false
      this.showCode = true
    }
  }
}
</script>
