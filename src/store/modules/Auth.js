import AuthService from '@/services/AuthService'
import router from '@/router'
import { getError } from '@/utils/helpers'

export const namespaced = true

export const state = {
  user: null,
  loading: false,
  error: null
}

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}
export const actions = {
  async bootstrap () {
    // const authUser = await AuthService.getAuthUser()
  },
  logout ({ commit, dispatch }) {
    return AuthService.logout()
      .then(() => {
        commit('SET_USER', null)
        dispatch('setGuest', { value: 'isGuest' })

        if (router.currentRoute.name !== 'login') {
          router.push({ path: 'login' })
        }
      })
      .catch(error => {
        commit('SET_ERROR', getError(error))
      })
  },
  async getAuthUser ({ commit }) {
    try {
      const { data } = await AuthService.getAuthUser()

      commit('SET_USER', data.data)

      return data.data
    } catch (error) {
      console.error(error)
    }
  },
  setGuest (context, { value }) {
    window.localStorage.setItem('guest', value)
  }
}

export const getters = {
  authUser: (state) => {
    return state.user
  },
  loading: (state) => {
    return state.loading
  },
  loggedIn: (state) => {
    return !!state.user
  },
  guest: () => {
    const storageItem = window.localStorage.getItem('guest')
    if (!storageItem) {
      return false
    }

    if (storageItem === 'isGuest') {
      return true
    }

    if (storageItem === 'isNotGuest') {
      return false
    }
  }
}
