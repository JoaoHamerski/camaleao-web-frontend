import store from '@/store'

const LOGIN_ROUTE = {
  path: '/entrar'
}

export default async function auth ({ next }) {
  if (!store.getters['auth/authUser']) {
    await store.dispatch('auth/getAuthUser')
  }

  if (!store.getters['auth/authUser']) {
    next(LOGIN_ROUTE)
    return
  }

  next()
}
