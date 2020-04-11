<template>
  <v-card flat class="mx-auto" height="calc(100% - 100px)">
    <v-toolbar>
      <v-toolbar-title>{{this.holochainApp.name}} Zome</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-plus</v-icon>
        Entry Type
      </v-btn>
      <v-btn text @click="addProfileSpec">
        <v-icon>mdi-plus</v-icon>
        Profile
      </v-btn>
      <v-btn text @click="addAnchor">
        <v-icon>mdi-plus</v-icon>
        Agent
      </v-btn>
      <v-btn text @click="codeDialog = true ">
        <v-icon>mdi-code-braces</v-icon>
        Code
      </v-btn>
      <v-btn text @click="skinDialog = true">
        <v-icon>mdi-application</v-icon>
        Skin
      </v-btn>
      <v-btn text to="/">
        <v-icon>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12" v-resize="onResize">
          <!-- <diagram :model="model" @editModelNode="editModelNode" :width="this.windowSize.x - 20" :height="this.windowSize.y - 100"></diagram> -->
        </v-col>
      </v-row>
    </v-content>
    <v-dialog v-model="entryTypeDialog" fullscreen>
      <v-card flat class="fill-height">
        <v-card-text></v-card-text>
        <v-content>
          <v-row no-gutters align="start" justify="center">
            <v-col cols="12">
              <zome-builder :hApp="this.holochainApp" :zome="this.zome" :entryType="this.entryType" @entry-type-updated="entryTypeUpdated" @close-entry-type-builder-dialog="closeEntryTypeBuilderDialog" @permission-changed="permissionChanged" />
            </v-col>
          </v-row>
        </v-content>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="entryTypeDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="profileSpecDialog" fullscreen>
      <v-card flat height="100%">
        <v-row no-gutters align="start">
          <v-col cols="12">
            <profile-spec-builder :index="this.profileSpecIndex" :profileSpec="this.profileSpec" @profile-spec-updated="profileSpecUpdated" />
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
     <v-dialog v-model="anchorDialog" fullscreen>
      <v-card flat height="100%">
        <v-container fill-height>
          <v-row no-gutters align="start">
            <v-col cols="12">
              Anchor Builder {{`${this.anchor.type}-${this.anchor.text}`}}
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="anchorDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="codeDialog" fullscreen>
      <v-card flat class="fill-height">
        <v-card-text></v-card-text>
        <v-content>
          <v-row no-gutters align="start" justify="center">
            <v-col cols="12">
              <v-tabs v-model="tab" background-color="primary" dark>
                <v-tab key="code">
                  Code
                </v-tab>
                <v-tab key="skin">
                  Skin
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item key="skin">
                  <zome-skin :hApp="this.hApp"/>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-content>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="entryTypeDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="skinDialog" fullscreen>
      <v-card flat class="fill-height">
        <v-card-text></v-card-text>
        <v-content>
          <v-row no-gutters align="start" justify="center">
            <v-col cols="12">
              <zome-skin :hApp="this.hApp"/>
            </v-col>
          </v-row>
        </v-content>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="skinDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="codeDialog" fullscreen>
      <v-card flat class="fill-height pa-0 ma-0">
          <v-row no-gutters align="start" justify="center">
            <v-col cols="12">
              <zome-code-editor ref="zomeCodeEditor" :hApp="this.hApp" :zome="this.zome" :entryType="this.entryType" />
            </v-col>
          </v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="codeDialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
// import { Diagram } from '../components/Diagram'
import * as fs from 'fs'
import { mapState } from 'vuex'

// let ports = []
// function port (nodes, entityType, entityName, linkType, direction) {
//   let linkPort = ports.find(port => {
//     return port.direction === direction && port.entityType === entityType && port.entityName === entityName && port.linkType === linkType
//   })
//   if (linkPort === undefined) {
//     const linkNode = nodes.find(node => {
//       return node.entityType === entityType && node.entityName === entityName
//     })
//     if (linkNode) {
//       if (direction === 'from') {
//         linkPort = linkNode.node.addOutPort(linkType)
//       } else {
//         linkPort = linkNode.node.addInPort(linkType)
//       }
//       ports.push({
//         direction: direction,
//         entityType: entityType,
//         entityName: entityName,
//         linkType: linkType,
//         port: linkPort
//       })
//     }
//   }
//   return linkPort
// }
// function createModel (zome, entryColour, anchorColour, profileSpecColour) {
//   const diagramModel = new Diagram.Model()
//   let entryTypeIndex = 0
//   let profileSpecIndex = 0
//   let anchorIndex = 0
//   const nodes = []
//   const links = []
//   ports = []
//   zome.anchors.forEach(anchor => {
//     const anchorTitle = `${anchor.type}-${anchor.text}`
//     const anchorNode = diagramModel.addNode(anchorTitle, 30, 100 + anchorIndex * 350, 250, 200, 'anchor', anchorIndex, anchorColour)
//     nodes.push({ entityType: 'anchor', entityName: `${anchor.type}${anchor.text}`, node: anchorNode })
//     anchorNode.addField(`Anchor Type - ${anchor.type}`)
//     anchorNode.addField(`Anchor Text - ${anchor.text}`)
//     anchorIndex += 1
//     if (anchor.links) {
//       anchor.links.forEach(link => {
//         links.push({ link: link, entityType: 'anchor', entityName: `${anchor.type}${anchor.text}` })
//       })
//     }
//   })
//   zome.entryTypes.forEach(entryType => {
//     const entryNode = diagramModel.addNode(entryType.name, 380, 100 + entryTypeIndex * 350, 250, 300, 'entryType', entryTypeIndex, entryColour)
//     nodes.push({ entityType: 'entryType', entityName: entryType.name, node: entryNode })
//     entryType.fields.forEach(field => {
//       entryNode.addField(`${field.fieldName} - ${field.fieldType}`)
//     })
//     entryTypeIndex += 1
//     if (entryType.links) {
//       entryType.links.forEach(link => {
//         links.push({ link: link, entityType: 'entryType', entityName: entryType.name })
//       })
//     }
//   })
//   zome.profileSpecs.forEach(profileSpec => {
//     const profileSpecNode = diagramModel.addNode(profileSpec.name, 720, 100 + profileSpecIndex * 350, 250, 300, 'profileSpec', profileSpecIndex, profileSpecColour)
//     nodes.push({ entityType: 'profileSpec', entityName: profileSpec.name, node: profileSpecNode })
//     profileSpec.specFields.forEach(field => {
//       profileSpecNode.addField(`${field.fieldName} - ${field.fieldType}`)
//     })
//     profileSpecIndex += 1
//     if (profileSpec.links) {
//       profileSpec.links.forEach(link => {
//         links.push({ link: link, entityType: 'profileSpec', entityName: profileSpec.name })
//       })
//     }
//   })
//   links.forEach(link => {
//     if (link.link.direction === 'from') {
//       diagramModel.addLink(port(nodes, link.link.entityType, link.link.entityName, link.link.type, 'from'), port(nodes, link.entityType, link.entityName, '', 'to'))
//     } else {
//       diagramModel.addLink(port(nodes, link.entityType, link.entityName, '', 'from'), port(nodes, link.link.entityType, link.link.entityName, link.link.type, 'to'))
//     }
//   })
//   // nodes.forEach(node => {
//   //   node.node.addInPort('Target')
//   //   node.node.addOutPort('Add Link')
//   // })

