<template>
  <v-card class="ma-5" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-list-item v-if="whois" class="mb-1 ml-n3">
        <v-progress-circular color="green" size="34" value="45" rotate="20">
          <v-list-item-avatar class="ml-4" size="24">
            <v-img :src="whois.info.avatar" />
          </v-list-item-avatar>
        </v-progress-circular>
        <v-list-item-content class="ml-4">
          <v-list-item-title>{{whois.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing && instance.entry.id === 'new'" @click="createEntry(payload); isEditing=false">mdi-content-save</v-icon>
      <v-icon v-if="isEditing && instance.entry.id !== 'new'" @click="updateEntry(payload); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteEntry(payload)">mdi-delete-outline</v-icon>
      <part-manager :base="instance.entry.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Freckle.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Press <v-icon>mdi-note-text-outline</v-icon> to edit a Bubble.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Bubble.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Bubble.
    </v-alert>
    <v-form-base id="form-base-css" :editing="isEditing" :value="entry" :schema="schema" @change:form-base-css="log"></v-form-base>
    <v-col v-for="(part, i) in parts" :key="i" class="d-flex child-flex" cols="12">
      <component :is="part.title" :base="instance.partBase" :key="part.title" />
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import VFormBase from '@/components/vFormBase'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Bubble',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    VFormBase
  },
  props: ['instance', 'base', 'entry'],
  data () {
    return {
      payload: { instance: this.instance, base: this.base, entry: this.entry },
      clean: {},
      isEditing: this.entry.id === 'new',
      parts: [],
      help: false,
      schema: {
        title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
        content: { type: 'tiptap', label: 'Content', col: 12 },
        emoji: { type: 'text', label: 'Emoji', col: 12 }
      }
    }
  },
  methods: {
    ...mapActions('root', ['createEntry', 'updateEntry', 'deleteEntry']),
    addPart (name) {
      this.parts.push(name)
    },
    log (event) {
      console.log(event)
    }
  },
  created () {
    this.clean = { ...this.entry }
    this.parts = this.partParts(this.instance.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts']),
    ...mapGetters('friends', ['friend']),
    whois () {
      return this.friend(this.instance.instanceId, this.entry.createdBy)
    }
  }
}
</script>
