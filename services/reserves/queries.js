import gql from 'graphql-tag'

const queries = {}

queries.GET_ALL_RESERVES = gql`
  query getReserves {
    reserves {
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

queries.GET_RESERVE_BY_ID = gql`
  query Query($clientId: ID) {
    reserve(id: $reserveId) {
      _id
      email
      name
      password
      phone
    }
  }
`
export default queries
