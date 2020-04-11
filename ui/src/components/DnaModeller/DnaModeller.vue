<template>
  <v-card flat height="100vh">
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12" v-resize="onResize">
          <diagram :model="model" @editModelNode="editModelNode" :width="this.windowSize.x" :height="this.windowSize.y"></diagram>
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
      const col0Offset = 20
      const col1Offset = 340
      const col2Offset = 660
      const col3Offset = 1000
      const yOffset = 130
      const cardWidth = 270
      let anchorsYIndex = 0
      let anchorsOffset = 0
      let entryTypesOffset = 0
      let anchorTypeIndex = 0
      let anchorIndex = 0
      let entryTypeIndex = 0
      const rootAnchorNode = dnaModel.addNode('anchor_type::root_anchor', col0Offset, yOffset, cardWidth, 145, 'rootAnchor', 0, this.$vuetify.theme.themes.dark.anchor)
      rootAnchorNode.addField('entry!|name:holochain::anchor')
      rootAnchorNode.addField('link!|from:holochain::anchor')
      rootAnchorNode.addField('link!|type:holochain::anchor_link')
      rootAnchorNode.addField('anchor_type|root_anchor')
      rootAnchorNode.addField('anchor_text')
      const rootAnchorPort = rootAnchorNode.addOutPort('anchor_link')
      zome.anchorTypes.forEach(anchorType => {
        anchorsOffset = anchorsYIndex * 185
        const anchorTypeNode = dnaModel.addNode(`anchor_type::${anchorType.type}`, col1Offset, yOffset + anchorsOffset, cardWidth, 165, 'anchorType', anchorTypeIndex, this.$vuetify.theme.themes.dark.anchor)
        nodes.push({ entityType: 'anchorType', entityName: anchorType.type, node: anchorTypeNode })
        anchorTypeNode.addField('entry!|name:holochain::anchor')
        anchorTypeNode.addField('link!|from:holochain::anchor')
        anchorTypeNode.addField('link!|type:holochain::anchor_link')
        anchorTypeNode.addField(`anchor_type|${anchorType.type}`)
        anchorTypeNode.addField('anchor_text')
        const anchorTypeInPort = anchorTypeNode.addInPort('address()')
        const anchorTypeOutPort = anchorTypeNode.addOutPort('anchor_link')
        dnaModel.addLink(rootAnchorPort, anchorTypeInPort)
        anchorType.entryTypes.forEach(entryType => {
          const entityName = `${zome.name.toLowerCase()}::${entryType.name.toLowerCase()}`
          const entryTypeNodeHeight = 105 + (entryType.fields.length + entryType.metaFields.length) * 20
          const entryTypeNode = dnaModel.addNode(entityName, col3Offset, yOffset + anchorsOffset + entryTypesOffset, cardWidth, entryTypeNodeHeight, 'entryType', entryTypeIndex, this.$vuetify.theme.themes.dark.entry)
          nodes.push({ entityType: 'entryType', entityName: entityName, node: entryTypeNode })
          entryTypeNode.addField(`entry!|${entityName}`)
          entryTypeNode.addField('link!|from:holochain::anchor')
          entryTypeNode.addField(`link!|type:::${entryType.name.toLowerCase()}_link`)
          entryType.fields.forEach(field => {
            entryTypeNode.addField(`${field.fieldName}|${field.fieldType}`)
          })
          entryType.metaFields.forEach(metaField => {
            entryTypeNode.addField(`${metaField.fieldName}|${metaField.fieldType}`)
          })
          const entryTypeInPort = entryTypeNode.addInPort('address()')
          dnaModel.addLink(anchorTypeOutPort, entryTypeInPort)
          entryTypeIndex += 1
          entryTypesOffset = entryTypesOffset + entryTypeNodeHeight + 20
        })
        anchorsOffset += entryTypesOffset
        anchorType.anchors.forEach((anchor, index) => {
          if (anchor === '%agent_id') {
            const agentNode = dnaModel.addNode('AgentId', col2Offset, yOffset + anchorsOffset, cardWidth, 105, 'agent', 0, this.$vuetify.theme.themes.dark.accent)
            agentNode.deletable = true
            agentNode.addField('nick|String')
            agentNode.addField('pub_sign_key|String')
            const agentInPort = agentNode.addInPort('%agent_id')
            dnaModel.addLink(anchorTypeOutPort, agentInPort)
          } else {
            const anchorNode = dnaModel.addNode(`anchor::${anchor.text}`, col2Offset, yOffset + anchorsOffset, cardWidth, 165, 'anchor', anchorIndex, this.$vuetify.theme.themes.dark.anchor)
            nodes.push({ entityType: 'anchor', entityName: anchor.type, node: anchorNode })
            anchorNode.addField('entry!|name:holochain::anchor')
            anchorNode.addField('link!|from:holochain::anchor')
            anchorNode.addField('link!|type:holochain::anchor_link')
            anchorNode.addField(`anchor_type|${anchor.type}`)
            anchorNode.addField(`anchor_text|${anchor.text}`)
            const anchorInPort = anchorNode.addInPort('address()')
            dnaModel.addLink(anchorTypeOutPort, anchorInPort)
            anchorNode.addOutPort('anchor_link')
          }
          anchorIndex += 1
          anchorsYIndex += 1
          anchorsOffset += 185
        })
        if (anchorType.anchors.length === 0) {
          anchorsYIndex += 1
          anchorsOffset = anchorsYIndex * 185
        }
        anchorTypeIndex += 1
      })
      return dnaModel
    }
  },
  mounted () {
    this.model = this.createModel()
  }
}
</script>
