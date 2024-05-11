import gql from 'graphql-tag'

const queries = {}

queries.GET_ALL_USERS = gql`
  query getUsers {
    users {
      _id
      email
      location
      name
      password
      routes {
        _id
        slug
      }
    }
  }
`

queries.GET_USER_BY_ID = gql`
  query Query($clientId: ID) {
    user(id: $userId) {
      _id
      email
      name
      password
      phone
    }
  }
`
export default queries
