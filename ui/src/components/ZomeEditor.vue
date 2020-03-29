<template>
  <v-card fluid>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>{{this.holochainApp.name}} Zome</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon>mdi-plus</v-icon>
          Entity
        </v-btn>
        <v-btn text>
          <v-icon>mdi-plus</v-icon>
          Anchor
        </v-btn>
        <v-dialog v-model="profileDialog" fullscreen>
          <template v-slot:activator="{ on }">
            <v-btn text  v-on="on">
              <v-icon>mdi-plus</v-icon>
              Profile
            </v-btn>
          </template>
          <v-card flat>
            <v-row no-gutters>
              <v-col cols="12">
                <profile-spec-builder :profileSpec="newProfileSpec" />
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
    </v-app-bar>
    <v-content v-resize="onResize">
      <diagram :model="model" @editEntryType="editEntryType" :width="this.windowSize.x - 20" :height="this.windowSize.y"></diagram>
    </v-content>
    <v-dialog v-model="dialog" fullscreen>
      <v-card flat>
        <v-row no-gutters>
          <v-col cols="12">
            <zome-builder :hApp="this.holochainApp" :zome="this.holochainApp.zomes[0]" :entryType="this.holochainApp.zomes[0].entryTypes[0]" @entry-type-updated="entryTypeUpdated" @close-entry-type-builder-dialog="closeEntryTypeBuilderDialog" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="dialog = false">
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer app>
      <span>Holochain</span>
    </v-footer>
  </v-card>
</template>
<script>
import { Diagram } from '../components/Diagram'

function port (nodes, ports, entityType, entityName, direction) {
  let linkPort
  const linkPorts = ports.filter(port => {
    return port.direction === direction && port.entityType === entityType && port.entityName === entityName
  })
  if (linkPorts.length === 0) {
    const linkNodes = nodes.filter(node => {
      return node.entityType === entityType && node.entityName === entityName
    })
    if (linkNodes.length > 0) {
      console.log(linkNodes)
      if (direction === 'from') {
        linkPort = linkNodes[0].node.addInPort('Address')
      } else {
        linkPort = linkNodes[0].node.addOutPort('Address')
      }
      ports.push({
        direction: direction,
        entityType: entityType,
        entityName: entityName,
        port: linkPort
      })
    }
  } else {
    linkPort = linkPorts[0]
  }
  return linkPort
}
function createModel (holochainApp, entryColour, anchorColour) {
  // const entryType = holochainApp.zomes[0].entryTypes[0]
  const diagramModel = new Diagram.Model()
  let entryTypeIndex = 1
  let anchorIndex = 1
  const nodes = []
  const ports = []
  const links = []
  holochainApp.zomes[0].anchors.forEach(anchor => {
    const anchorNode = diagramModel.addNode(anchor.type.charAt(0).toUpperCase() + anchor.type.substring(1), 30, anchorIndex * 220, 250, 200, 'Anchor', anchorColour)
    nodes.push({ entityType: 'anchor', entityName: `${anchor.type}${anchor.text}`, node: anchorNode })
    anchorNode.addField(`Anchor Type - ${anchor.type}`)
    anchorNode.addField(`Anchor Text - ${anchor.text}`)
    anchorIndex += 1
  })
  holochainApp.zomes[0].entryTypes.forEach(entryType => {
    const entryNode = diagramModel.addNode(entryType.name, 100 + entryTypeIndex * 220, 200, 250, 300, 'Entry', entryColour)
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
  links.forEach(link => {
    if (link.direction === 'from') {
      diagramModel.addLink(port(nodes, ports, link.link.entityType, link.link.entityName, 'from'), port(nodes, ports, link.entityType, link.entityName, 'to'))
    } else {
      diagramModel.addLink(port(nodes, ports, link.entityType, link.entityName, 'from'), port(nodes, ports, link.link.entityType, link.link.entityName, 'to'))
    }
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
      model: new Diagram.Model(),
      dialog: false,
      profileDialog: false,
      windowSize: {
        x: 0,
        y: 0
      },
      newProfileSpec: {
        id: '',
        name: this.zome.name,
        specFields: [],
        customFields: []
      }
    }
  },
  methods: {
    showModel: function () {
      console.log(this.model.serialize())
    },
    editEntryType (title) {
      this.dialog = true
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    entryTypeUpdated (entryType) {
      this.holochainApp.zomes[0].entryTypes[0] = entryType
      this.model = createModel(this.holochainApp)
    },
    closeEntryTypeBuilderDialog (entryType) {
      this.dialog = false
    }
  },
  mounted () {
    this.model = createModel(this.holochainApp, this.$vuetify.theme.themes.dark.primary, this.$vuetify.theme.themes.dark.secondary)
  }
}
</script>
