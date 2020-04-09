<template>
  <v-card flat height="calc(100%-200px)" width="100%" class="pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="3">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Application Files</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-1 ml-n1">
            <template>
              <v-img width="20" :src="require(`@/assets/icons/holochain-circle.png`)" />
            </template>
          </v-btn>
        </v-toolbar>
        <v-treeview
          v-model="tree"
          :open="open"
          :items="this.zome.items"
          activatable
          item-key="name"
          dense
          open-on-click>
          <template v-slot:prepend="{ item, open }">
            <v-btn icon>
              <v-icon>
                {{ open ? 'mdi-folder-open' : 'mdi-folder-closed' }}
              </v-icon>
            </v-btn>
          </template>
          <template v-slot:label="{ item }">
            <v-btn text @click="loadFile(item)">
              {{item.name}}
            </v-btn>
          </template>
        </v-treeview>
      </v-col>
      <v-col cols="9">
        <v-card flat class="mx-auto">
        <v-content>
        <v-row no-gutters align="start" justify="center">
        <v-col cols="12">
          <v-card>
            <v-tabs v-model="codeTab" background-color="accent" dark height="64">
                <v-tab key="lib">
                lib.rs
                </v-tab>
                <v-tab key="mod">
                mod.rs
                </v-tab>
                <v-tab key="handlers">
                handlers.rs
                </v-tab>
                <v-tab key="permissions">
                permissions.rs
                </v-tab>
                <v-tab key="validation">
                validations.rs
                </v-tab>
                <v-tab key="tests">
                {{entryType.name}}/index.js
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="codeTab">
                <v-tab-item key="lib">
                <v-card v-resize="onResizeLib">
                    <codemirror v-model="libCode" :options="cmOptions" ref="cmLibEditor"></codemirror>
                </v-card>
                </v-tab-item>
                <v-tab-item key="mod">
                <v-card v-resize="onResizeMod">
                    <codemirror v-model="modCode" :options="cmOptions" ref="cmModEditor"></codemirror>
                </v-card>
                </v-tab-item>
                <v-tab-item key="handlers">
                <v-card v-resize="onResizeHandlers">
                    <codemirror v-model="handlersCode" :options="cmOptions" ref="cmHandEditor"></codemirror>
                </v-card>
                </v-tab-item>
                <v-tab-item key="permissions">
                <v-card v-resize="onResizePermissions">
                    <codemirror v-model="permissionsCode" :options="cmOptions" ref="cmPermEditor"></codemirror>
                </v-card>
                </v-tab-item>
                <v-tab-item key="validation">
                <v-card v-resize="onResizeValidation">
                    <codemirror v-model="validationCode" :options="cmOptions" ref="cmValEditor"></codemirror>
                </v-card>
                </v-tab-item>
                <v-tab-item key="tests">
                <v-card v-resize="onResizeTests">
                    <codemirror v-model="testZomeIndexCode" :options="cmOptions" ref="cmTestEditor"></codemirror>
                </v-card>
                </v-tab-item>
            </v-tabs-items>
            </v-card>
        </v-col>
        </v-row>
        </v-content>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/rust/rust.js'
import 'codemirror/theme/base16-dark.css'
import * as fs from 'fs'
import * as path from 'path'
import { mapState } from 'vuex'

function ensureDirectoryExistence (filePath) {
  var dirname = path.dirname(filePath)
  console.log(dirname)
  if (!fs.existsSync(dirname)) {
    console.log('exists')
    fs.mkdirSync(dirname, { recursive: true })
  }
}

function replacePlaceHolders (content, placeHolder, replacement) {
  const replacementC = replacement.charAt(0).toUpperCase() + replacement.substring(1)
  const replacementAllC = replacement.toUpperCase()
  const placeHolderC = placeHolder.charAt(0).toUpperCase() + placeHolder.substring(1)
  const placeHolderAllC = placeHolder.toUpperCase()
  return content.replace(new RegExp(placeHolder, 'g'), replacement).replace(new RegExp(placeHolderAllC, 'g'), replacementAllC).replace(new RegExp(placeHolderC, 'g'), replacementC)
}

