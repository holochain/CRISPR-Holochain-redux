<template>
  <v-row no-gutters>
      <v-col cols="3">
        <v-card flat tile height="94vh" class="pa-0 ma-0 overflow-auto">
          <v-row no-gutters>
            <v-col cols="12">
              <v-treeview v-model="tree" :open="open" :items="items" activatable item-key="name" open-on-click>
                <template v-slot:prepend="{ item, open }">
                  <v-icon v-if="!item.file">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                  </v-icon>
                  <v-icon v-else @click="loadFile(item)">
                    {{ files[item.file] }}
                  </v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <v-btn text @click="loadFile(item)" class="text-none">
                    {{item.name}}
                  </v-btn>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="9">
        <tagcloud v-if="cloud" :instance="instance" />
        <v-card  v-else flat tile height="93vh">
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
            <v-icon v-if="isEditing && entry.id === 'new'" @click="createEntry(payload); isEditing=false">mdi-content-save</v-icon>
            <v-icon v-if="isEditing && entry.id !== 'new'" @click="updateEntry(payload); isEditing=false">mdi-content-save</v-icon>
            <v-icon @click="deleteEntry(payload)">mdi-delete-outline</v-icon>
            <v-icon @click="help=!help">mdi-help</v-icon>
          </v-system-bar>
          <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
            Click <v-icon>mdi-note-text-outline</v-icon> to edit this knowledgebase article.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-content-save</v-icon> to save this knowledgebase article.
            <v-divider class="my-4 info" style="opacity: 0.22" />
            Click <v-icon>mdi-delete-outline</v-icon> to delete this knowledgebase article.
          </v-alert>
          <v-form-base id="form-base-css" :editing="isEditing" :value="bubble.value" :schema="bubble.schema" @change:form-base-css="log"></v-form-base>
          <tags :disabled="!isEditing" :instance="instance" :base="entry.id" />
        </v-card>
      </v-col>
    </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import VFormBase from '@/components/vFormBase'
export default {
  name: 'Knowledgebase',
  components: {
    Tagcloud: () => import('@/components/parts/Tags/Tagcloud'),
    Tags: () => import('@/components/parts/Tags/Tags'),
    VFormBase
  },
  props: ['instance'],
  data: () => ({
    payload: {},
    isEditing: false,
    cloud: true,
    help: false,
    bubble: {
      value: {
        title: '',
        content: ''
      },
      schema: {
        title: { type: 'text', label: 'Title', col: 12, tooltip: 'Title' },
        content: { type: 'tiptap', label: 'Content', col: 12, tooltip: 'Content' }
      }
    },
    entry: { id: 'new', content: '' },
    open: ['public'],
    files: {
      cloud: 'mdi-cloud-tags',
      note: 'mdi-note-text',
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
      code: 'mdi-file-code',
      nix: 'mdi-nix',
      rs: 'mdi-code-braces',
      md: 'mdi-language-markdown',
      model: 'mdi-merge'
    },
    tree: [],
    items: [
      {
        name: 'Thought Bubbles',
        id: 'tag-cloud',
        file: 'cloud'
      },
      {
        name: 'What is Chimera?',
        bubble: {
          value: {
            title: 'Blowing Bubbles',
            content: '<h1 class="title">Blowing ink bubbles and making prints</h1><p>Need to hook up tiptap events to keep model up to date</p>'
          },
          schema: {
            title: { type: 'text', label: 'Title', col: 12, tooltip: 'Title', class: 'display-1' },
            content: { type: 'tiptap', label: 'Content', col: 12, tooltip: 'Content' }
          }
        },
        id: 'entryChimera',
        file: 'note'
      },
      {
        name: 'What is CRISPR?',
        content: 'What is it?',
        id: 'entryCRISPR',
        file: 'note'
      },
      {
        name: 'My Applications',
        children: [
          {
            name: 'Freckles',
            content: 'What is it?',
            id: '',
            file: 'note'
          },
          {
            name: 'Kanban',
            content: 'What is it?',
            id: '',
            file: 'note'
          },
          {
            name: 'Holopunk Records',
            content: 'What is it?',
            id: '',
            file: 'note'
          },
          {
            name: 'CRISPR',
            content: 'What is it?',
            id: 'entryCRISPR',
            file: 'note'
          }
        ]
      },
      {
        name: 'My Parts',
        children: [
          {
            name: 'Notes',
            content: 'What is it?',
            id: '',
            file: 'note'
          },
          {
            name: 'Tasks',
            content: 'What is it?',
            id: '',
            file: 'note'
          },
          {
            name: 'Who Is?',
            content: 'What is it?',
            id: '',
            file: 'note'
          }
        ]
      }
    ]
  }),
  methods: {
    log (event) {
      console.log(event)
    },
    ...mapActions('knowledgeBaseStore', ['createEntry', 'updateEntry', 'deleteEntry']),
    loadFile (item) {
      if (item.id === 'tag-cloud') {
        this.cloud = true
      } else {
        this.cloud = false
        this.isEditing = false
        this.entry.id = item.id
        this.bubble = item.bubble
      }
    }
  },
  computed: {
    whois () {
      return undefined
    }
  },
  created () {
    console.log(this.instance)
    this.payload = { instance: this.instance, base: '', entry: this.entry }
  }
}
</script>
