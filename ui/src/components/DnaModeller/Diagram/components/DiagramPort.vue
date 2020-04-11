<template>
  <g>
    <svg :y="y + 31" v-if="type === 'in'">
      <rect :fill="fillTarget" ref="handle" x="0" y="10" rx="3" ry="3" width="10" height="10" @mouseenter="enter" @mouseleave="leave" @mousedown="startDragNewLink" @mouseup="mouseup">
      </rect>
      <text x="12" y="20" font-size="12pt" font-weight="bold" fill="#000000">{{name}}</text>
    </svg>
    <svg :y="y + 32" v-if="type === 'out'">
      <rect :fill="fillBase" ref="handle" :x="nodeWidth" y="10" rx="3" ry="3" width="10" height="10" @mouseenter="enter" @mouseleave="leave" @mousedown="startDragNewLink" @mouseup="mouseup">
      </rect>
      <text :x="nodeWidth - 6" y="20" text-anchor="end" font-size="12pt" font-weight="bold" fill="#000000">{{name}}</text>
    </svg>
    <svg :y="y + 30" v-if="type === 'field'">
      <text x="12" y="20" font-size="10pt" fill="#000000">{{name.split('|')[0]}}</text>
      <text :x="nodeWidth / 3 + 10" y="20" font-size="10pt" fill="#000000">{{name.split('|')[1]}}</text>
    </svg>
  </g>
</template>
<script>
export default {
  name: 'DiagramPort',
  props: ['id', 'y', 'type', 'name', 'nodeWidth', 'nodeIndex'],
  data () {
    return {
      fillBase: this.$vuetify.theme.themes.dark.portBase,
      fillTarget: this.$vuetify.theme.themes.dark.portTarget
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
      this.fill = this.$vuetify.theme.themes.dark.port
    },
    startDragNewLink () {
      this.$emit('onStartDragNewLink', this.id)
    }
  }
}
</script>
