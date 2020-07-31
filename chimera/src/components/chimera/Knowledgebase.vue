<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Knowledgebase</span>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon @click="addFolder">
          mdi-folder-plus-outline
        </v-icon>
      </v-btn>
      <v-btn icon @click="newItemDialog = true">
        <v-icon>
          mdi-note-plus-outline
        </v-icon>
      </v-btn>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      Click one of the <v-icon>mdi-cloud-tags</v-icon> Thought Bubbles to see the articles tagged to that thought.
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click the <v-icon>mdi-folder-plus-outline</v-icon> to add a new folder for your articles
      <v-divider class="my-4 info" style="opacity: 0.22" />
      Click the <v-icon>mdi-note-plus-outline</v-icon> to add a new article
    </v-alert>
    <v-row no-gutters>
      <v-col cols="3">
        <v-card flat tile height="94vh" class="pa-0 ma-0 overflow-auto">
          <v-row no-gutters>
            <v-col cols="12">
              <v-treeview v-model="tree" :open="open" :items="items" activatable item-key="name" open-on-click>
                <template v-slot:prepend="{ item, open }">
                  <v-icon v-if="!item.file" @click="folderTagCloud(item)">
                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                  </v-icon>
                  <v-icon v-else @click="loadFile(item)">
                    {{ files[item.file] }}
                  </v-icon>
                </template>
                <template v-slot:label="{ item }">
                  <v-btn v-if="!item.file" text @click="folderTagCloud(item)" class="text-none">
                    {{item.name}}
                  </v-btn>
                  <v-btn v-else text @click="loadFile(item)" class="text-none">
                    {{item.name}}
                  </v-btn>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="9">
        <tagcloud v-if="cloud" :instance="instance" :showEntries="showEntries" />
        <v-card v-else flat tile class="pa-1">
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
          <v-card-text v-text="bubble.value.content" />
        </v-card>
        <v-dialog v-model="newItemDialog" max-width="1000px">
          <v-card>
            <v-card-title>New Article</v-card-title>
            <v-card-text>
              <v-form-base id="form-base-css" :editing="true" :value="bubble.value" :schema="bubble.schema" @change:form-base-css="log"></v-form-base>
              <tags :disabled="false" :instance="instance" :base="entry.id" />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="action darken-1" text @click="addItem(); newItemDialog = false">
                Add
              </v-btn>
              <v-btn color="action darken-1" text @click="newItemDialog = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </section>
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
    newItemDialog: false,
    cloud: true,
    help: false,
    showEntries: false,
    bubble: {
      value: {
        title: '',
        content: ''
      },
      schema: {
        title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
        content: { type: 'tiptap', label: 'Content', col: 12 }
      }
    },
    folderItem: {},
    entry: { id: '' },
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
        name: 'Getting Started',
        bubble: {
          value: {
            title: 'Getting Started',
            content: '<h1>Setting up a Holochain conductor</h1><p>CRISPR uses the Holochain test framework Try-O-Rama to easily setup the DHTs and sample data is added by running the setup node files. CRISPR generates all the code for the DNA and UI of your application, as well as testing, packaging and installing the DNA :)</p><p>First thing to do is update</p><p>...../CRISPR/chimera/src/store/modules/auth.js</p><p>and set the folder path to where you cloned this repo.</p><p>developer: {</p><p>folder: \'/Users/philipbeadle/holochain/CRISPR\'</p><p>}</p><p>The files are located in the dna/demo folder. Open a Holochain nix-shell and follow these steps to run your conductor and add in data from mutliple players.</p><ol><li><p><code>cd dna/demo</code></p></li><li><p><code>yarn start</code></p></li><li><p>Wait</p></li></ol><p>It takes a few minutes for Holochain to get settled, search the terminal for "Holochain settled ready to run setup data." When you get a result the conductors for the 6 players are ready. Leave Holochain to run while we add some data in a new terminal running the nix-shell.</p><ol><li><p><code>yarn demo:setup</code></p></li><li><p><code>yarn demo:setup:philOrigins</code></p></li><li><p><code>yarn demo:setup:rudy</code></p></li><li><p><code>yarn demo:setup:mary</code></p></li></ol><p>You will now have a working Holochain conductor and a separate node for each of the 6 players in the demo setup. You can now connect instances of Chimera to each Holochain node by running</p><p><code>yarn chimera:phil</code></p>'
          },
          schema: {
            title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
            content: { type: 'tiptap', label: 'Content', col: 12 }
          }
        },
        id: 'entryCRISPR',
        file: 'note'
      },
      {
        name: 'CRISPR',
        bubble: {
          value: {
            title: 'What is CRISPR?',
            content: '<h1>CRISPR is a Rapid Application Developemnt IDE for Holochain</h1><p>Holochain CRISPR makes it easy to edit your DNA by changing the fields in your entries, the DNA pattern and the permissions for who can add, edit and delete entries. Holochain is based on Biomimicry and like CRISPR Cas9 genetic editing Holochain CRISPR Cas enables editing of Holochain DNA.</p><p>Using CRISPR requires the Holochain nix-shell to compile the DNA and also run the webserver for the hot reload feature when editing a part.</p>'
          },
          schema: {
            title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
            content: { type: 'tiptap', label: 'Content', col: 12 }
          }
        },
        id: 'entryCRISPR',
        file: 'note'
      },
      {
        name: 'Build a Holochain App',
        bubble: {
          value: {
            title: 'How to use CRISPR?',
            content: '<p>CRISPR is a Holochain Developer IDE built specifically to enable anyone with an idea to build a DNA with an associated web interface. </p><p>Follow these steps to build your own.</p><ol><li><p>On the "Projects" screen click the + button to open the New Project dialog.</p></li><li><p>Fill out the form following the hints on each field and click "Create"</p></li><li><p>On your newly created project click the { } button to go to the Zome Modeller</p></li><li><p>Remember there is ? help on every screen</p></li><li><p>Click the list button on your new entry type and configure the fields you want to store as an entry in Holochain.</p></li><li><p>Click the key to set who you want to be able to create, update and delete entries</p></li><li><p>Your code has been generated. if you\'re interested in the code use the file explorer to investigate each file needed to create a DNA</p></li><li><p>Once you\'re ready click the Export button in the toolbar to write the files ready to test and package</p></li><li><p>The test and package buttons become enabled once the code is written to disk so run the tests first. This is the air bag icon (get it, test :)) You will see the results and otehr log messages in the dev tools console.</p></li><li><p>When the tests are finished click the "Create" icon to package up the DNA ready for installing into Holochain</p></li><li><p>The Holochain icon becomes visible when the build is complete, click it to install your new DNA </p></li><li><p>Now that you have a running instance of your DNA we can edit the UI and see how it really works. Click the application icon to open the UI editor. </p></li><li><p>Try out your new application right in the editor, add, update and delete all really interacting with Holochain. You can see the results of your interactions in the console.</p></li></ol>'
          },
          schema: {
            title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
            content: { type: 'tiptap', label: 'Content', col: 12 }
          }
        },
        id: 'entryCRISPR',
        file: 'note'
      }
    ]
  }),
  methods: {
    addFolder () {
      this.items.push({
        name: 'New Folder',
        children: [
          {
            name: 'New Article',
            bubble: this.bubble,
            id: 'entryChimera',
            file: 'note'
          }
        ]
      })
    },
    addItem () {
      const item = {
        name: this.bubble.value.title,
        bubble: this.bubble,
        id: 'new',
        file: 'note'
      }
      this.folderItem.push(item)
      this.loadFile(item)
    },
    log (event) {
      console.log(event)
    },
    ...mapActions('root', ['createEntry', 'updateEntry', 'deleteEntry']),
    loadFile (item) {
      console.log(item)
      if (item.id === 'tag-cloud') {
        this.cloud = true
        this.showEntries = false
      } else {
        this.cloud = false
        this.isEditing = false
        this.entry.id = item.id
        this.bubble = item.bubble
      }
    },
    folderTagCloud (item) {
      console.log('folder', item)
      this.folderItem = item
    }
  },
  computed: {
    whois () {
      return undefined
    }
  },
  created () {
    console.log(this.instance)
    this.payload = { instance: this.instance, base: '', entry: this.bubble }
    this.folderItem = this.items
  }
}
</script>
