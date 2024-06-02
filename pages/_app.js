import { ApolloProvider } from '@apollo/client'
import { AuthenticateProvider } from '../contexts/AuthenticateContext'
import { SocketProvider } from '../contexts/SocketContext'
import createApolloClient from '../lib/apollo'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient}>
      <AuthenticateProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </AuthenticateProvider>
    </ApolloProvider>
  )
}

export default MyApp
