import DiagramNode from './DiagramNode'

var generateId = function () {
  return Math.trunc(Math.random() * 1000)
}

let anchorTypeIndex = 0

/**
 * @class DiagramModel
 */
class DiagramModel {
  /**
   */
  constructor () {
    this._model = {
      nodes: [],
      links: []
    }
  }

  /**
   * Adds a node to the diagram
   * @param {String} title  The title of the node
   * @param {Integer} x      X coordinate
   * @param {Integer} y      Y Coordinate
   * @param {Integer} width  Width
   * @param {Integer} height Height
   * @param {String} type  Anchor, Entry, Link
   * @return {Node} The node created
   */
  addNode (title, x, y, width, height, type, typeIndex, color, entryDefHeight) {
    const newNode = new DiagramNode(generateId(), title, x, y, width, height, type, typeIndex, color, entryDefHeight)
    this._model.nodes.push(newNode)
    return newNode
  }

  addRootAnchor (colOffset, yOffset, cardWidth, color) {
    const rootAnchorNode = this.addNode('anchor_type::root_anchor', colOffset, yOffset, cardWidth, 145, 'rootAnchor', 0, color, 58)
    rootAnchorNode.addField('entry!|name:holochain::anchor')
    rootAnchorNode.addField('link!|from:holochain::anchor')
    rootAnchorNode.addField('link!|type:holochain::anchor_link')
    rootAnchorNode.addField('anchor_type|root_anchor')
    rootAnchorNode.addField('anchor_text')
    return rootAnchorNode.addOutPort('anchor_link')
  }

  addAnchorType (anchorType, rootAnchorPort, colOffset, yOffset, cardWidth, color) {
    const anchorTypeNode = this.addNode(`anchor_type::${anchorType.type}`, colOffset, yOffset, cardWidth, 185, 'anchorType', anchorTypeIndex, color, 58)
    anchorTypeNode.addField('entry!|name:holochain::anchor')
    anchorTypeNode.addField('link!|from:holochain::anchor')
    anchorTypeNode.addField('link!|type:holochain::anchor_link')
    anchorTypeNode.addField(`anchor_type|${anchorType.type}`)
    anchorTypeNode.addField('anchor_text')
    anchorTypeIndex += 1
    const anchorTypeInPort = anchorTypeNode.addInPort('address()')
    this.addLink(rootAnchorPort, anchorTypeInPort, anchorType.type, '→')
    return anchorTypeNode
  }

  addEntryType (zomeName, entryType, colOffset, yOffset, cardWidth, entryTypeIndex, color, uuid = true) {
    const entityName = `${zomeName.toLowerCase().replace(' ', '_')}::${entryType.name.toLowerCase()}`
    const entryTypeNodeHeight = 125 + (entryType.fields.length + entryType.metaFields.length) * 20
    const entryTypeNode = this.addNode(entityName, colOffset, yOffset, cardWidth, entryTypeNodeHeight, 'entryType', entryTypeIndex, color, 78)
    entryTypeNode.deletable = true
    entryTypeNode.addField(`entry!|${entityName}`)
    entryTypeNode.addField('link!|from:holochain::anchor')
    entryTypeNode.addField(`link!|type:${entryType.name.toLowerCase()}_link`)
    entryTypeNode.addField(`uuid|${uuid}`)
    entryType.fields.forEach(field => {
      entryTypeNode.addField(`${field.fieldName}|${field.fieldType}`)
    })
    entryType.metaFields.forEach(metaField => {
      entryTypeNode.addMetaField(`${metaField.fieldName}|${metaField.fieldType}`)
    })
    entryTypeNode.addInPort(`id:initial_${entryType.name.toLowerCase()}_entry_address`)
    return entryTypeNode
  }

