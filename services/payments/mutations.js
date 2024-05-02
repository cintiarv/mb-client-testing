import { gql } from '@apollo/client'

const mutations = {}

mutations.DELETE_PAYMENT = gql`
  mutation DeletePayment($deletePaymentId: ID!) {
    deletePayment(id: $deletePaymentId)
  }
`

mutations.CREATE_PAYMENT = gql`
  mutation createPayment($data: PaymentInput) {
    createPayment(data: $data) {
      paymentMethod
      amount
      reserve{
        _id
      }
    }
  }
`

mutations.UPDATE_PAYMENT = gql`
  mutation Mutation($updatePaymentId: ID!, $data: PaymentInput) {
    updatePayment(id: $updatePaymentId, data: $data) {
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
