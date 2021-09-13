import axios from 'axios'
import store from '@/store'

export const authClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
})

authClient.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response
      && [401, 419].includes(error.response.status)
      && store.getters['auth/authUser']
      && !store.getters['auth/guest']
    ) {
      store.dispatch('auth/logout')
    }

    return Promise.reject(error)
  })

export default {
  async login (payload) {
    await authClient.get('/api/csrf-cookie')

    return authClient.post('/login', payload)
  },
  logout () {
    return authClient.post('/logout')
  },
  getAuthUser () {
    return authClient.get('/api/users/auth')
  }
}
