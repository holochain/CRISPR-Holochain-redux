<template>
  <div>
    <v-tabs v-model="tab" background-color="secondary" dark>
      <v-tab key="entity">
        Entry Fields
      </v-tab>
      <v-tab key="validation">
        Validation Rules
      </v-tab>
      <v-tab key="ui">
        UI
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
      <v-card v-resize="onResize" class="red">
        <codemirror v-model="code" :options="cmOptions" ref="cm"></codemirror>
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

function replacePlaceHolders (content, placeHolder, replacement) {
  placeHolder = placeHolder.toLowerCase()
  replacement = replacement.toLowerCase()
  const replacementC = replacement.charAt(0).toUpperCase() + replacement.substring(1)
  const replacementAllC = replacement.toUpperCase()
  const placeHolderC = placeHolder.charAt(0).toUpperCase() + placeHolder.substring(1)
  const placeHolderAllC = placeHolder.toUpperCase()
  return content.replace(new RegExp(placeHolder, 'g'), replacement).replace(new RegExp(placeHolderAllC, 'g'), replacementAllC).replace(new RegExp(placeHolderC, 'g'), replacementC)
}

function replaceAndWrite (templateFile, placeHolder, replacement, fileName) {
  fs.writeFileSync(fileName, replacePlaceHolders(templateFile, placeHolder, replacement))
}

function replaceAndWriteLib (placeHolder, typeName, zomeName, fileName) {
  const entryTypeFunctions = replacePlaceHolders(funcs, placeHolder, typeName)
  const entryTypeDeclarations = replacePlaceHolders(decs, placeHolder, typeName)
  const libContent = lib.replace(new RegExp('mod holochain_developer', 'g'), 'mod ' + zomeName).replace(new RegExp('entry_type_functions', 'g'), entryTypeFunctions).replace(new RegExp('entry_type_declarations', 'g'), entryTypeDeclarations)
  fs.writeFileSync(fileName, replacePlaceHolders(libContent, placeHolder, typeName))
}

function modFile (entryType, zomeName, folder) {
  const entryTypeName = entryType.name.toLowerCase()
  const rustFields = []
  const constRustNewFields = []
  entryType.fields.forEach(field => {
    if (field.fieldName !== 'id' && field.fieldName !== 'created_at') {
      rustFields.push(`\n\t${field.fieldName}: ${field.fieldType}`)
      constRustNewFields.push(`\n\t\t\t${field.fieldName}: ${entryTypeName}_entry.${field.fieldName}`)
    }
  })
  const placeHolder = 'happ'
  const modContent = replacePlaceHolders(mod, placeHolder, entryTypeName)
  const modSplit = modContent.split('fields')
  const modDone = [modSplit[0], ...rustFields, modSplit[1], ...rustFields, modSplit[2], ...constRustNewFields, modSplit[3]]
  fs.writeFileSync(path.join(folder, 'zomes/' + zomeName + '/code/src/' + entryTypeName + '/mod.rs'), modDone.join().replace(new RegExp('_comma,', 'g'), ''))
}

function testFiles (typeName, zomeName, folder) {
  const typePlaceHolder = 'happ'
  const zomePlaceHolder = 'holochain_developer'
  const indexContent = index.replace(new RegExp(typePlaceHolder, 'g'), typeName).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
  const zomeIndexContent = zomeIndex.replace(new RegExp(typePlaceHolder, 'g'), typeName).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
  const configGenerateContent = configGenerate.replace(new RegExp(typePlaceHolder, 'g'), typeName).replace(new RegExp(zomePlaceHolder, 'g'), zomeName)
  fs.writeFileSync(path.join(folder, 'test/index.js'), indexContent)
  fs.writeFileSync(path.join(folder, 'test/' + zomeName + '/index.js'), zomeIndexContent)
  fs.writeFileSync(path.join(folder, 'test/config-generate.js'), configGenerateContent)
  fs.writeFileSync(path.join(folder, 'test/package.json'), testPackage)
}

export default {
  name: 'EntryTypeBuilder',
  components: {
    EntryTypeField: () => import('../components/EntryTypeField'),
    codemirror
  },
  props: ['folder', 'zome', 'entryType'],
  data () {
    return {
      tab: null,
      isEditing: '',
      dialog: false,
      generateEntryTypeDialog: false,
      code: replacePlaceHolders(validation, 'happ', this.entryType.name),
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
      const zomeName = this.zome.toLowerCase()
      const typeName = this.entryType.name.toLowerCase()
      const folder = this.folder + '/dna/'
      console.log(folder)
      ensureDirectoryExistence(folder + 'zomes/' + zomeName + '/code/src/' + typeName + '/validation.rs')
      ensureDirectoryExistence(folder + 'test/' + zomeName + '/index.js')
      replaceAndWrite(appFile, 'holochain_developer', zomeName, folder + '/app.json')
      replaceAndWrite(hcignore, 'holochain_developer', zomeName, folder + '/.hcignore')
      replaceAndWrite(zome, 'holochain_developer', zomeName, folder + 'zomes/' + zomeName + '/zome.json')
      replaceAndWrite(hcbuild, 'holochain_developer', zomeName, folder + 'zomes/' + zomeName + '/code/.hcbuild')
      replaceAndWrite(cargo, 'holochain_developer', zomeName, folder + 'zomes/' + zomeName + '/code/Cargo.toml')
      replaceAndWriteLib('happ', typeName, zomeName, folder + 'zomes/' + zomeName + '/code/src/lib.rs')
      replaceAndWrite(handlers, 'happ', typeName, folder + 'zomes/' + zomeName + '/code/src/' + typeName + '/handlers.rs')
      modFile(entryType, zomeName, folder)
      replaceAndWrite(validation, 'happ', typeName, folder + 'zomes/' + zomeName + '/code/src/' + typeName + '/validation.rs')
      testFiles(typeName, zomeName, folder)
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
    onResize () {
      this.$refs.cm.codemirror.setSize(window.innerWidth, window.innerHeight - 300)
    }
  },
  computed: {
    codemirror () {
      return this.$refs.cm.codemirror
    }
  }
}
</script>
