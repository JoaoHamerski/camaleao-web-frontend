import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'

import TheTest from '@/views/TheTest'

import authRoutes from '@/views/auth/routes'
import clientsRoutes from '@/views/clients/routes'
import ordersRoutes from '@/views/orders/routes'
import dailyCashRoutes from '@/views/daily-cash/routes'
import cashFlowRoutes from '@/views/cash-flow/routes'
import expensesRoutes from '@/views/expenses/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      middleware: [auth]
    },
    beforeEnter: (to, from, next) => next('/clientes')
  },
  {
    path: '/testes',
    component: TheTest
  },
  ...authRoutes,
  ...clientsRoutes,
  ...ordersRoutes,
  ...dailyCashRoutes,
  ...cashFlowRoutes,
  ...expensesRoutes
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
