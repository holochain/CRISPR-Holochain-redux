import gql from 'graphql-tag'

export default gql`

type Note {
  id: ID
  createdAt: String
  title: String
  content: String
}

input NoteInput {
  title: String
  content: String
}

extend type Query {
  getNote(id: String): Note
  listNotes: [Note]
}

extend type Mutation {
  createNote(noteInput: NoteInput): Note
  updateNote(id: String, noteInput: NoteInput): Note
  removeNote(id: String): Note
}
`
