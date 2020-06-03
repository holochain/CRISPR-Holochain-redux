<template>
  <v-card class="ma-1" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveWebsite({ base: base, website: instanceWebsite}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteWebsite({ base: base, website: instanceWebsite})">mdi-delete-outline</v-icon>
      <part-manager :base="instanceWebsite.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Website.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click <v-icon>mdi-note-text-outline</v-icon> to edit a Website.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Website.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Website.
    </v-alert>
    <v-card-text v-if="!isEditing" v-html="instanceWebsite.url" />
    <v-text-field v-if="isEditing" v-model="instanceWebsite.url" />
    <v-card-text v-if="!isEditing" v-html="instanceWebsite.content" />
    <tiptap-vuetify v-if="isEditing" v-model="instanceWebsite.content" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
    <v-col v-for="(part, i) in parts" :key="i" class="d-flex child-flex" cols="12">
      <component :is="part.title" :base="partBase" :agent="part.createdBy" :key="part.title" />
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
  name: 'Website',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['base', 'website', 'partBase'],
  data () {
    return {
      instanceWebsite: {},
      clean: {},
      isEditing: this.website.id === 'new',
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
    ...mapActions('websites', ['saveWebsite', 'deleteWebsite']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.website }
    this.instanceWebsite = { ...this.website }
    this.parts = this.partParts(this.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts']),
    ...mapGetters('friends', ['friend', 'agentProfile']),
    whois () {
      if (this.website.createdBy) return this.friend(this.website.createdBy)
      return this.agentProfile
    }
  }
}
</script>
