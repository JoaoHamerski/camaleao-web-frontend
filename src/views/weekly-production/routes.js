import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheWeeklyProduction = () => import(
  /* webpackChunkName: "weekly-production" */
  './index/TheWeeklyProduction'
)

const children = [
  {
    name: 'weekly-production.index',
    path: '/producao-semanal',
    component: TheWeeklyProduction,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA, roles.ATENDIMENTO]
    }
  }
]

export default [
  {
    name: 'weekly-production',
    path: '/',
    component: Layout,
    children
  }
]
