<template>
  <v-card flat class="overflow-hidden" height="calc(100% - 100px)">
    <v-toolbar>
      <v-toolbar-title>{{this.hApp.name}} Zome</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
     <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="3">
          <v-card flat height="calc(100%-200px)" width="100%" class="pa-0 ma-0">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>Skins</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text>
                <v-icon>mdi-plus</v-icon>
                Item Skin
              </v-btn>
              <v-btn text>
                <v-icon>mdi-plus</v-icon>
                List Skin
              </v-btn>
            </v-toolbar>
            <v-row no-gutters>
              <v-col cols="12">
                <p class="display-1">There will be a selection of skins for items and lists here.</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="9">
          <module-container>
            <v-tabs v-model="tab" background-color="primary" dark height="64">
              <v-tab key="mock">
                Mock
              </v-tab>
              <v-tab key="live">
                Live
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item key="mock" class="skin">
                <p class="display-1">This view will use mock resolvers.</p>
                <notes-editor></notes-editor>
              </v-tab-item>
              <v-tab-item key="live" class="skin">
                <p class="display-1">This view will be connected to a running Holochain conductor.</p>
                <notes-editor></notes-editor>
              </v-tab-item>
            </v-tabs-items>
          </module-container>
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>

<script>
import { MicroOrchestrator } from '@uprtcl/micro-orchestrator'
import { ApolloClientModule } from '@uprtcl/graphql'
import {
  HolochainConnectionModule,
  HolochainConnection
} from '@uprtcl/holochain-provider'
import { NotesModule } from '../web-components/notes-module'
export default {
  name: 'ZomeSkin',
  props: ['hApp', 'zome'],
  data () {
    return {
      tab: null
    }
  },
  created () {
    const hcConnection = new HolochainConnection({
      host: 'ws://localhost:33000'
    })

    const hcModule = new HolochainConnectionModule(hcConnection);

    (async function () {
      const modules = [new ApolloClientModule(), hcModule, new NotesModule()]

      const orchestrator = new MicroOrchestrator()
      await orchestrator.loadModules(modules)
      console.log(orchestrator)
    })()
  }
}
</script>
<style>
.skin {
  background-color: #ffffff;
  color: black;
  overflow-y:auto;
}
</style>
