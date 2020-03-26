<template>
  <v-card fluid>
    <v-app-bar app clipped-left absolute>
      <v-toolbar>
        <v-toolbar-title>Zomes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="addZome">
          <v-icon>mdi-plus</v-icon>
          Zome
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-content>
    <v-row>
      <v-col v-for="(zome) in zomes" :key="zome.id" cols="12">
        <zome :zome="zome" @delete-zome="deleteZome"/>
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
  name: 'Zomes',
  components: {
    Zome: () => import('../components/Zome')
  },
  data () {
    return {
      newZome: {
        id: '',
        name: '',
        entryTypes: []
      },
      zomes: [
        {
          id: 'Qmmorehasshes',
          name: 'websites',
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
      ]
    }
  },
  methods: {
    addZome: function () {
      console.log('Add New Zome')
      this.zomes.push(this.newZome)
    },
    deleteZome: function (zome) {
      console.log('Delete Entry Type')
      const zomeId = zome.id
      this.zomes = this.zomes.filter(function (zome) {
        return zome.id !== zomeId
      })
    }
  }
}
</script>
