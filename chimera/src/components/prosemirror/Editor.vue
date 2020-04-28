<template lang="html">
<div :class="className">
  <slot name="header"> </slot>
  <div ref="editor"></div>
  <slot name="footer"> </slot>
</div>
</template>

<script>
import { EditorState, Plugin } from 'prosemirror-state' // , TextSelection
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import builtInPlugins from './plugins/index'
import builtInSchema from './schema/index'
import { initNodeViews } from './helpers'

const WILL_CREATE_EVENT = 'willCreate'
const DID_CREATE_EVENT = 'didCreate'
const UPDATE_EVENT = 'wasUpdated'

export default {
  name: 'vue-prosemirror-editor',

  props: {
    className: { type: String, default: 'vue-prose-editor' },
    doc: { type: Object, required: false },
    fromContent: { type: Boolean, required: false },
    schema: { type: Object, default: () => { return {} } },
    nodeViews: { type: Object, default: () => { return {} } },
    keyCommands: { type: Function },
    inputRules: { type: Array, default: () => { return [] } },
    plugins: { type: Array, default: () => [] },
    editorProps: { type: Object, default: () => { return {} } },
    editable: { type: Boolean, default: true },
    interceptTransaction: { type: Function },
    autfocus: { type: Boolean, default: true }
  },

  data () {
    const schema = this.createEditorSchema(this.schema)
    return {
      editor: {
        schema,
        state: null,
        view: null
      }
    }
  },

  mounted () {
    this.initEditor()
  },

  methods: {
    initEditor () {
      this.$emit(WILL_CREATE_EVENT)

      this.editor.state = this.createEditorState(this.editor.schema)
      this.editor.view = this.createEditorView()

      this.$emit(DID_CREATE_EVENT, this.editor)

      if (this.autoFocus) this.editor.view.focus()
    },

    createEditorView () {
      return new EditorView(this.$refs.editor, {
        state: this.editor.state,
        dispatchTransaction: this.dispatchTransaction,
        nodeViews: initNodeViews(this.nodeViews),
        ...this.editorProps
      })
    },

    createEditorState (schema) {
      return EditorState.create({
        schema,
        doc: this.getInitialDoc(schema),
        plugins: [
          ...builtInPlugins({
            schema,
            keys: this.keyCommands ? this.keyCommands({ schema }) : {},
            inputs: this.inputRules
          }),
          ...this.plugins.map(item => {
            const plugin = typeof item !== 'function'
              ? item
              : item(this.editor)
            return new Plugin(plugin)
          }),
          new Plugin({
            props: {
              editable: () => this.editable
            }
          })
        ]
      })
    },

    createEditorSchema (schema) {
      return new Schema({
        nodes: {
          ...builtInSchema.nodes,
          ...schema.nodes
        },
        marks: {
          ...builtInSchema.marks,
          ...schema
        }
      })
    },

    getInitialDoc (schema) {
      if (this.doc) return schema.nodeFromJSON(this.doc)
      else if (this.fromContent) return DOMParser.fromSchema(schema).parse(document.getElementById('content'))
    },

    dispatchTransaction (tr) {
      if (this.interceptTransaction) tr = this.interceptTransaction(tr)
      if (!tr) return // leave unchanged

      this.editor.state = this.editor.state.apply(tr)
      this.editor.view.updateState(this.editor.state)
      this.$emit(UPDATE_EVENT, this.editor.state, this.editor.schema)
    }
  }
}
</script>
