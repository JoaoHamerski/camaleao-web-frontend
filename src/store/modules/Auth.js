import AuthService from '@/services/AuthService'
import router from '@/router'

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
  async logout ({ commit, dispatch }) {
    try {
      await AuthService.logout()
      commit('SET_USER', null)
      dispatch('setGuest', { value: 'isGuest' })

      if (router.currentRoute.name !== 'login') {
        router.push({ path: 'entrar' })
      }
    } catch (error) {
      console.error(error)
    }
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
