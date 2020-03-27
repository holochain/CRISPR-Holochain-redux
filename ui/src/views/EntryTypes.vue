<template>
  <v-card fluid>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>Entry Types</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="addEntryType">
          <v-icon>mdi-plus</v-icon>
          Entry Type
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row>
      <v-col v-for="(entryType) in entryTypes" :key="entryType.name" cols="12">
        <entry-Type-builder :folder="hApps[0].folder" :zome="hApps[0].zomes[0].name" :entryType="hApps[0].zomes[0].entryTypes[0]" @delete-entry-type="deleteEntryType"/>
      </v-col>
    </v-row>
    </v-content>
    <v-footer app>
      <span>Holochain</span>
    </v-footer>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EntryTypes',
  components: {
    EntryTypeBuilder: () => import('../components/EntryTypeBuilder')
  },
  methods: {
    addEntryType: function () {
      console.log('Add New Entry Type')
      this.entryTypes.push(this.newEntryType)
    },
    deleteEntryType: function (entryType) {
      console.log('Delete Entry Type')
      const entryTypeName = entryType.name
      this.entryTypes = this.entryTypes.filter(function (entryType) {
        return entryType.name !== entryTypeName
      })
    }
  },
  computed: {
    ...mapState('app', ['hApps'])
  }
}
</script>
