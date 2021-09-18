import axios from 'axios'
import store from '@/store'

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
})

client.interceptors.response.use(
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

export default client
