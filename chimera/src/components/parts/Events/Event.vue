<template>
  <v-card class="ma-5" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveEvent({ base: '', event: instanceEvent}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteEvent({ base: '', event: instanceEvent})">mdi-delete-outline</v-icon>
      <part-manager :base="instanceEvent.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Event.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click <v-icon>mdi-note-text-outline</v-icon> to edit a Event.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Event.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Event.
    </v-alert>
    <v-list-item class="mb-1 ml-n3">
      <v-progress-circular color="green" size="48" value="45" rotate="20">
        <v-list-item-avatar class="ml-4">
          <v-img :src="whois.info.avatar" />
        </v-list-item-avatar>
      </v-progress-circular>
      <v-list-item-content class="ml-4">
        <v-list-item-title>{{whois.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text v-if="!isEditing" v-html="instanceEvent.shortDescription" />
    <tiptap-vuetify v-if="isEditing" v-model="instanceEvent.shortDescription" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
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
  name: 'Event',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['base', 'event', 'partBase'],
  data () {
    return {
      instanceEvent: {},
      clean: {},
      isEditing: this.event.id === 'new',
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
    ...mapActions('events', ['saveEvent', 'deleteEvent']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.event }
    this.instanceEvent = { ...this.event }
    this.parts = this.partParts(this.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts']),
    ...mapGetters('friends', ['friend']),
    whois () {
      return this.friend(this.event.createdBy)
    }
  }
}
</script>
