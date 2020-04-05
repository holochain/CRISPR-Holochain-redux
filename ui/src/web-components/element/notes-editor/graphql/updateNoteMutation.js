import gql from 'graphql-tag'

export default gql`
  mutation UpdateNote($id: String, $noteInput: NoteInput) {
    updateNote (id: $id, noteInput: $noteInput) {
      id
      createdAt
      title
      content
    }
  }
`
