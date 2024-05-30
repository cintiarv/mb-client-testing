import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import AuthenticateContext from '../../../contexts/AuthenticateContext'
import queries from '../../../services/authentication/queries'
import { useQuery } from '@apollo/client'
import { deleteToken, getToken } from '../../../lib/sessionStorage'

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    const { setUserAuth } = useContext(AuthenticateContext)
    const { error, data, refetch } = useQuery(queries.GET_USER_AUTHENTICATED)
    const router = useRouter()
    if (error) {
      deleteToken()
      router.push('/')
    }

    useEffect(() => {
      if (data?.userAuthenticated) {
        refetch()
        setUserAuth(data?.userAuthenticated)
        if (!getToken()) {
          setUserAuth({})
        }
      }
    }, [getToken])

    if (data?.userAuthenticated) {
      if (getToken()) {
        setUserAuth(data?.userAuthenticated)
      }
      if (!getToken()) {
        router.push('/')
        return null
      }
      return <WrappedComponent {...props} />
    }
  }
}
export default withAuth
