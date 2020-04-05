<template>
  <v-card flat class="mx-auto" height="calc(100% - 100px)">
    <v-toolbar>
      <v-toolbar-title>{{this.hApp.name}} Zome</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
     <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12" class="skin">
          <module-container>
            <notes-editor></notes-editor>
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
}
</style>
