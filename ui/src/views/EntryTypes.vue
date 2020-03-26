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
        <entry-Type-builder folder='/Users/philipbeadle/eat-sleep-code-repeat/dashboard' zome="Websites" :entryType="entryType" @delete-entry-type="deleteEntryType"/>
      </v-col>
    </v-row>
    </v-content>
    <v-footer app>
      <span>Holochain</span>
    </v-footer>
  </v-card>
</template>

<script>
// import { dnas } from '../test-data/dnas.js'

export default {
  name: 'EntryTypes',
  components: {
    EntryTypeBuilder: () => import('../components/EntryTypeBuilder')
  },
  data () {
    return {
      newEntryType: {
        name: 'new-entry-type',
        fields: []
      },
      entryTypes: [
        {
          name: 'Site',
          fields: [
            {
              fieldName: 'domain',
              fieldType: 'String',
              test: {
                create: 'philt3r.rocks',
                update: 'updated'
              }
            },
            {
              fieldName: 'player',
              fieldType: 'String',
              test: {
                create: 'Philip Beadle',
                update: 'Updated'
              }
            },
            {
              fieldName: 'mobile',
              fieldType: 'String',
              test: {
                create: '0000000000',
                update: '1111111111'
              }
            }
          ]
        }
      ]
    }
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
  }
}
</script>
