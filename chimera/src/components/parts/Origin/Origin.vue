<template>
  <v-card class="ma-5" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
        <v-list-item class="mb-1 ml-n3">
        <v-progress-circular color="green" size="34" value="0" rotate="0">
          <v-list-item-avatar class="ml-4" size="24">
              <v-img :src="whois.info.avatar" />
            </v-list-item-avatar>
          </v-progress-circular>
        <v-list-item-content class="ml-4">
          <v-list-item-title>{{whois.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveOrigin({ base: 'originBase', origin: instanceOrigin}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteOrigin({ base: '', origin: instanceOrigin})">mdi-delete-outline</v-icon>
      <part-manager :base="instanceOrigin.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Origin.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click <v-icon>mdi-note-text-outline</v-icon> to edit a Origin.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Origin.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Origin.
    </v-alert>
    <v-card-text v-if="!isEditing" v-html="instanceOrigin.shortDescription" />
    <tiptap-vuetify v-if="isEditing" v-model="instanceOrigin.shortDescription" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
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
  name: 'Origin',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['base', 'origin', 'partBase'],
  data () {
    return {
      instanceOrigin: {},
      clean: {},
      isEditing: this.origin.id === 'new',
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
    ...mapActions('origins', ['saveOrigin', 'deleteOrigin']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.origin }
    this.instanceOrigin = { ...this.origin }
    this.parts = this.partParts(this.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts']),
    ...mapGetters('friends', ['friend']),
    whois () {
      return this.friend(this.origin.createdBy)
    }
  }
}
</script>
