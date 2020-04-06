<template>
  <v-card flat class="mx-auto" height="calc(100% - 200px)">
    <v-toolbar>
      <v-toolbar-title>{{this.entryType.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        <v-icon>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12">
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab key="entity">
              Entry Fields
            </v-tab>
            <!-- <v-tab key="validation">
              Validation Rules
            </v-tab> -->
            <v-tab key="permissions">
              Permissions
            </v-tab>
            <v-tab key="code">
              Code
            </v-tab>
            <v-tab key="skin">
              Skin
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item key="entity">
                <v-card flat class="mx-auto">
                  <v-list-item>
                  <v-list-item-avatar>
                    <v-slide-x-reverse-transition mode="out-in">
                      <v-icon
                        large
                        class="ml-1"
                        :key="`icon-${isEditing}`"
                        :color="isEditing ? 'success' : 'info'"
                        @click="isEditing = !isEditing"
                        v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'">
                      </v-icon>
                    </v-slide-x-reverse-transition>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-text-field v-model="entryType.name" class="ml-2" :disabled="!isEditing" label="Entry Type Name" :hint="'Enter Entry Type Name'" persistent-hint v-if="isEditing"></v-text-field>
                    <v-list-item-title class="headline" v-if="!isEditing">Entry Type - {{ entryType.name }}</v-list-item-title>
                    <v-list-item-subtitle></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="isEditing">
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on }">
                          <v-icon
                            key="icon-delete"
                            color="error"
                            v-on="on">mdi-delete
                          </v-icon>
                        </template>
                        <v-card>
                          <v-card-title class="headline">Delete the Entry Type</v-card-title>
                          <v-card-text>This will remove {{entryType.name}}.</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
                            <v-btn color="green darken-1" text @click="deleteEntryType(entryType)">Proceed</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn text @click="addEntryTypeField(entryType)">
                      <v-icon>mdi-plus</v-icon>
                      Add Field
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn text @click="addEntryTypeProfileField(entryType)">
                      <v-icon>mdi-plus</v-icon>
                      Add Profile Field
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-dialog v-model="generateEntryTypeDialog" persistent max-width="390">
                        <template v-slot:activator="{ on }">
                          <v-btn text v-on="on">
                            <v-icon>mdi-clipboard-flow-outline</v-icon>
                              Generate Entry Type
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="headline">Generate Entry Type</v-card-title>
                          <v-list-item>
                            <v-list-item-content>
                              <v-col cols="12">
                                <v-card-text>
                                  This will generate the Entry Type & UI:
                                </v-card-text>
                                <v-card-text class="font-weight-bold mt-n5">
                                  {{entryType.name}}
                                </v-card-text>
                              </v-col>
                            </v-list-item-content>
                          </v-list-item>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="generateEntryTypeDialog = false">Cancel</v-btn>
                            <v-btn color="green darken-1" text @click="generateEntryType(entryType)">Proceed</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                  </v-list-item-action>
                  </v-list-item>
                  <v-content>
                    <v-row no-gutters align="start" justify="center">
                      <v-col v-for="(field, index) in this.entryType.fields" :key="index" cols="12">
                        <entry-type-field :index="index" :field="field" @save-entry-type-field="saveField" @delete-entry-type-field="deleteField"/>
                      </v-col>
                      <v-col cols="12" class="pa-10">
                        <div v-html="this.patternDescription" />
                      </v-col>
                    </v-row>
                  </v-content>
                </v-card>
            </v-tab-item>
            <!-- <v-tab-item key="validation">
              <validation-rules />
            </v-tab-item> -->
            <v-tab-item key="permissions">
              <entry-type-permissions :entryType="entryType" @permissionChanged="permissionChanged"/>
            </v-tab-item>
            <v-tab-item key="code">
              <v-card>
                <v-tabs v-model="codeTab" background-color="accent" dark>
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
            </v-tab-item>
            <v-tab-item key="skin">
              <zome-skin :hApp="this.hApp"/>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/rust/rust.js'
// theme css
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
  name: 'ZomeBuilder',
  components: {
    EntryTypeField: () => import('../components/EntryTypeField'),
    ZomeSkin: () => import('../components/ZomeSkin'),
    EntryTypePermissions: () => import('../components/EntryTypePermissions'),
    codemirror
  },
  props: ['hApp', 'zome', 'entryType'],
  data () {
    return {
      tab: null,
      codeTab: null,
      isEditing: '',
      dialog: false,
      generateEntryTypeDialog: false,
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
      patternDescription: this.entryType.pattern,
      cmOptions: {
        tabSize: 4,
        mode: 'rust',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  methods: {
    addEntryTypeField (entryType) {
      this.entryType.fields.push(
        {
          id: '',
          fieldName: '',
          fieldType: ''
        })
    },
    generateEntryType (entryType) {
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
      this.$emit('entry-type-updated', entryType)
      this.$emit('close-entry-type-builder-dialog', this.entryType)
    },
    saveField (fieldIndex, field) {
      console.log('Save Field')
      this.entryType.fields[fieldIndex] = field
      this.$emit('entry-type-updated', this.entryType)
    },
    deleteField (fieldIndex, field) {
      console.log('Delete field')
      this.entryType.fields.splice(fieldIndex, 1)
      this.$emit('entry-type-updated', this.entryType)
    },
    deleteEntryType (spec) {
      this.$emit('delete-entry-type', spec)
    },
    permissionChanged (mutation, role) {
      this.permissionsCode = this.permissionsTemplate
      switch (mutation) {
        case 'entryCreate':
          this.createEntryPermissionTemplate = fs.readFileSync(`${this.developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_create/${role}.rs`, 'utf8')
          break
        case 'entryModify':
          this.modifyEntryPermissionTemplate = fs.readFileSync(`${this.developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_modify/${role}.rs`, 'utf8')
          break
        case 'entryDelete':
          this.deleteEntryPermissionTemplate = fs.readFileSync(`${this.developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_delete/${role}.rs`, 'utf8')
          break
      }
      this.permissionsCode = this.permissionsCode.replace(new RegExp('// validate_permissions_entry_create', 'g'), this.createEntryPermissionTemplate)
      this.permissionsCode = this.permissionsCode.replace(new RegExp('// validate_permissions_entry_modify', 'g'), this.modifyEntryPermissionTemplate)
      this.permissionsCode = this.permissionsCode.replace(new RegExp('// validate_permissions_entry_delete', 'g'), this.deleteEntryPermissionTemplate)
      if (this.$refs.cmPermEditor !== undefined) {
        this.permCodemirror.refresh()
      }
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
  }
}
</script>
