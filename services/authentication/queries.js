import gql from 'graphql-tag'

const queries = {}

queries.GET_USER_LOGGEDIN = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      email
      _id
    }
  }
`
queries.GET_USER_AUTHENTICATED = gql`
  query UserAuthenticated {
    userAuthenticated {
      _id
      email
    }
  }
`

export default queries
