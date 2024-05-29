import { gql } from '@apollo/client'

const mutations = {}

mutations.LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`

mutations.RECOVERY_PASSWORD = gql`
  mutation SenEmailToRecoveryAccount($email: String!, $typeUser: String!) {
    senEmailToRecoveryAccount(email: $email, typeUser: $typeUser)
  }
`

mutations.RESET_PASSWORD = gql`
  mutation ResetPassword($data: PasswordResetInput!) {
    resetPassword(data: $data)
  }
`

export default mutations
