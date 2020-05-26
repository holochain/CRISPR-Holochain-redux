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
import * as camelCase from 'camelcase'

function replacePlaceHolders (content, placeHolder, replacement) {
  const replacementC = replacement.charAt(0).toUpperCase() + replacement.substring(1)
  const replacementAllC = replacement.toUpperCase()
  const placeHolderC = placeHolder.charAt(0).toUpperCase() + placeHolder.substring(1)
  const placeHolderAllC = placeHolder.toUpperCase()
  return content.replace(new RegExp(placeHolder, 'g'), replacement).replace(new RegExp(placeHolderAllC, 'g'), replacementAllC).replace(new RegExp(placeHolderC, 'g'), replacementC)
}

function replaceTest (testTemplate, entryType) {
  const testFields = []
  const testUpdateFields = []
  entryType.fields.forEach(field => {
    const fName = camelCase(field.fieldName)
    if (field.fieldType === 'String') {
      testFields.push(`"${fName}": "String for testing"`)
      testUpdateFields.push(`"${fName}": "Update string for testing"`)
    } else if (field.fieldType === 'bool') {
      testFields.push(`"${fName}": false`)
      testUpdateFields.push(`"${fName}": true`)
    } else {
      testFields.push(`"${fName}": 0`)
      testUpdateFields.push(`"${fName}": 1`)
    }
  })
  return testTemplate.replace(new RegExp('_ReplaceFields', 'g'), testFields.join()).replace(new RegExp('_updateFields', 'g'), testUpdateFields.join())
}

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
      const col1Offset = 420
      const col2Offset = 820
      const col3Offset = 1240
      const yOffset = 130
      const cardWidth = 300
      let anchorsYIndex = 0
      let anchorsOffset = 0
      let entryTypesOffset = 0
      let anchorIndex = 0
      let entryTypeIndex = 0
      let libCode = this.zome.libCode
      let hasAnchors = false
      const that = this
      const rootAnchorPort = dnaModel.addRootAnchor(col0Offset, yOffset, cardWidth, this.$vuetify.theme.themes.dark.anchor)
      let entryTypeOffset = col2Offset
      this.zome.anchorTypes.forEach(anchorType => {
        if (anchorType.anchors.length > 0) {
          entryTypeOffset = col3Offset
          hasAnchors = true
        }
      })
      if (this.zome.anchorTypes.find(anchorType => anchorType.agentIdLinks !== undefined)) {
        entryTypeOffset = col3Offset
      }
      this.zome.entryTypes.forEach(entryType => {
        let testCode = this.zome.testCode
        const entryTypeNode = dnaModel.addEntryType(that.zome.name, entryType, entryTypeOffset, yOffset + anchorsOffset + entryTypesOffset, cardWidth + 100, entryTypeIndex, this.$vuetify.theme.themes.dark.entry)
        let handlersCode = ''
        let permissionsCode = ''
        entryType.functions.forEach(f => {
          if (f.permission !== 'remove') {
            if (f.name !== 'declarations' && f.name !== 'rebase') entryTypeNode.addFunction(`${entryType.name.toLowerCase()}::${f.name}`)
            if (f.name === 'rebase' && hasAnchors) entryTypeNode.addFunction(`${entryType.name.toLowerCase()}::${f.name}`)
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
        handlersCode = replacePlaceHolders(handlersCode, 'origin', entryType.name.toLowerCase())
        permissionsCode = replacePlaceHolders(permissionsCode, 'origin', entryType.name.toLowerCase())
        testCode = replacePlaceHolders(testCode, 'originszome', this.zome.name.toLowerCase())
        testCode = replacePlaceHolders(testCode, 'origin', entryType.name.toLowerCase())
        testCode = replaceTest(testCode, entryType)
        libCode = replacePlaceHolders(libCode, 'origin', entryType.name.toLowerCase())
        this.$emit('entry-type-functions-code-updated', that.zome.base, entryType.name.toLowerCase(), handlersCode, permissionsCode, testCode)
        nodes.push({ id: entryType.id, node: entryTypeNode })
        entryTypeIndex += 1
        entryTypesOffset = entryTypesOffset + entryTypeNode.height + 20
      })
      this.zome.anchorTypes.forEach(anchorType => {
        anchorsOffset = anchorsYIndex * 185
        const anchorTypeNode = dnaModel.addAnchorType(anchorType, rootAnchorPort, col1Offset, yOffset + anchorsOffset, cardWidth, this.$vuetify.theme.themes.dark.anchor)
        let entryTypeInPort = 0
        anchorType.links.forEach(link => {
          const entryType = this.zome.entryTypes.find(entryType => entryType.id === link.entityId)
          const existingEntryTypeNode = nodes.find(node => node.id === link.entityId)
          entryTypeInPort = existingEntryTypeNode.node.ports.find(port => port.name === `id:initial_${entryType.name.toLowerCase()}_entry_address`).id
          const entryTypeOutPort = anchorTypeNode.addOutPort(`${entryType.name.toLowerCase()}_link`)
          dnaModel.addLink(entryTypeOutPort, entryTypeInPort, link.tag, link.context)
        })
        nodes.push({ id: anchorType.id, node: anchorTypeNode })
        let anchorTypeOutPort = 0
        if (anchorType.anchors.length > 0) {
          anchorTypeOutPort = anchorTypeNode.addOutPort('anchor_link')
        }
        anchorsOffset += entryTypesOffset
        anchorType.anchors.forEach((anchor, index) => {
          const anchorNode = dnaModel.addAnchor(anchor, anchorTypeOutPort, col2Offset, yOffset + anchorsOffset, cardWidth, anchorIndex, this.$vuetify.theme.themes.dark.anchor)
          let entryTypeInPort = 0
          anchor.links.forEach(link => {
            const entryType = this.zome.entryTypes.find(entryType => entryType.id === link.entityId)
            const existingEntryTypeNode = nodes.find(node => node.id === link.entityId)
            entryTypeInPort = existingEntryTypeNode.node.ports.find(port => port.name === `id:initial_${entryType.name.toLowerCase()}_entry_address`).id
            const entryTypeOutPort = anchorNode.addOutPort(`${entryType.name.toLowerCase()}_link`)
            dnaModel.addLink(entryTypeOutPort, entryTypeInPort, link.tag, link.context)
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
      if (this.zome.profileSpec) {
        const profileSpecInPort = dnaModel.addProfileSpec(that.zome.name, this.zome.profileSpec, col2Offset, yOffset + entryTypesOffset, cardWidth + 100, this.$vuetify.theme.themes.dark.profile)
        const anchorType = {
          type: 'list_profiles'
        }
        const profileSpecAnchorNode = dnaModel.addAnchorType(anchorType, rootAnchorPort, col1Offset, yOffset + entryTypesOffset, cardWidth, this.$vuetify.theme.themes.dark.anchor)
        const profileSpecAnchorOutPort = profileSpecAnchorNode.addOutPort('profile_link')
        dnaModel.addLink(profileSpecAnchorOutPort, profileSpecInPort, 'Profile', 'Permanent')
      }
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
      return this.zome.entryTypes.find(e => e.name.toLowerCase() === this.entryTypeName.toLowerCase())
    }
  },
  mounted () {
    this.model = this.createModel()
  }
}
</script>
