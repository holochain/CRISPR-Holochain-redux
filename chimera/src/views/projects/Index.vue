<template>
  <section>
    <v-toolbar flat>
      <v-btn icon  @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">CRISPR</span>
      <v-spacer></v-spacer>
      <v-btn color="action" icon @click="help=!help">
        <v-icon>mdi-help</v-icon>
      </v-btn>
    </v-toolbar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="text--primary">
            Holochain CRISPR makes it easy to edit your DNA by changing the fields in your entries, the DNA pattern and the permissions for who can add, edit and delete entries. Holochain is based on Biomimicry and like CRISPR Cas9 genetic editing Holochain CRISPR Cas enables editing of Holochain DNA.
          </div>
        </v-col>
      </v-row>
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12">
        <projects :instance="instance" base="Applications" title="Application Projects"/>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <projects :instance="instance" base="Parts" title="Part Projects" :cloneable="true" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'AllProjects',
  components: {
    Projects: () => import('@/components/parts/Projects/Projects.vue')
  },
  data () {
    return {
      help: false,
      instance: { zome: 'projects', type: 'project', instanceId: 'ef5ba968-0048-4135-b831-a86b615a89b2', partBase: '', instanceName: 'Holochain Projects' }
    }
  }
}
</script>
