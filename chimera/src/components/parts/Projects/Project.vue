<template>
  <v-card class="ma-5" dark min-width="200" max-width="500" elevation="5">
    <router-link icon v-if="project.happId" :to="`/store/${project.type}/${project.happId}`">
      <v-img class="white--text align-end" min-width="200" max-width="500" contain :src="project.preview">
        <v-card-title class="text-no-wrap">{{ project.name }}</v-card-title>
      </v-img>
    </router-link>
    <v-img v-else class="white--text align-end" width="300" :src="project.preview">
      <v-card-title class="text-no-wrap">{{ project.name }}</v-card-title>
    </v-img>
    <div v-if="details">
      <v-card-text>
        <div class="text--primary">
          {{ project.description.substring(0, 90) }}...
        </div>
      </v-card-text>
    </div>
    <v-divider />
    <v-card-actions>
      <v-btn color="action" icon :to="`/projectKanban/${instance.instanceId}/${base}/${project.id}`">
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
      <v-btn v-if="showPartEditor" color="action" icon :to="`/part/${instance.instanceId}/${base}/${project.id}`">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn color="action" icon :to="`/project/${instance.instanceId}/${base}/${project.id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HolochainProject',
  components: {
    // VImageInput
  },
  data () {
    return {
      cloningDialog: false,
      publishDialog: false
    }
  },
  props: {
    instance: {
      type: Object
    },
    base: {
      type: String
    },
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
    },
    showPartEditor: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('auth', ['developer'])
  }
}
</script>
