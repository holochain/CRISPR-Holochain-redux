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
      let anchorTypeLayout = 0
      let anchorIndex = 1
      const rootAnchorNode = dnaModel.addNode('Root Anchor', 30, 100, 220, 145, 'anchor', 0, this.$vuetify.theme.themes.dark.anchor)
      rootAnchorNode.addField('entry! name:holochain::anchor')
      rootAnchorNode.addField('link!  from:holochain::anchor')
      rootAnchorNode.addField('link!  type:holochain::anchor_link')
      rootAnchorNode.addField('anchor_type=\'root_anchor\'')
      rootAnchorNode.addField('anchor_text=\'\'')
      const rootAnchorPort = rootAnchorNode.addOutPort('anchor_link')
      zome.anchorTypes.forEach(anchor => {
        const anchorTitle = `Anchor Type::${anchor.type}`
        const anchorNode = dnaModel.addNode(anchorTitle, 290, 100 + anchorTypeLayout * 350, 220, 145, 'anchor', anchorIndex, this.$vuetify.theme.themes.dark.anchor)
        nodes.push({ entityType: 'anchor', entityName: `${anchor.type}${anchor.text}`, node: anchorNode })
        anchorNode.addField('entry! name:holochain::anchor')
        anchorNode.addField('link!  from:holochain::anchor')
        anchorNode.addField('link!  type:holochain::anchor_link')
        anchorNode.addField(`anchor_type='${anchor.type}'`)
        anchorNode.addField(`anchor_text='${anchor.text}'`)
        const anchorTypePort = anchorNode.addInPort('address')
        dnaModel.addLink(rootAnchorPort, anchorTypePort)
        if (anchor.text === '') {
          anchorTypeLayout += 1
        }
        anchorIndex += 1
      })

      dnaModel.addNode('Agent Base', 920, 100, 200, 80, 'agent', 0, this.$vuetify.theme.themes.dark.accent)
      return dnaModel
    }
  },
  mounted () {
    this.model = this.createModel()
  }
}
</script>
