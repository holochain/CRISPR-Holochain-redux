import {
  inputRules,
  wrappingInputRule,
  textblockTypeInputRule,
  smartQuotes,
  emDash,
  ellipsis
} from 'prosemirror-inputrules'

const ruleTypes = [
  {
    name: 'blockquote',
    rule: (nodeType) => wrappingInputRule(
      /^\s*>\s$/,
      nodeType
    )
  },
  {
    name: 'ordered_list',
    rule: (nodeType) => wrappingInputRule(
      /^(\d+)\.\s$/,
      nodeType,
      (match) => ({ order: +match[1] }),
      (match, node) => node.childCount + node.attrs.order === +match[1]
    )
  },
  {
    name: 'bullet_list',
    rule: (nodeType) => wrappingInputRule(
      /^\s*([-+*])\s$/,
      nodeType
    )
  },
  {
    name: 'code_block',
    rule: (nodeType) => textblockTypeInputRule(
      /^```$/,
      nodeType
    )
  },
  {
    name: 'heading',
    rule: (nodeType, maxLevel = 6) => textblockTypeInputRule(
      new RegExp('^(#{1,' + maxLevel + '})\\s$'),
      nodeType,
      match => ({ level: match[1].length })
    )
  }
]

export default function ({ schema: { nodes }, inputs }) {
  const rules = [
    ...smartQuotes,
    ellipsis,
    emDash
  ]

  ruleTypes.forEach(type => { // merge built-in inputs
    if (nodes[type.name] && !inputs.find(t => t[type.name])) {
      rules.push(type.rule(nodes[type.name]))
    }
  })

  inputs.forEach(initRule => {
    rules.push(initRule(nodes))
  })

  return inputRules({ rules })
}
