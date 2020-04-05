import { MicroOrchestrator } from '@uprtcl/micro-orchestrator'
import { ApolloClientModule } from '@uprtcl/graphql'
import {
  HolochainConnectionModule,
  HolochainConnection
} from '@uprtcl/holochain-provider'
import { NotesModule } from './notes-module'

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
