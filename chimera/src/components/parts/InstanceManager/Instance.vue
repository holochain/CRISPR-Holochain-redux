<template>
  <v-card class="ma-1" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-spacer></v-spacer>
      <v-list-item>
        <v-list-item-avatar size="24" class="pl-0 ml-0">
          <v-img :src="whois.info.avatar" />
        </v-list-item-avatar>
        <v-list-item-content class="ml-0">
          <v-list-item-title>{{whois.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing" @click="saveInstance({ base: base, instance: instanceInstance}); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteInstance({ base: base, instance: instanceInstance})">mdi-delete-outline</v-icon>
      <part-manager :base="instanceInstance.id" @add-part="addPart"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to this Instance.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Clicks <v-icon>mdi-note-text-outline</v-icon> to edit a Instance.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-content-save</v-icon> to save a Instance.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click <v-icon>mdi-delete-outline</v-icon> to delete a Instance.
    </v-alert>
    <v-card-text v-if="!isEditing" v-html="instanceInstance.content" />
    <tiptap-vuetify v-if="isEditing" v-model="instanceInstance.content" :extensions="extensions" :toolbar-attributes="{ color: 'info' }" />
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
  name: 'Instance',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    TiptapVuetify
  },
  props: ['base', 'instance', 'partBase'],
  data () {
    return {
      instanceInstance: {},
      clean: {},
      isEditing: this.instance.id === 'new',
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
    ...mapActions('instances', ['saveInstance', 'deleteInstance']),
    addPart (name) {
      this.parts.push(name)
    }
  },
  created () {
    this.clean = { ...this.instance }
    this.instanceInstance = { ...this.instance }
    this.parts = this.partParts(this.partBase)
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['partParts']),
    ...mapGetters('friends', ['friend', 'agentProfile']),
    whois () {
      if (this.instance.createdBy) return this.friend(this.instance.createdBy)
      return this.agentProfile
    }
  }
}
</script>
