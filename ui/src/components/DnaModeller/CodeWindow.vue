<template>
  <v-card v-resize="onResizeCodeWindow">
    <codemirror v-model="code" :options="options" ref="codeWindow"></codemirror>
  </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/rust/rust.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'CodeWindow',
  props: ['code', 'options'],
  components: {
    codemirror
  },
  data () {
    return {
    }
  },
  methods: {
    onResizeCodeWindow () {
      this.codeWindow.setSize(window.innerWidth, window.innerHeight - 150)
    }
  },
  computed: {
    codeWindow () {
      return this.$refs.codeWindow.codemirror
    }
  },
  mounted () {
    this.$watch(
      () => {
        return this.codeWindow.value
      },
      (newVal, oldVal) => {
        console.log(newVal)
      },
      {
        deep: true
      }
    )
  }
}
</script>
