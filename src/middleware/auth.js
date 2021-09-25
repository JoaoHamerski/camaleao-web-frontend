import store from '@/store'

export default async function auth ({ next }) {
  const loginRoute = { path: '/entrar' }

  if (!store.getters['auth/authUser']) {
    await store.dispatch('auth/getAuthUser')
  }

  if (!store.getters['auth/authUser']) {
    next(loginRoute)
    return
  }

  next()
}
