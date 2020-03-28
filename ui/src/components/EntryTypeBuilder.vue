<template>
  <div>
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab key="entity">
        Entry Fields
      </v-tab>
      <v-tab key="validation">
        Validation Rules
      </v-tab>
      <v-tab key="skin">
        Skin
      </v-tab>
      <v-tab key="code">
        Code
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="entity">
        <v-card>
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
          <v-row no-gutters>
            <v-col v-for="(field) in this.entryType.fields" :key="field.fieldName" cols="12">
              <entry-type-field :field="field" @save-entry-type-field="saveField" @delete-entry-type-field="deleteField"/>
            </v-col>
          </v-row>
        </v-card>
    </v-tab-item>
    <v-tab-item key="validation">
      <validation-rules />
    </v-tab-item>
    <v-tab-item key="skin">
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
          <v-tab-item key="validation">
            <v-card v-resize="onResizeValidation">
              <codemirror v-model="validationCode" :options="cmOptions" ref="cmValEditor"></codemirror>
            </v-card>
          </v-tab-item>
          <v-tab-item key="tests">
            <v-card v-resize="onResizeTests">
              <codemirror v-model="testCode" :options="cmOptions" ref="cmTestEditor"></codemirror>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-tab-item>
  </v-tabs-items>
</div>
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
import appFile from '../assets/dna_template/app.json.txt'
import hcignore from '../assets/dna_template/hcignore.txt'
import cargo from '../assets/dna_template/zomes/holochain_developer/code/Cargo.toml.txt'
import hcbuild from '../assets/dna_template/zomes/holochain_developer/code/hcbuild.txt'
import zome from '../assets/dna_template/zomes/holochain_developer/zome.json.txt'
import lib from '../assets/dna_template/zomes/holochain_developer/code/src/lib.rs.txt'
import funcs from '../assets/dna_template/zomes/holochain_developer/code/src/entryTypeFunctions.txt'
import decs from '../assets/dna_template/zomes/holochain_developer/code/src/entryTypeDeclarations.txt'
import handlers from '../assets/dna_template/zomes/holochain_developer/code/src/happ/handlers.rs.txt'
import mod from '../assets/dna_template/zomes/holochain_developer/code/src/happ/mod.rs.txt'
import validation from '../assets/dna_template/zomes/holochain_developer/code/src/happ/validation.rs.txt'
import index from '../assets/dna_template/test/index.js.txt'
import zomeIndex from '../assets/dna_template/test/holochain_developer/index.js.txt'
import configGenerate from '../assets/dna_template/test/config-generate.js.txt'
import testPackage from '../assets/dna_template/test/package.json.txt'

function ensureDirectoryExistence (filePath) {
  var dirname = path.dirname(filePath)
  console.log(dirname)
  if (!fs.existsSync(dirname)) {
    console.log('exists')
    fs.mkdirSync(dirname, { recursive: true })
  }
}

function replaceAndWriteAppFiles (templateFile, fileName, zomePlaceHolder, zomeName) {
  fs.writeFileSync(fileName, replacePlaceHolders(templateFile, zomePlaceHolder, zomeName))
}

function replacePlaceHolders (content, placeHolder, replacement) {
  const replacementC = replacement.charAt(0).toUpperCase() + replacement.substring(1)
  const replacementAllC = replacement.toUpperCase()
  const placeHolderC = placeHolder.charAt(0).toUpperCase() + placeHolder.substring(1)
  const placeHolderAllC = placeHolder.toUpperCase()
  return content.replace(new RegExp(placeHolder, 'g'), replacement).replace(new RegExp(placeHolderAllC, 'g'), replacementAllC).replace(new RegExp(placeHolderC, 'g'), replacementC)
}

function replaceAndWrite (templateFile, placeHolder, replacement, fileName) {
  fs.writeFileSync(fileName, replacePlaceHolders(templateFile, placeHolder, replacement))
}

