import client from '@/request'

export default {
  async login (payload) {
    await client.get('/api/csrf-cookie')

    return client.post('/login', payload)
  },
  logout () {
    return client.post('/logout')
  },
  getAuthUser () {
    return client.get('/api/users/auth')
  }
}