  addProfileSpec (zomeName, profileSpec, colOffset, yOffset, cardWidth, color) {
    const entityName = `${zomeName.toLowerCase().replace(' ', '_')}::profile`
    const profileSpecNodeHeight = 125 + (profileSpec.fields.length + profileSpec.metaFields.length) * 20
    const profileSpecNode = this.addNode(entityName, colOffset, yOffset, cardWidth, profileSpecNodeHeight, 'profileSpec', 0, color, 78)
    profileSpecNode.deletable = true
    profileSpecNode.addField(`entry!|${entityName}`)
    profileSpecNode.addField('link!|from:holochain::anchor')
    profileSpecNode.addField('link!|type:profile_link')
    profileSpecNode.addField('uuid|false')
    profileSpec.fields.forEach(field => {
      profileSpecNode.addProfileSpecField(`${field.fieldName}|${field.reason}|${field.contract}`)
    })
    profileSpec.metaFields.forEach(metaField => {
      profileSpecNode.addMetaField(`${metaField.fieldName}|${metaField.fieldType}`)
    })
    return profileSpecNode.addInPort('id:agent_id')
  }

  addAnchor (anchor, anchorTypeOutPort, colOffset, yOffset, cardWidth, anchorIndex, color) {
    const anchorNode = this.addNode(`anchor::${anchor.text}`, colOffset, yOffset, cardWidth, 165, 'anchor', anchorIndex, color, 58)
    anchorNode.addField('entry!|name:holochain::anchor')
    anchorNode.addField('link!|from:holochain::anchor')
    anchorNode.addField('link!|type:holochain::anchor_link')
    anchorNode.addField(`anchor_type|${anchor.type}`)
    anchorNode.addField(`anchor_text|${anchor.text}`)
    const anchorInPort = anchorNode.addInPort('address()')
    this.addLink(anchorTypeOutPort, anchorInPort, anchor.text, '→')
    return anchorNode
  }

  addAnchorAnchor (anchorAnchor, anchorOutPort, colOffset, yOffset, cardWidth, anchorIndex, color) {
    const anchorAnchorNode = this.addNode(`anchor::${anchorAnchor.text}`, colOffset, yOffset, cardWidth, 165, 'anchor', anchorIndex, color, 58)
    anchorAnchorNode.addField('entry!|name:holochain::anchor')
    anchorAnchorNode.addField('link!|from:holochain::anchor')
    anchorAnchorNode.addField('link!|type:holochain::anchor_link')
    anchorAnchorNode.addField(`anchor_type|${anchorAnchor.type}`)
    anchorAnchorNode.addField(`anchor_text|${anchorAnchor.text}`)
    const anchorInPort = anchorAnchorNode.addInPort('address()')
    let context = ''
    if (anchorAnchor.biDirectional === true) context = `←${anchorAnchor.context}`
    this.addLink(anchorOutPort, anchorInPort, `${anchorAnchor.text}→`, context)
    return anchorAnchorNode
  }

  deleteNode (node) {
    if (confirm('Confirm you want to delete this Entity')) {
      const index = this._model.nodes.indexOf(node)
      for (var j = 0; j < this._model.links.length; j++) {
        const currentLink = this._model.links[j]
        for (var i = 0; i < node.ports.length; i++) {
          const currentPort = node.ports[i]
          if (
            currentLink.from === currentPort.id ||
            currentLink.to === currentPort.id
          ) {
            this.deleteLink(currentLink)
            j--
          }
        }
      }
      this._model.nodes.splice(index, 1)
    }
  }

  deleteLink (link) {
    const index = this._model.links.indexOf(link)
    this._model.links.splice(index, 1)
  }

  /**
   * Adds a link between two ports
   * @param {Integer} from   Port id. Must be an out port
   * @param {Integer} to     Port id. Must be an in port
   * @param {String}  tag  Optional. link tag
   * @param {Array}  points  Optional. Array of points to make the link represented as a segmented line
   */
  addLink (from, to, tag = '', context = '', points = []) {
    this._model.links.push({
      id: generateId(),
      from: from,
      to: to,
      tag: tag,
      context: context,
      positionFrom: {},
      positionTo: {},
      points
    })
  }

  /**
   * Serializes the diagram model into a JSON object
   * @return {Object} The diagram model
   */
  serialize () {
    return JSON.stringify(this._model)
  }

  /**
   * Load into the diagram model a serialized diagram
   * @param  {Object} serializedModel
   */
  deserialize (serializedModel) {
    this._model = JSON.parse(serializedModel)
  }
}

export default DiagramModel
