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
        <tagcloud v-if="cloud" :instance="instance" />
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
            content: '<h1>Setting up a Holochain conductor</h1><p>CRISPR uses the Holochain test framework Try-O-Rama to easily setup the DHTs and sample data is added by running the setup node files.</p><p>First you need package each of the DNAs. Open another nix-shell tab and cd into each of the dna folders and package:</p><ol><li><p><code>cd dna/freckles</code></p></li><li><p><code>yarn install</code></p></li><li><p><code>yarn hc:pacakge</code></p></li></ol><p>This will build the DNA file for each Application and Part used in Chimera. Once that is done there are setup scripts that configure </p><p>The files are located in the dna/demo folder. Open a Holochain nix-shell and follow these steps to run your conductor and add in data from mutliple players.</p><ol><li><p><code>cd dna/demo</code></p></li><li><p><code>yarn demo</code></p></li><li><p>Wait</p></li></ol><p>It takes a few minutes for Holochain to get settled, search the terminal for "Holochain settled ready to run setup data." When you get a result the conductors for the 6 players are ready. Leave Holochain to run while we add some data in a new terminal running the nix-shell.</p><ol><li><p><code>yarn demo:setup:phil</code></p></li><li><p><code>yarn demo:setup:philFreckles</code></p></li><li><p><code>yarn demo:setup:philOrigins</code></p></li><li><p><code>yarn demo:setup:rudy</code></p></li><li><p><code>yarn demo:setup:lucy</code></p></li><li><p><code>yarn demo:setup:grant</code></p></li><li><p><code>yarn demo:setup:arthur</code></p></li></ol><p>You will now have a working Holochain conductor and a separate node for each player.</p><p></p><p></p>'
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
        name: 'What is Chimera?',
        bubble: {
          value: {
            title: 'What is Chimera?',
            content: '<h1>Chimera is your personalised Holochain experience</h1><p>In Greek mythology, the Chimera was a creature composed of body parts from many other creatures. In biomimicry, we talk of a Chimera approach as a combination of different biomimetic designs into one application. Holochain is based on the ideas of biomimicry (DNA, Zomes, Cells etc) and composing your own Holochain experience from many other apps (parts). The app, Chimera, is an all in one Holochain experience designed to make it simple and fun to use Holochain Apps as well as compose your own from exisiting parts and build new ones by cloning existing parts.</p><p>If you cant find the feature you want to add you can use CRISPR to clone an. existing part into the one you want. Slice and dice DNA into whatever combinations you need. CRISPR is also a Holochain App and each project created runs its own separate DHT which gives you complete control over who can access the content of your projects using the permissions and validation features of Holochain. The IDE will also be making use of the git like source control features native to Holochain for teams to be able to work together using familiar branch and merge techniques.</p>'
          },
          schema: {
            title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
            content: { type: 'tiptap', label: 'Content', col: 12 }
          }
        },
        id: 'entryChimera',
        file: 'note'
      },
      {
        name: 'My Applications',
        children: [
          {
            name: 'Freckles',
            bubble: {
              value: {
                title: 'Super Secure Chat',
                content: '<p>Feel secure with your privacy using Freckles knowing that only the players in your group ever see what you share. No centrally controlled servers, no snooping and no advertising.</p>'
              },
              schema: {
                title: { type: 'text', label: 'Title', col: 12, class: 'display-1' },
                content: { type: 'tiptap', label: 'Content', col: 12 }
              }
            },
            id: 'entryFreckles',
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
            id: 'entryCRISPR',
            children: [
              {
                name: 'What is CRISPR?',
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
                name: 'Getting Started',
                bubble: {
                  value: {
                    title: 'Getting Started',
                    content: '<h1>Setting up a Holochain conductor</h1><p>CRISPR uses the Holochain test framework Try-O-Rama to easily setup the DHTs and sample data is added by running the setup node files.</p><p>First you need package each of the DNAs. Open another nix-shell tab and cd into each of the dna folders and package:</p><ol><li><p><code>cd dna/freckles</code></p></li><li><p><code>yarn install</code></p></li><li><p><code>yarn hc:pacakge</code></p></li></ol><p>This will build the DNA file for each Application and Part used in Chimera. Once that is done there are setup scripts that configure </p><p>The files are located in the dna/demo folder. Open a Holochain nix-shell and follow these steps to run your conductor and add in data from mutliple players.</p><ol><li><p><code>cd dna/demo</code></p></li><li><p><code>yarn demo</code></p></li><li><p>Wait</p></li></ol><p>It takes a few minutes for Holochain to get settled, search the terminal for "Holochain settled ready to run setup data." When you get a result the conductors for the 6 players are ready. Leave Holochain to run while we add some data in a new terminal running the nix-shell.</p><ol><li><p><code>yarn demo:setup:phil</code></p></li><li><p><code>yarn demo:setup:philFreckles</code></p></li><li><p><code>yarn demo:setup:philOrigins</code></p></li><li><p><code>yarn demo:setup:rudy</code></p></li><li><p><code>yarn demo:setup:lucy</code></p></li><li><p><code>yarn demo:setup:grant</code></p></li><li><p><code>yarn demo:setup:arthur</code></p></li></ol><p>You will now have a working Holochain conductor and a separate node for each player.</p><p></p><p></p>'
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
