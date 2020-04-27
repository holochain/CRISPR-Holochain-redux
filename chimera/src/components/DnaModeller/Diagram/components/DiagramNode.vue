<template>
  <svg :x="x" :y="y">
    <rect :fill="color" stroke="#000000" :stroke-width="selected ? 2 : 0" x="5" y="15" rx="3" ry="3" :width="width" :height="height" class="node-dark-background">
    </rect>
    <svg x="0" y="0" @mousedown="mouseDown" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <rect fill="#000000" :fill-opacity="titleFillOpacity" x="7" y="17" rx="3" ry="3" :width="width-4" height="18" class="node-dark-background">
      </rect>
      <text :x="10" :y="30" font-size="14" font-weight="bold" fill="#FFFFFF">{{title}}</text>
      <g v-if="type==='entryType'" @click="editPermissions()">
        <rect :x="width - 46" y="18" width="14" height="14" rx="2" ry="2" fill="#ffffff" :fill-opacity="0.25"/>
        <image :x="width - 46" y="18" width="14" height="14" xlink:href="./key.svg" />
      </g>
      <g v-if="type==='entryType'" @click="editProperties()">
        <rect :x="width - 29" y="18" width="14" height="14" rx="2" ry="2" fill="#ffffff" :fill-opacity="0.25"/>
        <image :x="width - 28" y="20" width="12" height="11" xlink:href="./properties.svg" />
      </g>
      <g v-if="deletable" @click="deleteNode()">
        <rect :x="width - 12" y="18" width="14" height="14" rx="2" ry="2" fill="#ffffff" :fill-opacity="0.25"/>
        <line :x1="width" :y1="20" :x2="width - 10" :y2="30" style="stroke:rgb(0,0,0);" stroke-width="2" />
        <line :x1="width - 10" :y1="20" :x2="width" :y2="30" style="stroke:rgb(0,0,0);" stroke-width="2" />
      </g>
    </svg>
    <rect v-if="type==='rootAnchor'" fill="#ffffff" x="7" :y="height - 8" rx="3" ry="3" :width="width-4" height="20" :fill-opacity="0.65" class="node-light-background">
    </rect>
    <rect v-if="type==='rootAnchor'" fill="#ffffff" x="7" y="98" rx="3" ry="3" :width="width-4" :height="height - 109" class="node-light-background">
    </rect>
    <rect v-if="type==='anchorType' || type==='anchor'" fill="#ffffff" x="7" y="97" rx="3" ry="3" :width="width-4" :height="height - 128" class="node-light-background">
    </rect>
    <rect v-if="type==='anchorType' || type==='anchor'" fill="#ffffff" x="7" :y="height - 29" rx="3" ry="3" :width="width-4" height="41" :fill-opacity="0.65" class="node-light-background">
    </rect>
    <rect v-if="type==='entryType'" fill="#ffffff" x="7" :y="entryDefHeight + 39" rx="3" ry="3" :width="width-4" :height="height - entryDefHeight - metaFieldsHeight - functionsHeight - 32" class="node-light-background">
    </rect>
    <rect v-if="type==='entryType'" fill="#ffffff" x="7" :y="height-baseTargetHeight-metaFieldsHeight-functionsHeight + 29" rx="3" ry="3" :width="width-4" :height="metaFieldsHeight" :fill-opacity="0.85" class="node-light-background">
    </rect>
    <rect v-if="type==='entryType'" fill="#ffffff" x="7" :y="height - functionsHeight + 11" rx="3" ry="3" :width="width-4" :height="baseTargetHeight" :fill-opacity="0.65" class="node-light-background">
    </rect>
    <rect v-if="type==='entryType'" fill="#ffffff" x="7" :y="height - functionsHeight + 33" rx="3" ry="3" :width="width-4" :height="functionsHeight-21" :fill-opacity="0.8" class="node-light-background">
    </rect>
    <rect v-if="type!=='agent'" fill="#ffffff" x="7" y="37" rx="3" ry="3" :width="width-4" :height="entryDefHeight" :fill-opacity="0.45" class="node-light-background">
    </rect>
    <rect v-if="type==='agent'" fill="#ffffff" x="7" y="37" rx="3" ry="3" :width="width-4" height="38" :fill-opacity="0.45" class="node-light-background">
    </rect>
    <rect v-if="type==='agent'" fill="#ffffff" x="7" :y="height - 28" rx="3" ry="3" :width="width-4" height="41" :fill-opacity="0.65" class="node-light-background">
    </rect>
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
      default: false
    },
    selected: Boolean,
    entryDefHeight: {
      type: Number,
      default: 58
    },
    functionsHeight: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      nodeStrokeWidth: 0,
      titleFillOpacity: 0.25,
      metaFieldsHeight: 117,
      baseTargetHeight: 20
    }
  },
  methods: {
    deleteNode () {
      this.$emit('deleteModelNode', this.type, this.typeIndex)
    },
    editProperties () {
      this.$emit('edit-properties', this.typeIndex, this.type)
    },
    editPermissions () {
      const entryTypeName = this.title.split('::')[1]
      this.$emit('edit-permissions', entryTypeName)
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
