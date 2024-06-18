import { gql } from '@apollo/client'

const mutations = {}

mutations.LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`

export default mutations
