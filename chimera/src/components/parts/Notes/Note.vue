<template>
  <v-card flat class="mx-auto" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveNote({ base: base, note: instanceNote}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteNote({ base: base, note: instanceNote})">mdi-delete-outline</v-icon>
      <part-manager :base="instanceNote.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Note.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click <v-icon>mdi-note-text-outline</v-icon> to edit a Note.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Note.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Note.
    </v-alert>
    <v-card-title v-if="!isEditing">{{instanceNote.title}}</v-card-title>
    <v-text-field v-if="isEditing" class="ml-2 white--text" v-model="instanceNote.title" label="Title" />
    <v-card-text v-if="!isEditing" v-html="instanceNote.content" />
    <tiptap-vuetify v-if="isEditing" v-model="instanceNote.content" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
    <v-col v-for="(part, i) in parts" :key="i" class="d-flex child-flex" cols="12">
      {{note}}
      <component :is="part.title" :base="note.id" :title="part.title" :agent="note.id" :key="part.title" />
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
  name: 'Note',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['base', 'note', 'partBase'],
  data () {
    return {
      instanceNote: {},
      clean: {},
      isEditing: this.note.id === 'new',
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
    ...mapActions('notes', ['saveNote', 'deleteNote']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.note }
    this.instanceNote = { ...this.note }
    this.parts = this.partParts(this.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts'])
  }
}
</script>