function replaceMod (modTemplate, entryType, typePlaceHolder, typeName) {
  const rustFields = []
  const constRustNewFields = []
  entryType.fields.forEach(field => {
    if (field.fieldName !== 'id' && field.fieldName !== 'created_at' && field.fieldName !== 'updated_at') {
      rustFields.push(`\n\t${field.fieldName}: ${field.fieldType}`)
      constRustNewFields.push(`\n\t\t\t${field.fieldName}: ${typeName}_entry.${field.fieldName}`)
    }
  })
  const modContent = replacePlaceHolders(modTemplate, typePlaceHolder, typeName)
  const modSplit = modContent.split('fields')
  const modDone = [modSplit[0], ...rustFields, modSplit[1], ...rustFields, modSplit[2], ...constRustNewFields, modSplit[3]]
  return modDone.join().replace(new RegExp('_comma,', 'g'), '')
}

function zomeTestFile (zomeIndex, folder, notePlaceHolder, hAppName, zomePlaceHolder, zomeName, typePlaceHolder, entryType) {
  // Need to loop for multiple rules later.
  // const validateEntryModifyTemplate = '' // fs.readFileSync(`${folder}/templates/validation_rule_templates/validate_entry_modify/${entryType.validationRules.validateEntryModify[0].template}.test`)
  // const validateEntryDeleteTemplate = '' // fs.readFileSync(`${folder}/templates/validation_rule_templates/validate_entry_delete/${entryType.validationRules.validateEntryDelete[0].template}.test`)
  // return zomeIndex.replace(new RegExp('validate_entry_modify', 'g'), validateEntryModifyTemplate).replace(new RegExp('validate_entry_delete', 'g'), validateEntryDeleteTemplate)
  return zomeIndex.replace(new RegExp(notePlaceHolder, 'g'), hAppName.toLowerCase()).replace(new RegExp(typePlaceHolder, 'g'), entryType.name.toLowerCase()).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
}

