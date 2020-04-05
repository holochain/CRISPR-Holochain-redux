import gql from 'graphql-tag'

export default gql`
  mutation RemoveNote($id: String) {
    removeNote (id: $id) {
      id
      createdAt
      title
      content
    }
  }
`