function replaceLib (zomePlaceHolder, zomeName, typePlaceHolder, typeName) {
  const entryTypeFunctions = replacePlaceHolders(funcs, typePlaceHolder, typeName)
  const entryTypeDeclarations = replacePlaceHolders(decs, typePlaceHolder, typeName)
  const libContent = lib.replace(new RegExp(`mod ${zomePlaceHolder}`, 'g'), 'mod ' + zomeName).replace(new RegExp('entry_type_functions', 'g'), entryTypeFunctions).replace(new RegExp('entry_type_declarations', 'g'), entryTypeDeclarations)
  return libContent
}

function replaceAndWriteLib (fileName, zomePlaceHolder, zomeName, typePlaceHolder, typeName) {
  fs.writeFileSync(fileName, replaceLib(zomePlaceHolder, zomeName, typePlaceHolder, typeName))
}

function replaceMod (entryType, typePlaceHolder, typeName) {
  const rustFields = []
  const constRustNewFields = []
  entryType.fields.forEach(field => {
    if (field.fieldName !== 'id' && field.fieldName !== 'created_at') {
      rustFields.push(`\n\t${field.fieldName}: ${field.fieldType}`)
      constRustNewFields.push(`\n\t\t\t${field.fieldName}: ${typeName}_entry.${field.fieldName}`)
    }
  })
  const modContent = replacePlaceHolders(mod, typePlaceHolder, typeName)
  const modSplit = modContent.split('fields')
  const modDone = [modSplit[0], ...rustFields, modSplit[1], ...rustFields, modSplit[2], ...constRustNewFields, modSplit[3]]
  return modDone.join().replace(new RegExp('_comma,', 'g'), '')
}

function replaceAndWriteMod (entryType, hAppFolder, zomeName, typePlaceHolder, typeName) {
  fs.writeFileSync(path.join(hAppFolder, 'zomes/' + zomeName + '/code/src/' + typeName + '/mod.rs'), replaceMod(entryType, typePlaceHolder, typeName))
}

function zomeTestFile (happPlaceHolder, hAppName, zomePlaceHolder, zomeName, typePlaceHolder, typeName) {
  return zomeIndex.replace(new RegExp(happPlaceHolder, 'g'), hAppName).replace(new RegExp(typePlaceHolder, 'g'), typeName).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
}

function testFiles (hAppFolder, happPlaceHolder, hAppName, zomePlaceHolder, zomeName, typePlaceHolder, typeName) {
  const indexContent = index.replace(new RegExp(typePlaceHolder, 'g'), typeName).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
  const zomeIndexContent = zomeTestFile(happPlaceHolder, hAppName, zomePlaceHolder, zomeName, typePlaceHolder, typeName)
  const configGenerateContent = configGenerate.replace(new RegExp(typePlaceHolder, 'g'), typeName).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
  fs.writeFileSync(path.join(hAppFolder, 'test/index.js'), indexContent)
  fs.writeFileSync(path.join(hAppFolder, 'test/' + zomeName + '/index.js'), zomeIndexContent)
  fs.writeFileSync(path.join(hAppFolder, 'test/config-generate.js'), configGenerateContent)
  fs.writeFileSync(path.join(hAppFolder, 'test/package.json'), testPackage)
}

