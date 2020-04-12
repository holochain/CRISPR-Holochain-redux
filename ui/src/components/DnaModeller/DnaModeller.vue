<template>
  <v-card flat height="100vh">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Zome Models</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="loadZome(0)">
        Zome 1
      </v-btn>
      <v-btn @click="loadZome(1)">
        Zome 2
      </v-btn>
      <v-btn @click="loadZome(2)">
        Zome 3
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12">
          <zome-modeller :zome="zome" :key="zome.id"/>
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>
<script>
import { zomes } from '../../store/zome.js'
export default {
  name: 'DnaModeller',
  components: {
    ZomeModeller: () => import('./ZomeModeller')
  },
  data () {
    return {
      zomeTab: null,
      zomes: zomes,
      zome: zomes[0]
    }
  },
  methods: {
    loadZome (index) {
      this.zome = this.zomes[index]
    }
  }
}
</script>
