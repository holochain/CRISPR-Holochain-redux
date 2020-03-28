<template>
  <v-card fluid>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>{{this.holochainApp.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon>mdi-plus</v-icon>
          Entity
        </v-btn>
        <v-btn text>
          <v-icon>mdi-plus</v-icon>
          Anchor
        </v-btn>
        <v-btn text @click="showModel">
          <v-icon>mdi-plus</v-icon>
          Model
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content v-resize="onResize">
        <diagram :model="model" @addField="editEntryType" :width="this.windowSize.x - 20" :height="this.windowSize.y"></diagram>
    </v-content>
    <v-dialog v-model="dialog" fullscreen>
      <v-card flat>
        <v-content>
            <entry-type-builder :folder="this.holochainApp.folder" :zome="this.holochainApp.zomes[0]" :entryType="this.holochainApp.zomes[0].entryTypes[0]" @entry-type-updated="entryTypeUpdated" @close-entry-type-builder-dialog="closeEntryTypeBuilderDialog" />
        </v-content>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
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

function createModel (holochainApp) {
  // const entryType = holochainApp.zomes[0].entryTypes[0]
  const diagramModel = new Diagram.Model()
  let entryTypeIndex = 1
  let anchorIndex = 1

  holochainApp.zomes[0].entryTypes.forEach(entryType => {
    const entryNode = diagramModel.addNode(entryType.name, 100 + entryTypeIndex * 220, 200, 200, 300, 'Entry')
    entryNode.color = '#00cc66'
    entryType.fields.forEach(field => {
      const fieldPort = entryNode.addInPort(`${field.fieldName} - ${field.fieldType}`)
      if (field.links) {
        field.links.forEach(link => {
          const anchorNode = diagramModel.addNode(link.anchor.type.charAt(0).toUpperCase() + link.anchor.type.substring(1), 30, anchorIndex * 220, 144, 200, 'Anchor')
          const anchorPort = anchorNode.addOutPort(`Link Type - ${link.type}`)
          anchorNode.addOutPort(`Anchor Type - ${link.anchor.type}`)
          anchorNode.addOutPort(`Anchor Type - ${link.anchor.text}`)
          diagramModel.addLink(fieldPort, anchorPort)
          anchorIndex += 1
        })
      }
    })
    entryTypeIndex += 1
  })
  // const node1 = diagramModel.addNode('Notes', 30, 200, 144, 200, 'Anchor')
  // const node1OutPort = node1.addOutPort('Link Type - note_link')
  // node1.addOutPort('Anchor Type - notes')
  // node1.addOutPort('Anchor Text - notes')
  // const node2 = diagramModel.addNode(entryType.name, 300, 300, 144, 200, 'Entry')
  // const node2InPort1 = node2.addInPort('id - Address')
  // diagramModel.addLink(node2InPort1, node1OutPort)
  return diagramModel
}

export default {
  name: 'ZomeEditor',
  components: {
    Diagram,
    EntryTypeBuilder: () => import('../components/EntryTypeBuilder')
  },
  props: ['hApp'],
  data () {
    return {
      holochainApp: this.hApp,
      model: new Diagram.Model(),
      dialog: false,
      windowSize: {
        x: 0,
        y: 0
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
    this.model = createModel(this.holochainApp)
  }
}
</script>
