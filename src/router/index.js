import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'
import store from '@/store'
import roles from '@/constants/roles'

import TheTest from '@/views/TheTest'

import authRoutes from '@/views/auth/routes'
import clientsRoutes from '@/views/clients/routes'
import ordersRoutes from '@/views/orders/routes'
import dailyCashRoutes from '@/views/daily-cash/routes'
import cashFlowRoutes from '@/views/cash-flow/routes'
import expensesRoutes from '@/views/expenses/routes'
import usersRoutes from '@/views/users/routes'
import citiesRoutes from '@/views/cities/routes'
import branchesRoutes from '@/views/branches/routes'
import clothingTypesRoutes from '@/views/clothing-types/routes'
import productionRoutes from '@/views/production/routes'
import productionUsersRoutes from '@/views/production-users/routes'
import myAccountRoutes from '@/views/my-account/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      middleware: [auth]
    },
    beforeEnter: async (to, from, next) => {
      const authUser = store.getters['auth/authUser']

      if ([roles.ESTAMPA, roles.COSTURA].includes(+authUser.role.id)) {
        next('/producao')
        return
      }

      next('/clientes')
    }
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
  ...expensesRoutes,
  ...usersRoutes,
  ...citiesRoutes,
  ...branchesRoutes,
  ...clothingTypesRoutes,
  ...productionRoutes,
  ...productionUsersRoutes,
  ...myAccountRoutes
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
