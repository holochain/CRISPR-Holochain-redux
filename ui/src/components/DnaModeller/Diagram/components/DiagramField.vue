<template>
  <g>
    <svg :y="y + 30">
      <text x="12" y="20" font-size="10pt" fill="#000000">{{name}}</text>
    </svg>
  </g>
</template>
<script>
export default {
  name: 'DiagramField',
  props: ['id', 'y', 'type', 'name', 'nodeWidth', 'nodeIndex'],
  data () {
    return {
      fill: this.$vuetify.theme.themes.dark.secondary
    }
  },
  methods: {
    mouseup () {
      this.$emit('mouseUpPort', this.id)
    },

    enter () {
      this.fill = this.$vuetify.theme.themes.dark.accent
    },

    leave () {
      this.fill = this.$vuetify.theme.themes.dark.secondary
    },
    startDragNewLink () {
      this.$emit('onStartDragNewLink', this.id)
    }
  }
}
</script>
