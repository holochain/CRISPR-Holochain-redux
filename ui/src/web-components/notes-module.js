import { MicroModule } from '@uprtcl/micro-orchestrator'
import { HolochainConnectionModule } from '@uprtcl/holochain-provider'
import { NotesEditor } from './element/notes-editor'
import { GraphQlSchemaModule } from '@uprtcl/graphql'
import schema from './element/notes-editor/graphql/schema'
import resolvers from './element/notes-editor/graphql/resolvers'

export class NotesModule extends MicroModule {
  constructor () {
    super()
    this.submodules = [new GraphQlSchemaModule(schema, resolvers)]
    this.dependencies = [HolochainConnectionModule.id]
  }

  onLoad () {
    customElements.define('notes-editor', NotesEditor)
  }
}