//   return diagramModel
// }

export default {
  name: 'ZomeEditor',
  components: {
    // Diagram,
    ZomeBuilder: () => import('../components/ZomeBuilder'),
    ProfileSpecBuilder: () => import('../components/ProfileSpecBuilder'),
    ZomeSkin: () => import('../components/ZomeSkin'),
    ZomeCodeEditor: () => import('../components/ZomeCodeEditor')
  },
  props: ['hApp', 'zome'],
  data () {
    return {
      holochainApp: this.hApp,
      anchor: {},
      entryType: {},
      profileSpec: {},
      profileSpecIndex: 0,
      // model: new Diagram.Model(),
      entryTypeDialog: false,
      profileSpecDialog: false,
      anchorDialog: false,
      skinDialog: false,
      codeDialog: false,
      createEntryPermissionTemplate: '',
      modifyEntryPermissionTemplate: '',
      deleteEntryPermissionTemplate: '',
      tab: null,
      windowSize: {
        x: 200,
        y: 200
      }
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    showModel: function () {
      console.log(this.model.serialize())
    },
    editModelNode (type, index) {
      switch (type) {
        case 'anchor':
          this.anchor = this.zome.anchors[index]
          this.anchorDialog = true
          break
        case 'entryType':
          this.entryType = this.zome.entryTypes[index]
          this.entryTypeDialog = true
          break
        case 'profileSpec':
          this.profileSpec = this.zome.profileSpecs[index]
          this.profileSpecDialog = true
          break
      }
    },
    addAnchor () {
      this.anchorDialog = true
    },
    addProfileSpec () {
      this.profileSpecIndex = this.zome.profileSpecs.length
      this.zome.profileSpecs.push({
        id: '',
        name: this.zome.name,
        specFields: [],
        customFields: []
      })
      this.profileSpec = this.zome.profileSpecs[this.profileSpecIndex]
      this.profileSpecDialog = true
    },
    profileSpecUpdated (index, profileSpec) {
      this.zome.profileSpecs[index] = profileSpec
      // this.model = createModel(this.zome, this.$vuetify.theme.themes.dark.primary, this.$vuetify.theme.themes.dark.secondary, this.$vuetify.theme.themes.dark.info)
    },
    entryTypeUpdated (index, entryType) {
      this.zome.entryTypes[index] = entryType
      // this.model = createModel(this.zome, this.$vuetify.theme.themes.dark.primary, this.$vuetify.theme.themes.dark.secondary, this.$vuetify.theme.themes.dark.info)
    },
    closeEntryTypeBuilderDialog (entryType) {
      this.dialog = false
    },
    permissionChanged (entryType, mutation, role) {
      this.permissionsCode = this.permissionsTemplate
      console.log(mutation)
      switch (mutation) {
        case 'entryCreate':
          this.entryType.createEntryPermissionTemplate = fs.readFileSync(`${this.developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_create/${role}.rs`, 'utf8')
          break
        case 'entryModify':
          this.entryType.modifyEntryPermissionTemplate = fs.readFileSync(`${this.developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_modify/${role}.rs`, 'utf8')
          break
        case 'entryDelete':
          this.entryType.deleteEntryPermissionTemplate = fs.readFileSync(`${this.developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_delete/${role}.rs`, 'utf8')
          break
      }
    }
  },
  computed: {
    ...mapState('app', ['developer'])
  },
  mounted () {
    // this.model = createModel(this.zome, this.$vuetify.theme.themes.dark.primary, this.$vuetify.theme.themes.dark.secondary, this.$vuetify.theme.themes.dark.info)
  }
}
</script>
