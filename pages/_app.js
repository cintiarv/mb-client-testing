import { ApolloProvider } from '@apollo/client'
import { AuthenticateProvider } from '../contexts/AuthenticateContext'
import { SocketProvider } from '../contexts/SocketContext'
import client from '../lib/apollo'
import 'tailwindcss/tailwind.css'

function MyApp ({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthenticateProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </AuthenticateProvider>
    </ApolloProvider>
  )
}

export default MyApp
