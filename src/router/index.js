import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'
import store from '@/store'
import roles from '@/constants/roles'

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
import weeklyProductionRoutes from '@/views/weekly-calendar/routes'
import activitiesRoutes from '@/views/activities/routes'
import statusRoutes from '@/views/status/routes'
import orderControlRoutes from '@/views/order-control/routes'
import sectoresRoutes from '@/views/sectors/routes'
import bankEntriesRoutes from '@/views/bank-entries/routes'
import entriesRoutes from '@/views/entries/routes'
import receiptGeneratorRoutes from '@/views/receipt-generator/routes'

import ErrorNotFound from '@/views/_errors/ErrorNotFound.vue'

Vue.use(VueRouter)

const isUserFromProduction = (user) => {
  const productionRoles = [roles.ESTAMPA, roles.COSTURA]

  return productionRoles.includes(+user.role.id)
}

const isUserFromDesign = (user) => {
  return roles.DESIGN === +user.role.id
}

const routes = [
  {
    path: '/',
    meta: {
      middleware: [auth]
    },
    beforeEnter: async (to, from, next) => {
      const authUser = store.getters['auth/authUser']

      if (isUserFromProduction(authUser)) {
        next({name: 'production.index'})
        return
      }

      if (isUserFromDesign(authUser)) {
        next({name: 'weekly-calendar.print.index'})
        return
      }

      next({name: 'clients.index'})
    }
  },
  ...activitiesRoutes,
  ...authRoutes,
  ...branchesRoutes,
  ...cashFlowRoutes,
  ...citiesRoutes,
  ...clientsRoutes,
  ...clothingTypesRoutes,
  ...dailyCashRoutes,
  ...expensesRoutes,
  ...myAccountRoutes,
  ...ordersRoutes,
  ...productionRoutes,
  ...productionUsersRoutes,
  ...usersRoutes,
  ...weeklyProductionRoutes,
  ...statusRoutes,
  ...orderControlRoutes,
  ...sectoresRoutes,
  ...bankEntriesRoutes,
  ...entriesRoutes,
  // ...receiptGeneratorRoutes
]

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/testes',
    component: () => import('@/views/TheTest')
  })
}

routes.push({
  path: '/:pathMatch(.*)*', component: ErrorNotFound
})

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const { middleware, roles } = to.meta
  const context = { from, next, roles }

  store.commit('SET_ERROR', null)

  if (!middleware) {
    return next()
  }

  middleware[0](
    middlewarePipeline(context, middleware, 1)
  )
})

export default router
