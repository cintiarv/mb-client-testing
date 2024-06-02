import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from './sessionStorage'


const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_URL_BACKEND,
  })


  const authLink = setContext((_, { headers }) => {
    //get the authentication token from local storage if it exists
    const token = getToken()

    //return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token || ''
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

export default createApolloClient
