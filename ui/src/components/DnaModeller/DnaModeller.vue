<template>
  <v-card flat height="100vh">
    <v-toolbar>
      <v-toolbar-title>Zome</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="addAgent">
        <v-icon>mdi-plus</v-icon>
        Agent
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12" v-resize="onResize">
          <diagram :model="model" @editModelNode="editModelNode" :width="this.windowSize.x - 20" :height="this.windowSize.y - 100"></diagram>
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>
<script>
import { Diagram } from './Diagram'
import { zome } from '../../store/zome.js'
export default {
  name: 'DnaModeller',
  components: {
    Diagram
  },
  data () {
    return {
      model: new Diagram.Model(),
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
    addAgent () {
      console.log('Add Agent')
    },
    editModelNode (type, index) {
      switch (type) {
        case 'entryType':
          // this.entryType = this.zome.entryTypes[index]
          // this.entryTypeDialog = true
          break
        case 'profileSpec':
          // this.profileSpec = this.zome.profileSpecs[index]
          // this.profileSpecDialog = true
          break
      }
    },
    createModel () {
      const dnaModel = new Diagram.Model()
      const nodes = []
      // const links = []
      // ports = []
      const yOffset = 130
      let anchorsOffset = 0
      let anchorTypeIndex = 0
      let anchorsCount = 0
      const rootAnchorNode = dnaModel.addNode('anchor_type::root_anchor', 30, yOffset, 220, 145, 'rootAnchor', 0, this.$vuetify.theme.themes.dark.anchor)
      rootAnchorNode.addField('entry! name:holochain::anchor')
      rootAnchorNode.addField('link!  from:holochain::anchor')
      rootAnchorNode.addField('link!  type:holochain::anchor_link')
      rootAnchorNode.addField('anchor_type=\'root_anchor\'')
      rootAnchorNode.addField('anchor_text=\'\'')
      const rootAnchorPort = rootAnchorNode.addOutPort('anchor_link')
      zome.anchorTypes.forEach(anchorType => {
        let anchorIndex = 0
        const anchorTypeNode = dnaModel.addNode(`anchor_type::${anchorType.type}`, 290, yOffset + anchorsOffset, 220, 165, 'anchorType', anchorTypeIndex + 1, this.$vuetify.theme.themes.dark.anchor)
        nodes.push({ entityType: 'anchorType', entityName: anchorType.type, node: anchorTypeNode })
        anchorTypeNode.addField('entry! name:holochain::anchor')
        anchorTypeNode.addField('link!  from:holochain::anchor')
        anchorTypeNode.addField('link!  type:holochain::anchor_link')
        anchorTypeNode.addField(`anchor_type='${anchorType.type}'`)
        anchorTypeNode.addField('anchor_text=\'\'')
        const anchorTypeInPort = anchorTypeNode.addInPort('address()')
        const anchorTypeOutPort = anchorTypeNode.addOutPort('anchor_link')
        dnaModel.addLink(rootAnchorPort, anchorTypeInPort)
        anchorType.anchors.forEach(anchor => {
          anchorsOffset = (anchorTypeIndex + anchorIndex) * 185
          const anchorNode = dnaModel.addNode(`anchor::${anchor.text}`, 550, yOffset + anchorsOffset, 220, 165, 'anchor', anchorsCount, this.$vuetify.theme.themes.dark.anchor)
          nodes.push({ entityType: 'anchor', entityName: anchor.type, node: anchorNode })
          anchorNode.addField('entry! name:holochain::anchor')
          anchorNode.addField('link!  from:holochain::anchor')
          anchorNode.addField('link!  type:holochain::anchor_link')
          anchorNode.addField(`anchor_type='${anchor.type}'`)
          anchorNode.addField(`anchor_text='${anchor.text}'`)
          const anchorInPort = anchorNode.addInPort('address()')
          dnaModel.addLink(anchorTypeOutPort, anchorInPort)
          anchorNode.addOutPort('anchor_link')
          anchorIndex += 1
          anchorsCount += 1
        })
        anchorTypeIndex += 1
        anchorsCount += 1
        anchorsOffset = (anchorTypeIndex + anchorIndex - 1) * 185
      })

      dnaModel.addNode('Agent Base', 550, 10, 220, 80, 'agent', 0, this.$vuetify.theme.themes.dark.accent)
      return dnaModel
    }
  },
  mounted () {
    this.model = this.createModel()
  }
}
</script>
