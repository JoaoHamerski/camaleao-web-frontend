import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'

import authRoutes from '@/views/auth/routes'
import clientsRoutes from '@/views/clients/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      middleware: [auth]
    },
    beforeEnter: (to, from, next) => next('/clientes')
  },
  ...authRoutes,
  ...clientsRoutes
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const { middleware, roles } = to.meta
  const context = { from, next, roles }

  if (!middleware) {
    return next()
  }

  middleware[0](
    middlewarePipeline(context, middleware, 1)
  )
})

export default router
