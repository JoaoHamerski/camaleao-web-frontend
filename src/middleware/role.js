import store from '@/store'

const authHasRole = (allowedRoles) => {
  return allowedRoles.includes(
    store.getters['auth/authUser'].role.id
  )
}

export default async function role (context) {
  const loginRoute = { path: '/entrar' }

  if (!store.getters['auth/authUser']) {
    await store.dispatch('auth/getAuthUser')
  }

  if (!store.getters['auth/authUser']) {
    context.next(loginRoute)
    return
  }

  if (!authHasRole(context.roles)) {
    console.error('SEM PERMISSÃO PARA ACESSO')
    return
  }

  context.next()
}
