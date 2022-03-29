import store from '@/store'

const HOME_ROUTE = {
  path: '/'
}

export default async function guest ({ from, next }) {
  if (!store.getters['auth/authUser']) {
    await store.dispatch('auth/getAuthUser')
  }

  if (store.getters['auth/authUser']) {
    next(HOME_ROUTE)
    return
  }

  next()
}
