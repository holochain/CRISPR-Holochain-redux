<template>
  <v-card flat tile>
    <v-toolbar dark>
      <v-toolbar-title>CRISPR Part [{{project.name}}] - Zome [{{this.zome.name}}]</v-toolbar-title>
      <v-btn icon>
        <v-icon @click="exportFiles">
          mdi-application-export
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="action" icon :to="`/partNotes/${project.id}`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/part/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row no-gutters>
      <v-col cols="3">
        <v-card flat tile height="94vh" class="pa-0 ma-0 overflow-auto">
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
        <v-card flat tile height="93vh">
          <v-col v-if="showCode === showModel" cols="12">
            <v-card class="mx-auto pt-10" max-width="900">
              <v-img class="white--text align-end" width="900px" :src="require('@/assets/icons/holochain.png')">
              </v-img>
              <v-card-title>Holochain CRISPR</v-card-title>
              <v-card-subtitle class="pb-0">Build & Connect DNA from Data Models</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col v-if="showModel" cols="12">
            <zome-modeller :zome="zome" :key="refreshKey" @entry-type-functions-code-updated="entryTypeFunctionsCodeUpdated" @edit-permissions="editPermissions" @zome-model-updated="zomeModelUpdated"/>
          </v-col>
          <v-col v-if="showCode" cols="12">
            <code-window :code="code" :options="options"/>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="permissionsDialog" max-width="700px">
      <v-card flat>
        <v-toolbar dark>
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
import { mapGetters, mapState } from 'vuex'

function ensureDirectoryExistence (filePath) {
  var dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
}

function writeFiles (item, folder) {
  console.log(folder)
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

function findItem (items, name) {
  function iter (a) {
    if (a.name.toLowerCase() === name.toLowerCase()) {
      result = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  }
  var result
  items.some(iter)
  return result
}

export default {
  name: 'DnaModeller',
  components: {
    ZomeModeller: () => import('./ZomeModeller'),
    CodeWindow: () => import('./CodeWindow'),
    EntryTypePermissions: () => import('./EntryTypePermissions')
  },
  props: ['base'],
  data () {
    return {
      zomeTab: null,
      entryType: {},
      refreshKey: 'clean',
      tree: [],
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
      console.log(item)
      item.children = this.zome.items
      findItem(this.items, 'Entry Types').children = this.zome.testItems
      console.log(item)
      this.showModel = true
      this.showCode = false
    },
    permissionChanged (entryFunction, role) {
      const functionInfo = this.entryType.functions.find(f => f.name === entryFunction)
      functionInfo.permission = role
      functionInfo.permissionsCode = fs.readFileSync(`${this.developer.folder}/templates/parts/${this.zome.template}/permissions_rule_templates/validate_permissions_entry_${entryFunction}/${role}.rs`, 'utf8')
      if (role === 'remove') {
        functionInfo.testCode = `\t\t// No-one allowed to ${entryFunction}`
      } else {
        functionInfo.testCode = fs.readFileSync(`${this.developer.folder}/templates/parts/${this.zome.template}/DNA/test/${this.entryType.name.toLowerCase()}/${role}-${entryFunction}-${this.entryType.name.toLowerCase()}.js`, 'utf8')
      }
      this.refreshKey += '1'
    },
    editPermissions (entryType) {
      console.log('entryType', entryType)
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
    entryTypeFunctionsCodeUpdated (base, entryTypeName, handlersCode, permissionsCode, testCode) {
      console.log('entryTypeFunctionsCodeUpdated', this.zome, base, entryTypeName)
      const entryTypeNameItem = findItem(this.zome.items, entryTypeName).children
      entryTypeNameItem[0].code = handlersCode
      entryTypeNameItem[2].code = permissionsCode
      const entryTypeTestItems = findItem(this.zome.testItems, entryTypeName)
      findItem(entryTypeTestItems.children, 'index.js').code = testCode
    },
    zomeModelUpdated (libCode) {
      findItem(this.zome.items, 'lib.rs').code = libCode
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
    ...mapState('auth', ['developer']),
    ...mapGetters('portfolio', ['projectById', 'zomeByBaseId', 'fileItemsForZome']),
    project () {
      return this.projectById(this.$route.params.id)
    },
    zome () {
      return this.zomeByBaseId(this.$route.params.id)
    },
    items () {
      return this.fileItemsForZome(this.zome.name)
    },
    open () {
      return [this.project.name, 'DNA', 'Test', 'Zomes', 'UI']
    }
  }
}
</script>
