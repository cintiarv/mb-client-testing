import { gql } from '@apollo/client'

const mutations = {}

mutations.DELETE_LEAD = gql`
  mutation DeleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`

mutations.CREATE_LEAD = gql`
  mutation Mutation($data: ClientInput) {
    createClient(data: $data) {
      _id
      additionalComments
      address
      age
      birthDay
      category
      code
      email
      fullName
      gender
      nationality
      phone
      stateResident
      type
    }
  }
`

mutations.UPDATE_LEAD = gql`
  mutation Mutation($updateClientId: ID!, $data: ClientInput) {
    updateClient(id: $updateClientId, data: $data) {
      fullName
      additionalComments
      address
      age
      birthDay
      category
      code
      email
      gender
      nationality
      phone
      stateResident
      _id
    }
  }
`

export default mutations
