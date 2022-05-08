import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import MainTemplate from '../components/templates/MainTemplate'
import { apolloClient } from '../services/apolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <MainTemplate>
        <Component {...pageProps} />
      </MainTemplate>
    </ApolloProvider>
  )
}

export default MyApp
