import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/middleware/auth'
import middlewarePipeline from '@/router/middlewarePipeline'
import store from '@/store'
import roles from '@/constants/roles'
import { flatMap } from 'lodash-es'

import ErrorNotFound from '@/views/_errors/ErrorNotFound.vue'

Vue.use(VueRouter)

const routes = import.meta.glob('../views/**/routes.js', {
  eager: true,
  import: 'default'
})

const NOT_FOUND_ROUTE = {
  path: '/:pathMatch(.*)*',
  component: ErrorNotFound
}

const STARTING_ROUTE = {
  path: '/',
  meta: {
    middleware: [auth]
  },
  beforeEnter: async (to, from, next) => {
    next(getStartingRoute())
  }
}

const isUserFromProduction = (user) => {
  const productionRoles = [roles.ESTAMPA, roles.COSTURA]

  return productionRoles.includes(+user.role.id)
}

const isUserFromDesign = (user) => roles.DESIGN === +user.role.id
const isUserFromGerencia = (user) => roles.GERENCIA === +user.role.id


const getStartingRoute = () => {
  const authUser = store.getters['auth/authUser']

  return {name: 'dashboard.index'}
  // if (isUserFromProduction(authUser)) {
  //   return {name: 'production.index'}
  // }

  // if (isUserFromDesign(authUser)) {
  //   return {name: 'weekly-calendar.print.index'}
  // }


}

const router = new VueRouter({
  mode: 'history',
  routes: [
    STARTING_ROUTE,
    ...flatMap(routes),
    NOT_FOUND_ROUTE
  ]
})

router.beforeEach((to, from, next) => {
  const { middleware, roles } = to.meta
  const context = { from, next, roles }

  if (store.state.error !== null) {
    store.commit('SET_ERROR', null)
  }

  store.commit('SET_IS_PAGE_LOADING', true)

  if (!middleware) {
    return next()
  }

  middleware[0](
    middlewarePipeline(context, middleware, 1)
  )
})

router.beforeResolve((to, from, next) => {
  store.commit('SET_IS_PAGE_LOADING', false)
  next()
})

export default router
