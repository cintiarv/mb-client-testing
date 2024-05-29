import { gql } from '@apollo/client'

const mutations = {}

mutations.DELETE_NOTIFICATION = gql`
mutation DeleteNotif($deleteNotificationId: ID!, $userCurrent: ID!) {
	deleteNotification(
		id: $deleteNotificationId,
		userCurrent: $userCurrent
		)
}
`

export default mutations
