import { history } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'

import keyCommands from './keys'
import inputRules from './inputs'

export default ({ schema, keys, inputs }) => [
  inputRules({ schema, inputs }),
  keyCommands({ schema, keys }),
  dropCursor(),
  gapCursor(),
  history()
]
