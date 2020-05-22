<template>
  <v-card class="ma-5" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveFreckle({ base: '', freckle: instanceFreckle}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteFreckle({ base: '', freckle: instanceFreckle})">mdi-delete-outline</v-icon>
      <part-manager :base="instanceFreckle.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Freckle.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click <v-icon>mdi-note-text-outline</v-icon> to edit a Freckle.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Freckle.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Freckle.
    </v-alert>
    <v-card-text v-if="!isEditing" v-html="instanceFreckle.content" />
    <tiptap-vuetify v-if="isEditing" v-model="instanceFreckle.content" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
    <v-col v-for="(part, i) in parts" :key="i" class="d-flex child-flex" cols="12">
      <component :is="part.title" :base="freckle.id" :key="part.title" />
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
  name: 'Freckle',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['base', 'freckle', 'partBase'],
  data () {
    return {
      instanceFreckle: {},
      clean: {},
      isEditing: this.freckle.id === 'new',
      parts: [],
      help: false,
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ]
    }
  },
  methods: {
    ...mapActions('freckles', ['saveFreckle', 'deleteFreckle']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.freckle }
    this.instanceFreckle = { ...this.freckle }
    this.parts = this.partParts(this.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts'])
  }
}
</script>
