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
      <v-btn color="action" icon @click="profileSpecDialog = true">
        <v-icon>mdi-badge-account-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/partNotes/${project.id}`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/part/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Click <v-icon>mdi-badge-account-outline</v-icon> (Identify) to be able to identify other agents using this DNA. Doing this will:
      <ul>
        <li>add a profile with Avatar & Handle as minimum required fields</li>
        <li>keep a list of all agents in the "Friends List" showing their Avatar & Handle
          <v-btn color="secondary" fab x-small>
            <v-icon>mdi-account-multiple</v-icon>
          </v-btn>
        </li>
        <li>enable "Whispers"</li>
        <li>enable Roles Based Permissions</li>
        <li>add the Agent Permission Manager for runtime management of which Agents are in which role</li>
      </ul>
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-notebook-outline</v-icon> (Kanban) to go to the Kanban Board.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-application</v-icon> (UI) to go to the Part Editor.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click the Zome name in the tree to see the model for the Zome.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click on any file name in the tree to see the code.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click the key icon on an entry type to change the permissions.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click the list icon on an entry type to manage the fields.
    </v-alert>
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
                  <v-btn v-if="item.index!==undefined" text @click="showZomeModel(item)" class="text-none">
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
              <v-img width='300' :src="require('@/assets/happs/crispr/logo.png')" />
              <v-card-subtitle class="pb-0">Build & Connect DNA from Data Models</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <div class="text--primary">
                      Holochain CRISPR makes it easy to edit your DNA by changing the fields in your entries, the DNA pattern and the permissions for who can add, edit and delete entries. Holochain is based on Biomimicry and like CRISPR Cas9 genetic editing Holochain CRISPR Cas enables editing of Holochain DNA.
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="mx-auto">
                      <p class="display-1 text--primary">
                        CRISPR - Cas
                      </p>
                      <p>Holochain DNA Editing</p>
                      <div class="text--primary">
                        Clone Rearrange Identify Socialise Personalise Repeat
                      </div>
                      <div class="text--primary">
                        (Content addressable system)
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="mx-auto">
                      <p class="display-1 text--primary">
                        C•R•I•S•P•R - Cas9
                      </p>
                      <p>Genetic DNA Editing</p>
                      <div class="text--primary">
                        Clustered Regularly Interspaced Short Palindromic Repeats
                      </div>
                      <div class="text--primary">
                        (CRISPR associated protein 9)
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <div>
                  <v-img width="450" :src="require('@/assets/icons/powered-by-holochain.png')" />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col v-if="showModel" cols="12">
            <zome-modeller :zome="zome" :key="refreshKey" @entry-type-functions-code-updated="entryTypeFunctionsCodeUpdated" @edit-properties="editProperties" @edit-permissions="editPermissions" @zome-model-updated="zomeModelUpdated"/>
          </v-col>
          <v-col v-if="showCode" cols="12">
            <code-window :code="code" :options="options"/>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="fieldsDialog" max-width="900px">
      <v-card flat>
        <entry-type-properties :entryType="entryType" @entry-type-name-updated="entryTypeNameUpdated" @entry-type-fields-updated="entryTypeFieldsUpdated" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="fieldsDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
     <v-dialog v-model="profileSpecDialog"  max-width="900px">
      <v-card flat>
        <v-row no-gutters align="start">
          <v-col cols="12">
            <profile-spec-builder :zome="this.zome" :profileSpec="this.profileSpec" @profile-spec-updated="profileSpecUpdated" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="profileSpecDialog = false">
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
    ProfileSpecBuilder: () => import('./ProfileSpecBuilder'),
    EntryTypeProperties: () => import('./EntryTypeProperties'),
    EntryTypePermissions: () => import('./EntryTypePermissions')
  },
  props: ['base'],
  data () {
    return {
      zomeTab: null,
      help: false,
      entryType: {},
      profileSpec: {
        specFields: []
      },
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
      fieldsDialog: false,
      profileSpecDialog: false,
      permissionsDialog: false,
      permissions: {}
    }
  },
  methods: {
    showZomeModel (item) {
      this.showModel = true
      this.showCode = false
    },
    profileSpecUpdated (profileSpec) {
      console.log(profileSpec)
    },
    editProperties (entryType) {
      this.entryType = entryType
      this.fieldsDialog = true
    },
    entryTypeNameUpdated (name) {
      // Not updating name until items are stored in Holochain so we can use ids.
      // this.entryType.name = name
      // this.refreshKey += '1'
    },
    entryTypeFieldsUpdated (fields) {
      this.entryType.fields = fields
      this.refreshKey += '1'
    },
    permissionChanged (entryFunction, role) {
      const functionInfo = this.entryType.functions.find(f => f.name === entryFunction)
      functionInfo.permission = role
      functionInfo.permissionsCode = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/${this.zome.template}/permissions_rule_templates/validate_permissions_entry_${entryFunction}/${role}.rs`, 'utf8')
      if (role === 'remove') {
        functionInfo.testCode = `\t\t// No-one allowed to ${entryFunction}`
      } else {
        functionInfo.testCode = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/${this.zome.template}/DNA/test/${this.zome.templateTypeName}/${role}-${entryFunction}-${this.zome.templateTypeName}.js`, 'utf8')
      }
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
    entryTypeFunctionsCodeUpdated (base, entryTypeName, handlersCode, permissionsCode, testCode) {
      const zomesItem = findItem(this.zome.items, 'Zomes')
      const testItem = findItem(this.zome.items, 'Test')
      const entryTypeNameItem = findItem(zomesItem.children, entryTypeName).children
      entryTypeNameItem[0].code = handlersCode
      entryTypeNameItem[2].code = permissionsCode
      const entryTypeTestItems = findItem(testItem.children, entryTypeName)
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
    ...mapGetters('portfolio', ['projectById', 'zomeByBaseIdFromTemplate', 'zomeByBaseId', 'fileItemsForZome']),
    project () {
      return this.projectById(this.$route.params.id)
    },
    zome () {
      const z = this.zomeByBaseIdFromTemplate(this.project)
      z.template = this.project.zome.template
      z.templateTypeName = this.project.zome.templateTypeName
      return z
    },
    items () {
      return this.zome.items
    },
    open () {
      return [this.items[0].name, 'DNA', 'Test', 'Zomes', 'UI']
    }
  }
}
</script>
