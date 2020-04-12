var generateId = function () {
  return Math.trunc(Math.random() * 1000)
}

/**
 * @class DiagramNode
 */
class DiagramNode {
  /**
   *  This should not be called directly. Use the "addNode" method from the DiagramModel class
   * @param  {String} title  [description]
   * @param  {Integer} x      [description]
   * @param  {Integer} y      [description]
   * @param  {Integer} width  [description]
   * @param  {Integer} height [description]
   * @param  {Integer} id [description]
   * @param  {String} type [description]
   * @param  {String} color [description]
   * @param  {Integer} typeIndex  [description]
   */
  constructor (id, title, x, y, width, height, type, typeIndex, color, entryDefHeight = 58, functionsHeight = 20) {
    this.title = title
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.typeIndex = typeIndex
    this.color = color
    this.entryDefHeight = entryDefHeight
    this.functionsHeight = functionsHeight
    this.ports = []
  }

  addInPort (name) {
    const newPort = {
      id: generateId(),
      type: 'in',
      name
    }

    this.ports.push(newPort)

    return newPort.id
  }

  addOutPort (name) {
    const newPort = {
      id: generateId(),
      type: 'out',
      name
    }

    this.ports.push(newPort)

    return newPort.id
  }

  addField (name) {
    const newPort = {
      id: generateId(),
      type: 'field',
      name
    }

    this.ports.push(newPort)

    return newPort.id
  }

  insertLinkField (name) {
    const newPort = {
      id: generateId(),
      type: 'field',
      name
    }
    this.ports.splice(3, 0, newPort)
    this.height += 20
    this.entryDefHeight += 20
    return newPort.id
  }

  addMetaField (name) {
    const newPort = {
      id: generateId(),
      type: 'metaField',
      name
    }
    this.ports.push(newPort)
    return newPort.id
  }

  addFunction (name) {
    const newPort = {
      id: generateId(),
      type: 'fn',
      name
    }
    this.ports.push(newPort)
    this.functionsHeight += 16
    this.height += 20
    return newPort.id
  }
}

export default DiagramNode
