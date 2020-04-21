<template>
  <v-card height="99vh" flat tile>
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Project [{{project.name}}] - Zome [{{this.zome.name}}]</v-toolbar-title>
      <v-btn icon>
        <v-icon @click="exportFiles">
          mdi-application-export
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text v-if="showModel">
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
              <v-treeview v-model="tree" :open="open" :items="this.items" activatable item-key="name" open-on-click>
                <template v-slot:prepend="{ item, open }">
                  <v-icon v-if="!item.file">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                  </v-icon>
                  <v-icon v-else>
                    {{ files[item.file] }}
                  </v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <v-btn v-if="item.index!==undefined" text @click="loadZome(item)" class="text-none">
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
            <v-row no-gutters align="center" justify="center">
               <v-col v-if="showCode === showModel" cols="12">
                <v-card class="mx-auto pt-10" max-width="900">
                  <v-img class="white--text align-end" width="900px" :src="require('@/assets/HOLOCHAIN_WHITE.png')">
                  </v-img>
                  <v-card-title>Holochain-IDE</v-card-title>
                  <v-card-subtitle class="pb-0">Build hApps from Data Models and Skins</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col v-if="showModel" cols="12">
                <zome-modeller :zome="zome" :key="refreshKey" @functions-code-updated="functionsCodeUpdated" @edit-permissions="editPermissions"/>
              </v-col>
              <v-col v-if="showCode" cols="12">
                <code-window :code="code" :options="options"/>
              </v-col>
            </v-row>
          </v-content>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="permissionsDialog" max-width="700px">
      <v-card flat>
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="display-1">Permissions - {{this.entryType.name}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row no-gutters align="start" justify="center">
          <v-col cols="12">
            <entry-type-permissions :permissions="permissions" @permission-changed="permissionChanged" />
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="permissionsDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import * as fs from 'fs'
import * as path from 'path'
import { developer, zomes } from '../../store/zome.js'
import { projects } from '../../store/projects.js'
import { items } from '../../store/foldersFilesCode.js'

function ensureDirectoryExistence (filePath) {
  var dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
}

function writeFiles (item, folder) {
  if (item.children) {
    folder += '/' + item.name
    item.children.forEach(item => {
      if (item.file) {
        const fileName = folder + '/' + item.name
        ensureDirectoryExistence(fileName.toLowerCase())
        fs.writeFileSync(fileName.toLowerCase(), item.code)
      }
      writeFiles(item, folder)
    })
  }
}

export default {
  name: 'DnaModeller',
  components: {
    ZomeModeller: () => import('./ZomeModeller'),
    CodeWindow: () => import('./CodeWindow'),
    EntryTypePermissions: () => import('./EntryTypePermissions')
  },
  data () {
    return {
      applicationName: 'Holochain-IDE',
      zomeTab: null,
      zomes: zomes,
      zome: zomes[0],
      entryType: {},
      refreshKey: 'clean',
      items: items,
      tree: [],
      open: ['Holochain-IDE', 'DNA', 'Zomes', 'UI'],
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
      options: {},
      permissionsDialog: false,
      permissions: {}
    }
  },
  methods: {
    loadZome (item) {
      this.zome = this.zomes[item.index]
      item.children = this.zome.items
      this.showModel = true
      this.showCode = false
    },
    permissionChanged (entryFunction, role) {
      const functionInfo = this.entryType.functions.find(f => f.name === entryFunction)
      functionInfo.permission = role
      functionInfo.permissionsCode = fs.readFileSync(`${developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_${entryFunction}/${role}.rs`, 'utf8')
      this.refreshKey += '1'
    },
    editPermissions (entryType) {
      this.entryType = entryType
      let updatePermission = ''
      let deletePermission = ''
      let functionInfo = entryType.functions.find(f => f.name === 'update')
      if (functionInfo === undefined) {
        updatePermission = 'remove'
      } else {
        updatePermission = functionInfo.permission
      }
      functionInfo = entryType.functions.find(f => f.name === 'delete')
      if (functionInfo === undefined) {
        deletePermission = 'remove'
      } else {
        deletePermission = functionInfo.permission
      }
      this.permissions = {
        create: entryType.functions.find(f => f.name === 'create').permission,
        update: updatePermission,
        delete: deletePermission
      }
      this.permissionsDialog = true
    },
    functionsCodeUpdated (entryType, libCode, handlersCode, permissionsCode) {
      const entryTypeCodeItem = this.zome.items.find(i => i.name === 'code').children
      if (entryTypeCodeItem) {
        const entryTypeSrcItem = entryTypeCodeItem.find(i => i.name === 'src').children
        entryTypeSrcItem[0].code = libCode
        if (entryTypeSrcItem) {
          const entryTypeItem = entryTypeSrcItem.find(i => i.name === entryType)
          entryTypeItem.children[0].code = handlersCode
          entryTypeItem.children[2].code = permissionsCode
        }
      }
    },
    loadFile (item) {
      switch (item.file) {
        case 'rs':
          this.options = {
            tabSize: 4,
            mode: 'rust',
            theme: 'base16-dark',
            readOnly: true,
            lineNumbers: true,
            line: true
          }
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
          break
        case 'md':
          this.options = {
            tabSize: 4,
            mode: 'markdown',
            theme: 'base16-dark',
            lineNumbers: true,
            line: true
          }
          break
      }
      if (item.code !== undefined) {
        this.code = item.code
        this.showModel = false
        this.showCode = true
      }
    },
    exportFiles () {
      writeFiles(this.items[0], this.project.folder)
    }
  },
  computed: {
    project () {
      const filtered = projects.filter(project => {
        return project.id === this.$route.params.id
      })
      return filtered[0]
    }
  }
}
</script>
