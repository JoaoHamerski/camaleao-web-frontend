import Layout from '@/views/Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { weeklyProduction } from '@/constants/route-names'

const TheWeeklyProduction = () => import(
  /* webpackChunkName: "weekly-production" */
  './index/TheWeeklyProduction'
)

const children = [
  {
    name: weeklyProduction.index,
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