export default {
  name: 'ZomeCodeEditor',
  props: ['hApp', 'zome', 'entryType'],
  components: {
    codemirror
  },
  data () {
    return {
      codeTab: null,
      happPlaceHolder: 'NotesDNA',
      typePlaceHolder: 'note',
      zomePlaceHolder: 'notes',
      hAppName: this.hApp.name,
      hAppFolder: this.hApp.folder + '/dna/',
      zomeName: this.zome.name.toLowerCase(),
      typeName: this.entryType.name.toLowerCase(),
      permissionsTemplate: '',
      permissionsCode: '',
      createEntryPermissionTemplate: '',
      modifyEntryPermissionTemplate: '',
      cmOptions: {
        tabSize: 4,
        mode: 'rust',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      },
      tree: [],
      open: ['Notes App', 'dna', 'ui']
    }
  },
  methods: {
    listFiles (item) {
      this.files = item.files
    },
    writeZomeCode (entryType) {
      console.log('generateEntryType')
      console.log(this.zomePlaceHolder)
      ensureDirectoryExistence(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/validation.rs')
      ensureDirectoryExistence(this.hAppFolder + 'test/' + this.zomeName + '/index.js')
      fs.writeFileSync(path.join(this.hAppFolder + '/app.json'), this.appJsonCode)
      fs.writeFileSync(path.join(this.hAppFolder + '/.hcignore'), this.hcignoreCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/zome.json'), this.zomeJsonCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/.hcbuild'), this.hcbuildCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/Cargo.toml'), this.cargoCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/lib.rs'), this.libCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/mod.rs'), this.modCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/handlers.rs'), this.handlersCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/permissions.rs'), this.permissionsCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/validation.rs'), this.validationCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'test/package.json'), this.testPackageCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'test/index.js'), this.testIndexCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'test/' + this.zomeName + '/index.js'), this.testZomeIndexCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'test/config-generate.js'), this.configGenerateCode)
      fs.writeFileSync(path.join(this.hAppFolder + 'test/config-copy.js'), this.configCopyCode)
      this.generateEntryTypeDialog = false
      this.$emit('close-entry-type-builder-dialog', this.entryType)
    },
    onResizeLib () {
      this.libCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    },
    onResizeMod () {
      this.modCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    },
    onResizeHandlers () {
      this.handCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    },
    onResizeValidation () {
      this.valCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    },
    onResizePermissions () {
      this.permCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    },
    onResizeTests () {
      this.testsCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    }
  },
  computed: {
    ...mapState('app', ['developer']),
    libCodemirror () {
      return this.$refs.cmLibEditor.codemirror
    },
    modCodemirror () {
      return this.$refs.cmModEditor.codemirror
    },
    handCodemirror () {
      return this.$refs.cmHandEditor.codemirror
    },
    permCodemirror () {
      return this.$refs.cmPermEditor.codemirror
    },
    valCodemirror () {
      return this.$refs.cmValEditor.codemirror
    },
    testsCodemirror () {
      return this.$refs.cmTestEditor.codemirror
    },
    appJsonCode () {
      const appTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/app.json`, 'utf8')
      return replacePlaceHolders(appTemplate, this.zomePlaceHolder, this.zomeName)
    },
    hcignoreCode () {
      const hcignoreTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/.hcignore`, 'utf8')
      return replacePlaceHolders(hcignoreTemplate, this.zomePlaceHolder, this.zomeName)
    },
    zomeJsonCode () {
      const zomeTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/zome.json`, 'utf8')
      return replacePlaceHolders(zomeTemplate, this.zomePlaceHolder, this.zomeName)
    },
    hcbuildCode () {
      const hcbuildTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/.hcbuild`, 'utf8')
      return replacePlaceHolders(hcbuildTemplate, this.zomePlaceHolder, this.zomeName)
    },
    cargoCode () {
      const cargoTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/Cargo.toml`, 'utf8')
      return replacePlaceHolders(cargoTemplate, this.zomePlaceHolder, this.zomeName)
    },
    libCode () {
      const libTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/lib.rs`, 'utf8')
      // const entryTypeFuncs = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/entryTypeFunctions`, 'utf8')
      // const entryTypeDecs = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/entryTypeDeclarations`, 'utf8')
      // const entryTypeFunctions = '' // replacePlaceHolders(entryTypeFuncs, this.typePlaceHolder, this.typeName)
      // const entryTypeDeclarations = '' // replacePlaceHolders(entryTypeDecs, this.typePlaceHolder, this.typeName)
      // return libTemplate.replace(new RegExp(`mod ${this.zomePlaceHolder}`, 'g'), 'mod ' + this.zomeName).replace(new RegExp('entry_type_functions', 'g'), entryTypeFunctions).replace(new RegExp('entry_type_declarations', 'g'), entryTypeDeclarations)
      return replacePlaceHolders(libTemplate, this.typePlaceHolder, this.typeName)
    },
    modCode () {
      const modTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/note/mod.rs`, 'utf8')
      return replaceMod(modTemplate, this.entryType, this.typePlaceHolder, this.typeName)
    },
    handlersCode () {
      const handlerTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/note/handlers.rs`, 'utf8')
      return replacePlaceHolders(handlerTemplate, this.typePlaceHolder, this.typeName)
    },
    validationCode () {
      const validationTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/note/validation.rs`, 'utf8')
      return replacePlaceHolders(validationTemplate, this.typePlaceHolder, this.typeName)
    },
    configGenerateCode () {
      const configGenerate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/test/config-generate.js`, 'utf8')
      return replacePlaceHolders(configGenerate, this.zomePlaceHolder, this.zomeName)
    },
    configCopyCode () {
      return fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/test/config-copy.js`, 'utf8')
    },
    testPackageCode () {
      return fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/test/package.json`, 'utf8')
    },
    testIndexCode () {
      const testIndexTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/test/index.js`, 'utf8')
      const testIndexHapp = replacePlaceHolders(testIndexTemplate, this.typePlaceHolder, this.typeName)
      return replacePlaceHolders(testIndexHapp, this.zomePlaceHolder, this.zomeName)
    },
    testZomeIndexCode () {
      const zomeIndexTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/test/notes/index.js`, 'utf8')
      return zomeTestFile(zomeIndexTemplate, this.developer.folder, this.happPlaceHolder, this.hAppName, this.zomePlaceHolder, this.zomeName, this.typePlaceHolder, this.entryType)
    }
  },
  mounted: function () {
    this.permissionsTemplate = fs.readFileSync(`${this.developer.folder}/templates/dna_templates/NotesDNA/zomes/notes/code/src/note/permissions.rs`, 'utf8')
    this.permissionsCode = replacePlaceHolders(this.permissionsTemplate, this.typePlaceHolder, this.typeName)
    this.permissionsCode = this.permissionsCode.replace(new RegExp('// validate_permissions_entry_create', 'g'), this.entryType.createEntryPermissionTemplate)
    this.permissionsCode = this.permissionsCode.replace(new RegExp('// validate_permissions_entry_modify', 'g'), this.entryType.modifyEntryPermissionTemplate)
    this.permissionsCode = this.permissionsCode.replace(new RegExp('// validate_permissions_entry_delete', 'g'), this.entryType.deleteEntryPermissionTemplate)
    if (this.$refs.cmPermEditor !== undefined) {
      this.permCodemirror.refresh()
    }
  }
}
</script>
<style>
.skin {
  background-color: #ffffff;
  color: black;
}
</style>
