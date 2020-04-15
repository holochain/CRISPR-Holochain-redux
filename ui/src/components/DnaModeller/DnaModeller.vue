<template>
  <v-card flat height="100vh" class="pa-0 ma-0">
    <v-row no-gutters align="start" justify="center">
      <v-col cols="3">
        <v-card height="100vh" width="100%" class="pa-0 ma-0 overflow-auto">
          <v-row no-gutters>
            <v-col cols="12">
              <v-toolbar color="primary" dark>
                <v-toolbar-title>Application Files</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon class="mr-1 ml-n1">
                  <template>
                    <v-img width="20" :src="require(`@/assets/icons/holochain-circle.png`)" />
                  </template>
                </v-btn>
              </v-toolbar>
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
        <v-card flat height="100vh">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Zome Models</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="loadZome(0)">
              Zome 1
            </v-btn>
            <v-btn @click="loadZome(1)">
              Zome 2
            </v-btn>
            <v-btn @click="loadZome(2)">
              Zome 3
            </v-btn>
          </v-toolbar>
          <v-content>
            <v-row no-gutters align="start" justify="center">
              <v-col cols="12">
                <zome-modeller :zome="zome" :key="zome.id"/>
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
    ZomeModeller: () => import('./ZomeModeller')
  },
  data () {
    return {
      zomeTab: null,
      zomes: zomes,
      zome: zomes[0],
      tree: [],
      open: ['Notes App', 'dna', 'ui'],
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
      }
    }
  },
  methods: {
    loadZome (index) {
      this.zome = this.zomes[index]
    }
  }
}
</script>
