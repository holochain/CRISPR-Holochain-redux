import { keymap } from 'prosemirror-keymap'
import { undoInputRule } from 'prosemirror-inputrules'
import { undo, redo } from 'prosemirror-history'
import {
  wrapInList,
  splitListItem,
  liftListItem,
  sinkListItem
} from 'prosemirror-schema-list'
import {
  baseKeymap,
  toggleMark,
  wrapIn,
  setBlockType,
  chainCommands,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode
} from 'prosemirror-commands'

export const insertNode = (nodeType, keep = true) => (state, dispatch) => {
  dispatch(state.tr.replaceSelectionWith(nodeType.create()).scrollIntoView())
  return keep
}

export default function ({ schema: { marks, nodes }, keys: userKeys }) {
  const keyCommands = {
    'Mod-z': () => undo,
    'Shift-Mod-z': () => redo,
    Backspace: () => undoInputRule,
    'Mod-y': () => redo,
    'Alt-ArrowUp': () => joinUp,
    'Alt-ArrowDown': () => joinDown,
    'Mod-BracketLeft': () => lift,
    Escape: () => selectParentNode,
    'Mod-b': (strong) => toggleMark(strong),
    'Mod-i': (em) => toggleMark(em),
    'Mod-u': (underline) => toggleMark(underline),
    'Mod-`': (code) => toggleMark(code),
    'Mod-q': (blockquote) => wrapIn(blockquote),
    'Shift-Ctrl-8': (bulletList) => wrapInList(bulletList),
    'Shift-Ctrl-9': (orderedList) => wrapInList(orderedList),
    Enter: (hardBreak) => chainCommands(exitCode, insertNode(hardBreak)),
    'Shift-Enter': (listItem) => splitListItem(listItem),
    'Mod-[': (listItem) => liftListItem(listItem),
    'Mod-]': (listItem) => sinkListItem(listItem),
    'Shift-Ctrl-0': (paragraph) => setBlockType(paragraph),
    'Shift-Ctrl-\\': (codeBlock) => setBlockType(codeBlock),
    'Shift-Ctrl-1': (heading) => setBlockType(heading, { level: 1 }),
    'Shift-Ctrl-2': (heading) => setBlockType(heading, { level: 2 }),
    'Shift-Ctrl-3': (heading) => setBlockType(heading, { level: 3 }),
    'Shift-Ctrl-4': (heading) => setBlockType(heading, { level: 4 }),
    'Mod-_': (horizontalRule) => insertNode(horizontalRule)
  }

  const keys = userKeys
  Object.keys(keyCommands).forEach(k => { // merge built in commands
    if (!keys[k] && k === 'Mod-b' && marks.strong) keys[k] = keyCommands[k](marks.strong)
    else if (!keys[k] && k === 'Mod-i' && marks.em) keys[k] = keyCommands[k](marks.em)
    else if (!keys[k] && k === 'Mod-' && marks.code) keys[k] = keyCommands[k](marks.code)
    else if (!keys[k] && k === 'Shift-Ctrl-8' && nodes.bullet_list) keys[k] = keyCommands[k](nodes.bullet_list)
    else if (!keys[k] && k === 'Shift-Ctrl-9' && nodes.ordered_list) keys[k] = keyCommands[k](nodes.ordered_list)
    else if (!keys[k] && k === 'Ctrl-q' && nodes.blockquote) keys[k] = keyCommands[k](nodes.blockquote)
    else if (!keys[k] && k === 'Enter' && nodes.hard_break) keys[k] = keyCommands[k](nodes.hard_break)
    else if (!keys[k] && k === 'Shift-Enter' && nodes.list_item) keys[k] = keyCommands[k](nodes.list_item)
    else if (!keys[k] && k === 'Mod-[' && nodes.list_item) keys[k] = keyCommands[k](nodes.list_item)
    else if (!keys[k] && k === 'Mod-]' && nodes.list_item) keys[k] = keyCommands[k](nodes.list_item)
    else if (!keys[k] && k === 'Shift-Ctrl-0' && nodes.paragraph) keys[k] = keyCommands[k](nodes.paragraph)
    else if (!keys[k] && k === 'Shift-Ctrl-\\' && nodes.code_block) keys[k] = keyCommands[k](nodes.code_block)
    else if (!keys[k] && k === 'Shift-Ctrl-0' && nodes.heading) keys[k] = keyCommands[k](nodes.heading)
    else if (!keys[k] && k === 'Shift-Ctrl-1' && nodes.heading) keys[k] = keyCommands[k](nodes.heading)
    else if (!keys[k] && k === 'Shift-Ctrl-2' && nodes.heading) keys[k] = keyCommands[k](nodes.heading)
    else if (!keys[k] && k === 'Shift-Ctrl-3' && nodes.heading) keys[k] = keyCommands[k](nodes.heading)
    else if (!keys[k] && k === 'Shift-Ctrl-4' && nodes.heading) keys[k] = keyCommands[k](nodes.heading)
    else if (!keys[k] && k === 'Mod-_' && nodes.horizontal_rule) keys[k] = keyCommands[k](nodes.horizontal_rule)
    else if (!keys[k]) keys[k] = keyCommands[k]()
  })

  Object.keys(baseKeymap).forEach(key => { // merge base commands
    if (keys[key]) {
      keys[key] = chainCommands(keys[key], baseKeymap[key])
    } else {
      keys[key] = baseKeymap[key]
    }
  })

  return keymap(keys)
}