export default {
  name: 'EntryTypeBuilder',
  components: {
    EntryTypeField: () => import('../components/EntryTypeField'),
    ValidationRules: () => import('../components/ValidationRules'),
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
      happPlaceHolder: 'happ_name',
      typePlaceHolder: 'happ',
      zomePlaceHolder: 'holochain_developer',
      hAppName: this.hApp.name,
      hAppFolder: this.hApp.folder + '/dna/',
      zomeName: this.zome.name.toLowerCase(),
      typeName: this.entryType.name.toLowerCase(),
      libCode: '',
      modCode: '',
      handlersCode: '',
      validationCode: '',
      testCode: '',
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
      console.log(entryType)
      this.entryType.fields.push(
        {
          id: '',
          fieldName: '',
          fieldType: '',
          createTest: '',
          updateTest: ''
        })
      this.$emit('entry-type-updated', entryType)
    },
    generateEntryType (entryType) {
      console.log('generateEntryType')
      console.log(this.zomePlaceHolder)
      ensureDirectoryExistence(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/validation.rs')
      ensureDirectoryExistence(this.hAppFolder + 'test/' + this.zomeName + '/index.js')
      replaceAndWriteAppFiles(appFile, this.hAppFolder + '/app.json', this.zomePlaceHolder, this.zomeName)
      replaceAndWriteAppFiles(hcignore, this.hAppFolder + '/.hcignore', this.zomePlaceHolder, this.zomeName)
      replaceAndWriteAppFiles(zome, this.hAppFolder + 'zomes/' + this.zomeName + '/zome.json', this.zomePlaceHolder, this.zomeName)
      replaceAndWriteAppFiles(hcbuild, this.hAppFolder + 'zomes/' + this.zomeName + '/code/.hcbuild', this.zomePlaceHolder, this.zomeName)
      replaceAndWriteAppFiles(cargo, this.hAppFolder + 'zomes/' + this.zomeName + '/code/Cargo.toml', this.zomePlaceHolder, this.zomeName)
      replaceAndWriteLib(this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/lib.rs', this.zomePlaceHolder, this.zomeName, this.typePlaceHolder, this.typeName)
      replaceAndWrite(handlers, this.typePlaceHolder, this.typeName, this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/handlers.rs')
      replaceAndWriteMod(this.entryType, this.hAppFolder, this.zomeName, this.typePlaceHolder, this.typeName)
      replaceAndWrite(validation, this.typePlaceHolder, this.typeName, this.hAppFolder + 'zomes/' + this.zomeName + '/code/src/' + this.typeName + '/validation.rs')
      testFiles(this.hAppFolder, this.hAppPlaceholder, this.hAppName, this.zomePlaceHolder, this.zomeName, this.typePlaceHolder, this.typName)
      this.generateEntryTypeDialog = false
      this.$emit('entry-type-updated', entryType)
      this.$emit('close-entry-type-builder-dialog', this.entryType)
    },
    saveField (field, fieldName, fieldType) {
      console.log('Save Field')
      console.log(fieldName)
      field.fieldName = fieldName
      field.fieldType = fieldType
      console.log(field)
      this.$emit('entry-type-updated', this.entryType)
    },
    deleteField (field) {
      console.log('Delete field')
      const fieldName = field.fieldName
      console.log(fieldName)
      this.entryType.fields = this.entryType.fields.filter(function (field) {
        return field.fieldName !== fieldName
      })
      this.$emit('entry-type-updated', this.entryType)
    },
    deleteEntryType (spec) {
      this.$emit('delete-entry-type', spec)
    },
    onCmReady (cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus (cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange (newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
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
    onResizeTests () {
      this.testsCodemirror.setSize(window.innerWidth, window.innerHeight - 150)
    }
  },
  computed: {
    libCodemirror () {
      return this.$refs.cmLibEditor.codemirror
    },
    modCodemirror () {
      return this.$refs.cmModEditor.codemirror
    },
    handCodemirror () {
      return this.$refs.cmHandEditor.codemirror
    },
    valCodemirror () {
      return this.$refs.cmValEditor.codemirror
    },
    testsCodemirror () {
      return this.$refs.cmTestEditor.codemirror
    }
  },
  mounted () {
    this.libCode = replaceLib(this.zomePlaceHolder, this.zomeName, this.typePlaceHolder, this.typeName)
    this.modCode = replaceMod(this.entryType, this.typePlaceHolder, this.typeName)
    this.handlersCode = replacePlaceHolders(handlers, this.typePlaceHolder, this.typeName)
    this.validationCode = replacePlaceHolders(validation, this.typePlaceHolder, this.typeName)
    this.testCode = zomeTestFile(this.happPlaceHolder, this.hAppName, this.zomePlaceHolder, this.zomeName, this.typePlaceHolder, this.typeName)
  }
}
</script>
