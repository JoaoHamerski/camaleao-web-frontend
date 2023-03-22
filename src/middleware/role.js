import store from '@/store'

const LOGIN_ROUTE = {
  path: '/entrar'
}

const authHasRole = (allowedRoles) => {
  const authUser = store.getters['auth/authUser']

  return allowedRoles.includes(
    +authUser.role.id
  )
}

export default async function role (context) {
  if (!store.getters['auth/authUser']) {
    await store.dispatch('auth/getAuthUser')
  }

  if (!store.getters['auth/authUser']) {
    context.next(LOGIN_ROUTE)
    return
  }

  if (!authHasRole(context.roles)) {
    // eslint-disable-next-line no-console
    store.commit('SET_ERROR', 403)
    return
  }

  context.next()
}
