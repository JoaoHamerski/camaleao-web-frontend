import {
  apolloClientInstance,
  onLogin,
  onLogout
} from '@/vue-apollo'

import { authUser, login } from '@/graphql/Auth.gql'

import router from '@/router'

export const namespaced = true

const { apolloClient } = apolloClientInstance

const ON_LOGIN_ROUTE = {
  path: '/'
}

const ON_LOGOUT_ROUTE = {
  path: '/entrar'
}

export const state = {
  user: null,
  error: null
}

export const getters = {
  authUser: (state) => {
    return state.user
  },
  loggedIn: (state) => {
    return !!state.user
  }
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  async login ({ commit, dispatch }, payload) {
    const { credentials } = payload

    const data = await apolloClient.mutate({
      mutation: login,
      variables: credentials
    })

    const token = data.data.login.token

    await onLogin(apolloClient, token)

    router.push(ON_LOGIN_ROUTE)
  },
  async logout ({ getters, commit, dispatch }) {
    try {
      await commit('SET_USER', null)

      await onLogout(apolloClient)

      if (router.currentRoute.name !== 'login') {
        router.push(ON_LOGOUT_ROUTE)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.response)
    }
  },
  async getAuthUser ({ commit }) {
    try {
      const data = await apolloClient.query({
        query: authUser
      })

      commit('SET_USER', data.data.authUser)

      return data.data.authUser
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}
