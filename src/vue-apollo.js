import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient, createHttpLink } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import possibleTypes from './fragmentTypes.json'

Vue.use(VueApollo)

const AUTH_TOKEN_NAME = 'auth-token'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const cache = new InMemoryCache({ possibleTypes })

const defaultOptions = {
  link: authLink.concat(httpLink),
  cache
}

export const createApolloClient = () => ({
  apolloClient: new ApolloClient({ ...defaultOptions })
})

export const apolloClientInstance = createApolloClient()

export function createProvider (options = {}) {
  const { apolloClient } = apolloClientInstance

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    }
  })

  return apolloProvider
}

export async function onLogin (apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN_NAME, token)
  }

  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_NAME)
  }

  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
