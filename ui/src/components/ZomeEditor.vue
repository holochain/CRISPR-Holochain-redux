<template>
  <v-card flat class="mx-auto" height="calc(100% - 100px)">
    <v-toolbar>
      <v-toolbar-title>{{this.holochainApp.name}} Zome</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-plus</v-icon>
        Entity
      </v-btn>
      <v-dialog v-model="anchorDialog" fullscreen>
        <template v-slot:activator="{ on }">
          <v-btn text  v-on="on">
            <v-icon>mdi-plus</v-icon>
            Anchor
          </v-btn>
        </template>
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
      <v-dialog v-model="profileDialog" fullscreen>
        <template v-slot:activator="{ on }">
          <v-btn text  v-on="on">
            <v-icon>mdi-plus</v-icon>
            Profile
          </v-btn>
        </template>
        <v-card flat height="100%">
          <v-row no-gutters align="start">
            <v-col cols="12">
              <profile-spec-builder :profileSpec="this.profileSpec" />
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="action darken-1" text @click="profileDialog = false">
              Done
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn text to="/">
        <v-icon>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12" v-resize="onResize">
          <diagram :model="model" @editModelNode="editModelNode" :width="this.windowSize.x - 20" :height="this.windowSize.y - 100"></diagram>
        </v-col>
      </v-row>
    </v-content>
    <v-dialog v-model="dialog" fullscreen>
      <v-card flat class="fill-height">
        <v-card-text></v-card-text>
        <v-content>
          <v-row no-gutters align="start" justify="center">
            <v-col cols="12">
              <zome-builder :hApp="this.holochainApp" :zome="this.zome" :entryType="this.entryType" @entry-type-updated="entryTypeUpdated" @close-entry-type-builder-dialog="closeEntryTypeBuilderDialog" />
            </v-col>
          </v-row>
        </v-content>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="dialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { Diagram } from '../components/Diagram'
const ports = []
function port (nodes, entityType, entityName, linkType, direction) {
  let linkPort
  const linkPorts = ports.filter(port => {
    return port.direction === direction && port.entityType === entityType && port.entityName === entityName && port.linkType === linkType
  })
  if (linkPorts.length === 0) {
    const linkNodes = nodes.filter(node => {
      return node.entityType === entityType && node.entityName === entityName
    })
    if (linkNodes.length > 0) {
      if (direction === 'from') {
        linkPort = linkNodes[0].node.addOutPort(linkType)
      } else {
        linkPort = linkNodes[0].node.addInPort(linkType)
      }
      ports.push({
        direction: direction,
        entityType: entityType,
        entityName: entityName,
        linkType: linkType,
        port: linkPort
      })
    }
  } else {
    linkPort = linkPorts[0].port
  }
  return linkPort
}
function createModel (zome, entryColour, anchorColour) {
  // const entryType = holochainApp.zomes[0].entryTypes[0]
  const diagramModel = new Diagram.Model()
  let entryTypeIndex = 0
  let profileSpecIndex = 0
  let anchorIndex = 0
  const nodes = []
  const links = []
  zome.anchors.forEach(anchor => {
    const anchorTitle = `${anchor.type}-${anchor.text}`
    const anchorNode = diagramModel.addNode(anchorTitle, 30, 50 + anchorIndex * 350, 250, 200, 'anchor', anchorColour)
    nodes.push({ entityType: 'anchor', entityName: `${anchor.type}${anchor.text}`, node: anchorNode })
    anchorNode.addField(`Anchor Type - ${anchor.type}`)
    anchorNode.addField(`Anchor Text - ${anchor.text}`)
    anchorIndex += 1
    if (anchor.links) {
      anchor.links.forEach(link => {
        links.push({ link: link, entityType: 'anchor', entityName: `${anchor.type}${anchor.text}` })
      })
    }
  })
  zome.entryTypes.forEach(entryType => {
    const entryNode = diagramModel.addNode(entryType.name, 380, 50 + entryTypeIndex * 350, 250, 300, 'entry', entryColour)
    nodes.push({ entityType: 'entry', entityName: entryType.name, node: entryNode })
    entryType.fields.forEach(field => {
      entryNode.addField(`${field.fieldName} - ${field.fieldType}`)
    })
    entryTypeIndex += 1
    if (entryType.links) {
      entryType.links.forEach(link => {
        links.push({ link: link, entityType: 'entry', entityName: entryType.name })
      })
    }
  })
  zome.profileSpecs.forEach(profileSpec => {
    const profileSpecNode = diagramModel.addNode(profileSpec.name, 720, 50 + profileSpecIndex * 350, 250, 300, 'profileSpec', entryColour)
    nodes.push({ entityType: 'profileSpec', entityName: profileSpec.name, node: profileSpecNode })
    profileSpec.fields.forEach(field => {
      profileSpecNode.addField(`${field.fieldName} - ${field.fieldType}`)
    })
    profileSpecIndex += 1
    if (profileSpec.links) {
      profileSpec.links.forEach(link => {
        links.push({ link: link, entityType: 'profileSpec', entityName: profileSpec.name })
      })
    }
  })

  links.forEach(link => {
    if (link.link.direction === 'from') {
      diagramModel.addLink(port(nodes, link.link.entityType, link.link.entityName, link.link.type, 'from'), port(nodes, link.entityType, link.entityName, link.link.type, 'to'))
    } else {
      diagramModel.addLink(port(nodes, link.entityType, link.entityName, link.link.type, 'from'), port(nodes, link.link.entityType, link.link.entityName, link.link.type, 'to'))
    }
  })

  nodes.forEach(node => {
    if (node.entityType !== 'anchor') {
      node.node.addInPort('link_to')
    }
    node.node.addOutPort('link_from')
  })

  return diagramModel
}

export default {
  name: 'ZomeEditor',
  components: {
    Diagram,
    ZomeBuilder: () => import('../components/ZomeBuilder'),
    ProfileSpecBuilder: () => import('../components/ProfileSpecBuilder')
  },
  props: ['hApp', 'zome'],
  data () {
    return {
      holochainApp: this.hApp,
      anchor: {},
      entryType: {},
      profileSpec: {},
      model: new Diagram.Model(),
      dialog: false,
      profileDialog: false,
      anchorDialog: false,
      windowSize: {
        x: 200,
        y: 200
      }
    }
  },
  methods: {
    showModel: function () {
      console.log(this.model.serialize())
    },
    editModelNode (type, title) {
      switch (type) {
        case 'anchor':
          this.anchor = this.zome.anchors.find(function (anchor) {
            return `${anchor.type}-${anchor.text}` === title
          })
          this.anchorDialog = true
          break
        case 'entry':
          this.entryType = this.zome.entryTypes.find(function (entryType) {
            return entryType.name === title
          })
          this.dialog = true
          break
        case 'profileSpec':
          this.profileSpec = this.zome.profileSpecs.find(function (profileSpec) {
            return profileSpec.name === title
          })
          this.profileDialog = true
          break
      }
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      console.log(this.windowSize)
    },
    entryTypeUpdated (entryType) {
      this.zome.entryTypes[0] = entryType
      this.model = createModel(this.holochainApp)
    },
    closeEntryTypeBuilderDialog (entryType) {
      this.dialog = false
    }
  },
  mounted () {
    this.model = createModel(this.zome, this.$vuetify.theme.themes.dark.primary, this.$vuetify.theme.themes.dark.secondary)
  }
}
</script>
