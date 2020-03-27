<template>
  <v-card fluid>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>Anchors</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="addAnchor">
          <v-icon>mdi-plus</v-icon>
          Anchor
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row>
      <v-col v-for="(anchor) in anchors" :key="anchor.id" cols="12">
        <anchor :anchor="anchor" @delete-anchor="deleteAnchor"/>
      </v-col>
    </v-row>
    </v-content>
    <v-footer app>
      <span>Holochain</span>
    </v-footer>
  </v-card>
</template>

<script>
export default {
  name: 'Anchors',
  components: {
    Anchor: () => import('../components/Ancor')
  },
  data () {
    return {
      newAnchor: {
        id: '',
        name: '',
        entryTypes: []
      }

    }
  },
  methods: {
    addAnchor: function () {
      console.log('Add New Anchor')
      this.anchors.push(this.newAnchor)
    },
    deleteAnchor: function (anchor) {
      console.log('Delete Entry Type')
      const anchorId = anchor.id
      this.anchors = this.anchors.filter(function (anchor) {
        return anchor.id !== anchorId
      })
    }
  }
}
</script>
