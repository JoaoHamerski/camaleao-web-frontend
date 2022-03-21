import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloClient } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'

Vue.use(VueApollo)

const AUTH_TOKEN = 'auth-token'

const cache = new InMemoryCache()

const options = {
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  cache,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}` || ''
  }
}

export const createApolloClient = () => ({
  apolloClient: new ApolloClient(options)
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
    localStorage.setItem(AUTH_TOKEN, token)
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
    localStorage.removeItem(AUTH_TOKEN)
  }

  // if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)

  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}
