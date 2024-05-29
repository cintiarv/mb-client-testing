import gql from 'graphql-tag'

const subscriptions = {}

subscriptions.NEW_NOTIFICATION = gql`
  subscription addNotification{
    addNotification {
      _id
      date
      description
      title
    }
  }
`


export default subscriptions
