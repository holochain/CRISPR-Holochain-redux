<template>
  <v-card class="ma-5">
    <v-img class="white--text align-end" width="300" :src="require(`@/assets/projects/${project.name}/preview.png`)">
      <v-card-title class="text-no-wrap">{{ project.name }}</v-card-title>
    </v-img>
    <div v-if="details">
      <v-card-subtitle class="pb-0">
        {{ project.contact }}
      </v-card-subtitle>
      <v-card-subtitle class="pb-0">
        {{ project.mobile }}
      </v-card-subtitle>
      <v-card-text>
        <div class="text--primary">
          {{ project.description.substring(0, 90) }}...
        </div>
      </v-card-text>
    </div>
    <v-divider />
    <v-card-actions>
      <v-btn color="action" icon :to="`/projectKanban/${project.id}`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/part/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/${project.id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
      <v-btn color="alert" icon @click="cloningDialog = true">
        <v-icon>mdi-dna</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="cloningDialog" max-width="700px">
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title class="display-1">Let's clone - {{project.name}}</v-toolbar-title>
        </v-toolbar>
        <v-card-subtitle>(This feature is incomplete at this time)</v-card-subtitle>
        <v-row no-gutters align="start" justify="center">
          <v-col cols="12">
            <v-text-field class="ml-2 white--text" v-model="clone.name" label="Name" :hint="`A plural such as ${project.name} or Notes`" />
            <v-textarea class="ml-2 white--text" v-model="clone.description" label="Description" hint="What new characteristics are you giving your clone?" />
            <v-text-field class="ml-2 white--text" v-if="clone.zomes[0]" v-model="clone.zomes[0].name" label="Name" :hint="`A plural such as ${project.name} or Notes`" />
            <v-text-field class="ml-2 white--text" v-if="clone.zomes[0]" v-model="clone.zomes[0].entryTypes[0].name" label="Name" :hint="`A plural such as ${project.name} or Notes`" />
            {{clone}}
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="addProject(projectEntry); cloningDialog = false">
            Clone
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HolochainProject',
  data () {
    return {
      cloningDialog: false,
      publishDialog: false,
      projectEntry: {
        id: 'Qmmorebigeventhashes333',
        name: 'Events',
        type: 'application',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Synchronise your events with all of your networks.',
        zomes: [
          {
            template: 'Origins',
            templateTypeName: 'origin',
            itemsTemplatesName: 'template1',
            name: 'Events',
            entryTypes: [
              {
                id: 'QmEventEntryTypeHash',
                name: 'event',
                template: 'list_anchor_types_1',
                fields: [
                  {
                    id: 'QM234566777887',
                    fieldName: 'content',
                    fieldType: 'String',
                    fieldDescription: 'Main body of the event',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_events1',
                type: 'list_events',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmEventEntryTypeHash',
                    type: 'event_link',
                    tag: 'created_at',
                    context: 'exclusive'
                  }
                ],
                anchors: []
              }
            ],
            profileSpec: {
              id: 'QmEventProfileSpecHash',
              template: 'identify',
              fields: []
            }
          }
        ]
      }
    }
  },
  props: {
    project: {
      type: Object,
      default: function () {
        return {
          id: '0',
          domain: 'escr',
          player: 'Philip Beadle',
          mobile: '0417301024'
        }
      }
    },
    clone: {
      type: Object,
      default: function () {
        const project = JSON.parse(JSON.stringify(this.project))
        project.id = 'new'
        return project
      }
    },
    details: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions('projects', ['addProject']),
    insertProjectEntry (projectEntry) {
      alert(JSON.stringify(projectEntry))
    }
  }
}
</script>
