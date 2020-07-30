<template>
  <v-card flat class="mx-auto" dark>
    <v-alert v-if="errors" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="resetErrors({ instance: instance, base: base })">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-row no-gutters>
      <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" lg="3">
        <project :key="project.id" :instance="instance" :base="base" :project="project" :details="details" :showPartEditor="showPartEditor" />
      </v-col>
    </v-row>
    <slot></slot>
    <v-dialog v-model="showNewProject" max-width="700px">
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title class="display-1">New Project</v-toolbar-title>
        </v-toolbar>
        <v-row no-gutters align="start" justify="center">
          <v-col cols="12">
            <v-text-field class="ml-2 white--text" v-model="projectTemplate.name" label="Project Name" :hint="`A plural such as Notes`" />
            <v-textarea class="ml-2 white--text" v-model="projectTemplate.description" label="Description" hint="What new characteristics are you giving your new project?" />
            <v-text-field class="ml-2 white--text" v-model="projectTemplate.zome.name" label="Zome Name" :hint="`A plural such as Notes`" />
            <v-text-field class="ml-2 white--text" v-model="projectTemplate.zome.entryTypes[0].name" label="Entry Type Name" :hint="`A singular such as note`" />
            <v-image-input v-model="projectImage" :image-quality="0.85" clearable image-format="jpeg,png" :image-height="200" :image-width="200"/>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="cancelNewProject">
            Cancel
          </v-btn>
          <v-btn color="action darken-1" text @click="copyParts()">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import * as fs from 'fs'
import * as path from 'path'
import VImageInput from 'vuetify-image-input/a-la-carte'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

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
  name: 'Projects',
  components: {
    Project: () => import('./Project'),
    VImageInput
  },
  props: ['instance', 'base', 'title', 'details', 'showPartEditor', 'showNewProject'],
  data () {
    return {
      projectImage: '',
      projectTemplate: {
        name: '',
        preview: '/Users/philipbeadle/holochain/CRISPR-Holochain-redux/chimera/src/assets/projects/Events/preview.png',
        description: '',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: '',
          entryTypes: [
            {
              id: 'QmOriginEntryTypeHash',
              name: 'event',
              template: 'list_anchor_types_1',
              uuid: true,
              fields: [
                {
                  id: 'QM234566777887',
                  fieldName: 'content',
                  fieldType: 'String',
                  fieldDescription: 'Content',
                  required: false
                }
              ]
            }
          ],
          anchorTypes: [
            {
              id: 'Qmlist_origins1',
              type: 'list_origins',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [
                {
                  entityId: 'QmOriginEntryTypeHash',
                  type: 'origin_link',
                  tag: 'created_at',
                  context: 'exclusive'
                }
              ],
              anchors: []
            }
          ],
          profileSpec: {
            id: 'QmOriginProfileSpecHash',
            template: 'identify',
            fields: []
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('root', ['fetchEntries', 'createEntry', 'resetErrors', 'agentAddress', 'fetchProfiles']),
    ...mapMutations('friends', ['setGroup']),
    copyParts () {
      let part = fs.readFileSync(`${this.developer.folder}/chimera/src/components/parts/PartTemplate.vue`, 'utf8')
      let newPartFileName = this.projectTemplate.zome.entryTypes[0].name
      newPartFileName = newPartFileName.charAt(0).toUpperCase() + newPartFileName.substring(1)
      newPartFileName = `${this.developer.folder}/chimera/src/components/parts/${this.projectTemplate.name}/${newPartFileName}.vue`
      console.log(newPartFileName)
      ensureDirectoryExistence(newPartFileName)
      part = replacePlaceHolders(part, 'PartTemplate', this.projectTemplate.zome.entryTypes[0].name)
      fs.writeFileSync(newPartFileName, part, (err) => {
        if (err) throw err
        console.log(`${newPartFileName} has been created!`)
      })
      const newProjectEntry = JSON.parse(JSON.stringify(this.projectTemplate))
      newProjectEntry.zome = JSON.stringify(this.projectTemplate.zome)
      newProjectEntry.id = 'new'
      newProjectEntry.order = 0
      this.projects.splice(0, 0, newProjectEntry)
      this.createEntry({ instance: this.instance, base: 'Parts', entry: newProjectEntry })
      this.$emit('close-new-project-dialog')
    },
    cancelNewProject () {
      this.$emit('close-new-project-dialog')
    }
  },
  computed: {
    ...mapState('auth', ['developer', 'chimera']),
    ...mapGetters('portfolio', ['listProjects']),
    projects () {
      return this.listProjects({ instance: this.instance, base: this.base })
    },
    ...mapState({
      errors (state) {
        return state.root.errors[`${this.instance.instanceId}${this.base}`]
      }
    })
  },
  created () {
    this.showProjectTemplateDialog = this.showNewProject
    this.setGroup(this.instance)
    this.agentAddress(this.instance)
    this.fetchProfiles(this.instance)
    this.fetchEntries({ instance: this.instance, base: this.base })
  }
}
</script>
