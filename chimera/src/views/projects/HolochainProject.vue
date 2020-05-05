<template>
  <v-card class="ma-5">
    <v-img class="white--text align-end" height="350" :src="require(`@/assets/projects/${project.name}/preview.png`)">
      <v-card-title>{{ project.name }}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">
      {{ project.contact }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-0">
      {{ project.mobile }}
    </v-card-subtitle>
     <v-card-text>
      <div class="text--primary">
        {{ project.description }}
      </div>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn color="action" icon :to="`/partNotes/${project.id}`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/part/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/${project.id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
      <v-btn color="action" icon @click="publishDialog = true">
        <v-icon>mdi-publish</v-icon>
      </v-btn>
      <v-btn color="alert" icon @click="cloningDialog = true">
        <v-icon>mdi-dna</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="publishDialog" max-width="700px">
      <v-card flat>
        <v-toolbar dark>
          <v-toolbar-title class="display-1">Publish {{project.name}} to the Store</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-subtitle>(This feature is incomplete at this time)</v-card-subtitle>
        <v-content>
          When your part is ready publish it to the Parts Store.
        </v-content>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="publishDialog = false">
            Publish
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="action darken-1" text @click="cloningDialog = false">
            Clone
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'HolochainProject',
  data () {
    return {
      cloningDialog: false,
      publishDialog: false
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
        return {
          name: '',
          description: ''
        }
      }
    }
  }
}
</script>
