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
      const yOffset = 130
      let anchorsYIndex = 0
      let anchorsOffset = 0
      let anchorTypeIndex = 0
      let anchorIndex = 0
      const rootAnchorNode = dnaModel.addNode('anchor_type::root_anchor', 30, yOffset, 206, 145, 'rootAnchor', 0, this.$vuetify.theme.themes.dark.anchor)
      rootAnchorNode.addField('entry! name:holochain::anchor')
      rootAnchorNode.addField('link!  from:holochain::anchor')
      rootAnchorNode.addField('link!  type:holochain::anchor_link')
      rootAnchorNode.addField('anchor_type=\'root_anchor\'')
      rootAnchorNode.addField('anchor_text=\'\'')
      const rootAnchorPort = rootAnchorNode.addOutPort('anchor_link')
      zome.anchorTypes.forEach(anchorType => {
        anchorsOffset = anchorsYIndex * 185
        const anchorTypeNode = dnaModel.addNode(`anchor_type::${anchorType.type}`, 290, yOffset + anchorsOffset, 206, 165, 'anchorType', anchorTypeIndex, this.$vuetify.theme.themes.dark.anchor)
        nodes.push({ entityType: 'anchorType', entityName: anchorType.type, node: anchorTypeNode })
        anchorTypeNode.addField('entry! name:holochain::anchor')
        anchorTypeNode.addField('link!  from:holochain::anchor')
        anchorTypeNode.addField('link!  type:holochain::anchor_link')
        anchorTypeNode.addField(`anchor_type='${anchorType.type}'`)
        anchorTypeNode.addField('anchor_text=\'\'')
        const anchorTypeInPort = anchorTypeNode.addInPort('address()')
        const anchorTypeOutPort = anchorTypeNode.addOutPort('anchor_link')
        dnaModel.addLink(rootAnchorPort, anchorTypeInPort)
        anchorType.anchors.forEach((anchor, index) => {
          if (anchor === '%agent_id') {
            const agentNode = dnaModel.addNode('AgentId', 550, yOffset + anchorsOffset, 206, 105, 'agent', 0, this.$vuetify.theme.themes.dark.accent)
            agentNode.addField('nick: String')
            agentNode.addField('pub_sign_key: String')
            const agentInPort = agentNode.addInPort('%agent_id')
            dnaModel.addLink(anchorTypeOutPort, agentInPort)
          } else {
            const anchorNode = dnaModel.addNode(`anchor::${anchor.text}`, 550, yOffset + anchorsOffset, 206, 165, 'anchor', anchorIndex, this.$vuetify.theme.themes.dark.anchor)
            nodes.push({ entityType: 'anchor', entityName: anchor.type, node: anchorNode })
            anchorNode.addField('entry! name:holochain::anchor')
            anchorNode.addField('link!  from:holochain::anchor')
            anchorNode.addField('link!  type:holochain::anchor_link')
            anchorNode.addField(`anchor_type='${anchor.type}'`)
            anchorNode.addField(`anchor_text='${anchor.text}'`)
            const anchorInPort = anchorNode.addInPort('address()')
            dnaModel.addLink(anchorTypeOutPort, anchorInPort)
            anchorNode.addOutPort('anchor_link')
          }
          anchorIndex += 1
          anchorsYIndex += 1
          anchorsOffset = anchorsYIndex * 185
        })
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
