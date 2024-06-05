/* import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_URL_BACKEND,
  cache: new InMemoryCache()
})

export default client */


//SEGUNDO INTENTO
/* import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from './sessionStorage'


const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_URL_BACKEND,
  })


  const authLink = setContext((_, { headers }) => {
    console.log("🚀 ~ authLink ~ headers:", headers)
    //get the authentication token from local storage if it exists
    const token = getToken()
    console.log('tokennnnn :>> ', token);
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
  return client
}

export default createApolloClient
 */

//TERCER INTENTO
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from './sessionStorage'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_URL_BACKEND,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: getToken() || ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client