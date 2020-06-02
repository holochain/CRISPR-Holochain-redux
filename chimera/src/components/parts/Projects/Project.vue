<template>
  <v-card class="ma-5">
    <router-link icon v-if="project.happId" :to="`/store/${project.type}/${project.happId}`">
      <v-img class="white--text align-end" :src="project.preview">
        <v-card-title class="text-no-wrap">{{ project.name }}</v-card-title>
      </v-img>
    </router-link>
    <v-img v-else class="white--text align-end" width="300" :src="project.preview">
      <v-card-title class="text-no-wrap">{{ project.name }}</v-card-title>
    </v-img>
    <div v-if="details">
      <v-card-text>
        <div class="text--primary">
          {{ project.description.substring(0, 90) }}...
        </div>
      </v-card-text>
    </div>
    <v-divider />
    <v-card-actions>
      <v-btn color="action" icon :to="`/projectKanban/${project.id}`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/part/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/${project.id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
      <v-btn color="alert" icon @click="cloningDialog = true">
        <v-icon>mdi-dna</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="cloningDialog" max-width="700px">
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title class="display-1">Let's clone - {{project.name}}</v-toolbar-title>
        </v-toolbar>
        <v-row no-gutters align="start" justify="center">
          <v-col cols="12">
            <v-text-field class="ml-2 white--text" v-model="clone.name" label="Project Name" :hint="`A plural such as ${project.name} or Notes`" />
            <v-textarea class="ml-2 white--text" v-model="clone.description" label="Description" hint="What new characteristics are you giving your clone?" />
            <v-text-field class="ml-2 white--text" v-if="clone.zome" v-model="clone.zome.name" label="Zome Name" :hint="`A plural such as ${project.name} or Notes`" />
            <v-text-field class="ml-2 white--text" v-if="clone.zome" v-model="clone.zome.entryTypes[0].name" label="Entry Type Name" :hint="`A singular such as ${project.zome.entryTypes[0].name} or note`" />
            <v-image-input v-model="clone.preview" :image-quality="0.85" clearable image-format="jpeg,png" :image-height="200" :image-width="200"/>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="cloningDialog = false">
            Cancel
          </v-btn>
          <v-btn color="action darken-1" text @click="saveProject(clone); copyParts(); cloningDialog = false">
            Clone
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import * as fs from 'fs'
import * as path from 'path'
import { mapActions, mapState } from 'vuex'
import VImageInput from 'vuetify-image-input/a-la-carte'
function ensureDirectoryExistence (filePath) {
  var dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
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
export default {
  name: 'HolochainProject',
  components: {
    VImageInput
  },
  data () {
    return {
      cloningDialog: false,
      publishDialog: false
    }
  },
  props: {
    project: {
      type: Object,
      default: function () {
        return {
          id: '0',
          domain: 'escr',
          player: 'Philip Beadle',
          mobile: '0417301024'
        }
      }
    },
    clone: {
      type: Object,
      default: function () {
        const project = JSON.parse(JSON.stringify(this.project))
        project.id = 'new'
        console.log(project)
        return project
      }
    },
    details: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions('projects', ['saveProject']),
    copyParts () {
      let listPart = fs.readFileSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.project.name}.vue`, 'utf8')
      const listPartCloneFileName = `${this.developer.folder}/chimera/src/components/parts/${this.clone.name}/${this.clone.name}.vue`
      ensureDirectoryExistence(listPartCloneFileName)
      console.log(listPart)
      listPart = replacePlaceHolders(listPart, this.project.zome.entryTypes[0].name, this.clone.zome.entryTypes[0].name)
      console.log(listPart, this.project.zome.entryTypes[0].name, this.clone.zome.entryTypes[0].name)
      fs.writeFileSync(listPartCloneFileName, listPart, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
      })
      let part = fs.readFileSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.project.zome.entryTypes[0].name}.vue`, 'utf8')
      let partCloneFileName = this.clone.zome.entryTypes[0].name
      partCloneFileName = partCloneFileName.charAt(0).toUpperCase() + partCloneFileName.substring(1)
      partCloneFileName = `${this.developer.folder}/chimera/src/components/parts/${this.clone.name}/${partCloneFileName}.vue`
      console.log(partCloneFileName)
      ensureDirectoryExistence(partCloneFileName)
      part = replacePlaceHolders(part, this.project.zome.entryTypes[0].name, this.clone.zome.entryTypes[0].name)
      fs.writeFileSync(partCloneFileName, part, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
      })
      let store = fs.readFileSync(`${this.developer.folder}/chimera/src/components/parts/${this.project.name}/${this.project.name}Store.js`, 'utf8')
      const storeFileName = `${this.developer.folder}/chimera/src/components/parts/${this.clone.name}/${this.clone.name}Store.js`
      ensureDirectoryExistence(storeFileName)
      store = replacePlaceHolders(store, this.project.zome.entryTypes[0].name, this.clone.zome.entryTypes[0].name)
      fs.writeFileSync(storeFileName, store, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
      })
      const storeFile = `${this.developer.folder}/chimera/src/store/index.js`
      let vuexStore = fs.readFileSync(storeFile, 'utf8')
      const importStore = `import ${this.clone.name} from '@/components/parts/${this.clone.name}/${this.clone.name}Store'\n`
      const moduleStore = `${this.clone.name.toLowerCase()},\n    `
      const part1 = vuexStore.slice(0, vuexStore.indexOf('// NewImportModule'))
      const part2 = vuexStore.slice(vuexStore.indexOf('// NewImportModule'), vuexStore.indexOf('// NewModule'))
      const part3 = vuexStore.slice(vuexStore.indexOf('// NewModule'), vuexStore.length)
      vuexStore = part1 + importStore + part2 + moduleStore + part3
      fs.writeFileSync(`${this.developer.folder}/chimera/src/store/index.js`, vuexStore, (err) => {
        if (err) throw err
        console.log('The file has been saved!')
      })
    }
  },
  computed: {
    ...mapState('auth', ['developer'])
  }
}
</script>
