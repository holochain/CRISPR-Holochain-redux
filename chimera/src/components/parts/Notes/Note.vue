<template>
  <v-card flat class="mx-auto" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing && instance.entry.id === 'new'" @click="createEntry(payload); isEditing=false">mdi-content-save</v-icon>
      <v-icon v-if="isEditing && instance.entry.id !== 'new'" @click="updateEntry(payload); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteEntry(payload)">mdi-delete-outline</v-icon>
      <part-manager :base="entry.uuid" @add-part="addPart"/>
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
    <v-card-title v-if="!isEditing">{{entry.title}}</v-card-title>
    <v-text-field v-if="isEditing" class="ml-2 white--text" v-model="entry.title" label="Title" />
    <v-card-text v-if="!isEditing" v-html="entry.content" />
    <tiptap-vuetify v-if="isEditing" v-model="entry.content" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
    <v-col v-for="(part, i) in partParts" :key="i" class="d-flex child-flex" cols="12">
      <component :is="part.title" :instance="part.instance" :base="entry.uuid" :agent="entry.createdBy" :key="part.title" />
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
  name: 'Note',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['instance', 'base', 'entry'],
  data () {
    return {
      payload: { instance: this.instance, base: this.base, entry: this.entry },
      clean: {},
      isEditing: this.entry.id === 'new',
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
    ...mapActions('root', ['createEntry', 'updateEntry', 'deleteEntry']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.entry }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      partParts (state) {
        return state.root.partParts[this.instance.partBase]
      }
    })
  }
}
</script>
