import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import authRoutes from '@/views/auth/routes'

Vue.use(VueRouter)

const routes = [
  ...authRoutes
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const authUser = store.getters['auth/authUser']
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loginQuery = { path: '/login', query: { redirect: to.fullPath } }

  if (requiresAuth && !authUser) {
    store.dispatch('auth/getAuthUser').then(() => {
      if (!store.getters(['auth/authUser'])) {
        next(loginQuery)
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
