import { HolochainConnectionModule } from '@uprtcl/holochain-provider'

export const resolvers = {
  Query: {
    listNotes: async (_1, _2, { container }) => {
      return await container
        .get(HolochainConnectionModule.bindings.HolochainConnection)
        .call('notes', 'notes', 'list_notes', {})
    }
  },
  Mutation: {
    createNote: async (_, { noteInput }, { container }) => {
      return await container
        .get(HolochainConnectionModule.bindings.HolochainConnection)
        .call('notes', 'notes', 'create_note', { note_input: { title: noteInput.title, content: noteInput.content } })
    },
    updateNote: async (_, { id, noteInput }, { container }) => {
      return await container
        .get(HolochainConnectionModule.bindings.HolochainConnection)
        .call('notes', 'notes', 'update_note', { id: id, note_input: { title: noteInput.title, content: noteInput.content } })
    },
    removeNote: async (_, { id }, { container }) => {
      return await container
        .get(HolochainConnectionModule.bindings.HolochainConnection)
        .call('notes', 'notes', 'remove_note', { id: id })
    }
  }
}

export default resolvers
