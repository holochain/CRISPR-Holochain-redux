<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col cols="12" v-resize="onResize">
        <diagram :id="zome.id" :key="zome.id" :model="model" @edit-permissions="editPermissions" @edit-properties="editProperties" @show-function-code="showFunctionCode" :width="this.windowSize.x" :height="this.windowSize.y-84"></diagram>
      </v-col>
    </v-row>
    <v-dialog v-model="codeDialog" max-width="1000px">
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title class="display-1">{{this.functionName}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-row no-gutters>
          <v-col cols="12" v-resize="onResizeCode">
            <codemirror v-model="functionCode" :options="cmOptions" ref="cmFunctionCode"></codemirror>
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
import { Diagram } from './Diagram'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/rust/rust.js'
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'ZomeModeller',
  components: {
    Diagram,
    codemirror
  },
  props: ['zome'],
  data () {
    return {
      model: new Diagram.Model(),
      functionCode: '',
      functionPermissionCode: '',
      functionName: '',
      entryTypeName: '',
      codeDialog: false,
      windowSize: {
        x: 200,
        y: 200
      },
      cmOptions: {
        tabSize: 4,
        mode: 'rust',
        theme: 'base16-dark',
        readOnly: true,
        line: true
      }
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    onResizeCode () {
      this.funcCodemirror.setSize(1000, 400)
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
    editProperties (entryTypeName) {
      this.entryTypeName = entryTypeName
      this.$emit('edit-properties', this.entryType)
    },
    editPermissions (entryTypeName) {
      this.entryTypeName = entryTypeName
      this.$emit('edit-permissions', this.entryType)
    },
    showFunctionCode (name) {
      this.entryTypeName = name.split('::')[0]
      this.functionName = name.split('::')[1]
      this.functionCode = ''
      this.functionPermissionCode = ''
      const functionInfo = this.entryType.functions.find(f => f.name === this.functionName)
      if (functionInfo.permissionsCode === undefined) functionInfo.permissionsCode = ''
      this.functionCode = `${functionInfo.code}\n\n${functionInfo.permissionsCode}`
      this.codeDialog = true
    },
    createModel () {
      const dnaModel = new Diagram.Model()
      const nodes = []
      const col0Offset = 20
      const col1Offset = 390
      const col2Offset = 760
      const col3Offset = 1140
      const yOffset = 130
      const cardWidth = 270
      let anchorsYIndex = 0
      let anchorsOffset = 0
      let entryTypesOffset = 0
      let anchorIndex = 0
      let entryTypeIndex = 0
      let libCode = ''
      let testCode = ''
      const that = this
      const rootAnchorPort = dnaModel.addRootAnchor(col0Offset, yOffset, cardWidth, this.$vuetify.theme.themes.dark.anchor)
      let entryTypeOffset = col2Offset
      if (this.zome.anchorTypes.find(anchorType => anchorType.agentIdLinks !== undefined)) {
        entryTypeOffset = col3Offset
      }
      this.zome.anchorTypes.forEach(anchorType => {
        if (anchorType.anchors.length > 0) {
          entryTypeOffset = col3Offset
        }
        anchorsOffset = anchorsYIndex * 185
        const anchorTypeNode = dnaModel.addAnchorType(anchorType, rootAnchorPort, col1Offset, yOffset + anchorsOffset, cardWidth, this.$vuetify.theme.themes.dark.anchor)
        nodes.push({ id: anchorType.id, node: anchorTypeNode })
        libCode += anchorType.libCode
        testCode += anchorType.testCode
        anchorType.entryTypes.forEach(entryType => {
          const entryTypeNode = dnaModel.addEntryType(that.zome.name, entryType, anchorTypeNode, anchorType.tag, anchorType.context, entryTypeOffset, yOffset + anchorsOffset + entryTypesOffset, cardWidth, entryTypeIndex, this.$vuetify.theme.themes.dark.entry)
          let handlersCode = ''
          let permissionsCode = ''
          entryType.functions.forEach(f => {
            if (f.permission !== 'remove') {
              if (f.name !== 'declarations') entryTypeNode.addFunction(`${entryType.name.toLowerCase()}::${f.name}`)
              libCode += f.libCode + '\n\n'
              if (f.testCode) testCode += f.testCode + '\n\n'
              handlersCode += f.code + '\n\n'
            } else {
              libCode += `\t// No-one allowed to ${f.name}\n\n`
              if (f.testCode) testCode += `// No-one allowed to ${f.name}\n\n`
              handlersCode += `\t// No-one allowed to ${f.name}\n\n`
            }
            if (f.permissionsCode) permissionsCode += f.permissionsCode + '\n\n'
          })
          testCode += '}'
          this.$emit('entry-type-functions-code-updated', that.zome.base, entryType.name.toLowerCase(), handlersCode, permissionsCode, testCode)
          nodes.push({ id: entryType.id, node: entryTypeNode })
          entryTypeIndex += 1
          entryTypesOffset = entryTypesOffset + entryTypeNode.height + 20
        })
        anchorsOffset += entryTypesOffset
        let anchorTypeOutPort = 0
        if (anchorType.anchors.length > 0) {
          anchorTypeOutPort = anchorTypeNode.addOutPort('anchor_link')
        }
        anchorType.anchors.forEach((anchor, index) => {
          const anchorNode = dnaModel.addAnchor(anchor, anchorTypeOutPort, col2Offset, yOffset + anchorsOffset, cardWidth, anchorIndex, this.$vuetify.theme.themes.dark.anchor)
          let entryTypeInPort = 0
          anchor.links.forEach(link => {
            let entryType = this.zome.entryTypes.find(entryType => entryType.id === link.entityId)
            if (entryType === undefined) {
              entryType = anchorType.entryTypes.find(entryType => entryType.id === link.entityId)
            }
            console.log('entryType', entryType)
            const existingEntryTypeNode = nodes.find(node => node.id === link.entityId)
            if (!existingEntryTypeNode) {
              const entryTypeNode = dnaModel.addEntryType(that.zome.name, entryType, anchorNode, link.tag, link.context, col3Offset, yOffset + anchorsOffset + entryTypesOffset, cardWidth, entryTypeIndex, this.$vuetify.theme.themes.dark.entry)
              let handlersCode = ''
              let permissionsCode = ''
              entryType.functions.forEach(f => {
                if (f.permission !== 'remove') {
                  if (f.name !== 'declarations') entryTypeNode.addFunction(`${entryType.name.toLowerCase()}::${f.name}`)
                  libCode += f.libCode + '\n\n'
                  if (f.testCode) testCode += f.testCode + '\n\n'
                  handlersCode += f.code + '\n\n'
                } else {
                  libCode += `\t// No-one allowed to ${f.name}\n\n`
                  if (f.testCode) testCode += `// No-one allowed to ${f.name}\n\n`
                  handlersCode += `\t// No-one allowed to ${f.name}\n\n`
                }
                if (f.permissionsCode) permissionsCode += f.permissionsCode + '\n\n'
              })
              testCode += '}'
              nodes.push({ id: entryType.id, node: entryTypeNode })
              this.$emit('entry-type-functions-code-updated', that.zome.base, entryType.name.toLowerCase(), handlersCode, permissionsCode)
            } else {
              entryTypeInPort = existingEntryTypeNode.node.ports.find(port => port.name === `id:initial_${entryType.name.toLowerCase()}_entry_address`).id
              const entryTypeOutPort = anchorNode.addOutPort(`${entryType.name.toLowerCase()}_link`)
              dnaModel.addLink(entryTypeOutPort, entryTypeInPort, link.tag, link.context)
            }
          })
          nodes.push({ id: anchor.id, node: anchorNode })
          anchorIndex += 1
          anchorsYIndex += 1
          anchorsOffset += 185
        })
        if (anchorType.agentIdLinks) {
          const agentAnchorTypeOutPort = anchorTypeNode.addOutPort('agent_link')
          const agentNode = dnaModel.addNode('AgentId', col2Offset, yOffset + anchorsOffset, cardWidth, 105, 'agent', 0, this.$vuetify.theme.themes.dark.accent)
          agentNode.deletable = true
          agentNode.addField('nick|String')
          agentNode.addField('pub_sign_key|String')
          const agentInPort = agentNode.addInPort('%agent_id')
          dnaModel.addLink(agentAnchorTypeOutPort, agentInPort, '%agent_id')
          anchorType.agentIdLinks.forEach((link, index) => {
            const agentOutPort = agentNode.addOutPort(link.type)
            const inNode = nodes.find(node => node.id === link.entityId)
            if (inNode && inNode.node.ports.length > 0) {
              inNode.node.insertLinkField(`link!|type:${link.type}`)
              inNode.node.insertLinkField('link!|from:%agent_id')
              const inPort = inNode.node.ports.find(port => {
                return port.type === 'in' && port.name === link.target
              })
              if (inPort) {
                dnaModel.addLink(agentOutPort, inPort.id, link.tag, link.context)
              }
            } else {

            }
          })
        }
        if (anchorType.anchors.length === 0) {
          anchorsYIndex += 1
          anchorsOffset = anchorsYIndex * 185
        }
      })
      libCode += '}'
      this.$emit('zome-model-updated', libCode)
      return dnaModel
    }
  },
  computed: {
    funcCodemirror () {
      return this.$refs.cmFunctionCode.codemirror
    },
    entryType () {
      let entryType = {}
      this.zome.anchorTypes.some(a => {
        entryType = a.entryTypes.find(e => e.name.toLowerCase() === this.entryTypeName.toLowerCase())
      })
      if (entryType === {}) {
        entryType = this.zome.entryTypes.find(e => e.name.toLowerCase() === this.entryTypeName.toLowerCase())
      }
      return entryType
    }
  },
  mounted () {
    this.model = this.createModel()
  }
}
</script>
