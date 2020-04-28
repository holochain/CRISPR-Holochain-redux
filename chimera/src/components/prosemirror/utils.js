import Vue from 'vue'

export class ComponentView {
  constructor (comp, props = {}) {
    Object.keys(props).forEach(key => {
      this[key] = props[key]
    })

    this.dom = this.toDOM(comp)
  }

  toDOM (comp) {
    const targetNode = document.createElement('div')
    const CompDom = Vue.extend(comp)
    this._vm = new CompDom({ propsData: this }).$mount()
    targetNode.appendChild(this._vm.$el)
    return targetNode
  }

  destroy () {
    this._vm.$destroy()
  }
}

export const findNode = function (topNode, predicate) {
  let found
  topNode.descendants((node, pos, parent) => {
    if (predicate(node)) found = { node, pos, parent }
    if (found) return false
  })
  return found
}
