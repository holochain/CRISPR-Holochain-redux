<template>
  <svg :x="x" :y="y">
    <rect :fill="color" stroke="#000000" :stroke-width="selected ? 2 : 0" x="5" y="15" rx="3" ry="3" :width="width" :height="height" class="node-dark-background">
    </rect>
    <svg x="0" y="0" @mousedown="mouseDown" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <rect fill="#000000" :fill-opacity="titleFillOpacity" x="7" y="17" rx="3" ry="3" :width="width-4" height="18" class="node-dark-background">
      </rect>
      <text :x="10" :y="30" font-size="14" font-weight="bold" fill="#FFFFFF">{{title}}</text>
      <g v-if="type==='entry'" @click="editModelNode()">
        <rect :x="width - 29" y="18" width="14" height="14" rx="2" ry="2" fill="#ffffff" :fill-opacity="0.25"/>
        <image :x="width - 29" y="18" width="14" height="14" xlink:href="./edit.svg" />
      </g>
      <g v-if="deletable" @click="deleteNode()">
        <rect :x="width - 12" y="18" width="14" height="14" rx="2" ry="2" fill="#ffffff" :fill-opacity="0.25"/>
        <line :x1="width" :y1="20" :x2="width - 10" :y2="30" style="stroke:rgb(0,0,0);" stroke-width="2" />
        <line :x1="width - 10" :y1="20" :x2="width" :y2="30" style="stroke:rgb(0,0,0);" stroke-width="2" />
      </g>
    </svg>
    <rect v-if="type!=='agent'" fill="#ffffff" x="7" y="37" rx="3" ry="3" :width="width-4" height="58" :fill-opacity="0.45" class="node-light-background">
    </rect>
    <rect v-if="type!=='agent'" fill="#ffffff" x="7" y="98" rx="3" ry="3" :width="width-4" :height="height - 85" class="node-light-background">
    </rect>
    <text v-if="type==='agent'" :x="15" :y="70" font-size="20" font-weight="bold" fill="#000000">AGENT_ADDRESS</text>
    <slot></slot>
  </svg>
</template>
<script>
export default {
  name: 'DiagramNode',
  props: {
    title: {
      type: String,
      required: true
    },
    index: Number,
    typeIndex: Number,
    ports: {
      type: Array,
      default: () => {
        return []
      }
    },
    x: Number,
    y: Number,
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 400
    },
    type: {
      type: String,
      default: 'Entry'
    },
    color: {
      type: String,
      default: '#66cc00'
    },
    deletable: {
      type: Boolean,
      default: true
    },
    selected: Boolean
  },
  data () {
    return {
      nodeStrokeWidth: 0,
      titleFillOpacity: 0.25
    }
  },
  methods: {
    deleteNode () {
      this.$emit('deleteModelNode', this.type, this.typeIndex)
    },
    editModelNode () {
      this.$emit('editModelNode', this.typeIndex, this.type)
    },
    mouseDown: function (event) {
      this.$emit(
        'onStartDrag',
        { type: 'nodes', index: this.index },
        event.x - this.x,
        event.y - this.y
      )
    },
    mouseenter () {
      this.titleFillOpacity = 0.5
    },
    mouseleave () {
      this.titleFillOpacity = 0.25
    }
  }
}
</script>
