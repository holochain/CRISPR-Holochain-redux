/**
 * Wraps each node view in prosemirror render function.
 */
export function initNodeViews (nodeViews) {
  const nvs = {}
  Object.keys(nodeViews).forEach(key => {
    nvs[key] = function (node, view, getPos, decorations) {
      const NV = nodeViews[key]
      return new NV(node, view, getPos, decorations)
    }
  })
  return nvs
}
