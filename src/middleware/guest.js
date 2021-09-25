import store from '@/store'

export default async function guest ({ from, next }) {
  const homeRoute = { path: '/' }

  if (!store.getters['auth/authUser']) {
    await store.dispatch('auth/getAuthUser')
  }

  if (store.getters['auth/authUser']) {
    next(homeRoute)
    return
  }

  next()
}
