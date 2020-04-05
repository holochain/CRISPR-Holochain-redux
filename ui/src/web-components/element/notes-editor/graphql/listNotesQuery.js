import gql from 'graphql-tag'

export default gql`
  query ListNotes {
    listNotes {
      id
      createdAt
      title
      content
    }
  }
`
