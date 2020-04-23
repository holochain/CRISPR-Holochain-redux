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
      <v-btn color="action" icon :to="`/project/${project.id}`">
        <v-icon>mdi-code-braces</v-icon>
      </v-btn>
      <v-btn color="action" icon href="http://localhost:8080" target="_blank">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn color="action" icon>
        <v-icon>mdi-publish</v-icon>
      </v-btn>
      <v-btn color="action" icon>
        <v-icon>mdi-notebook-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'HolochainProject',
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
    }
  }
}
</script>
