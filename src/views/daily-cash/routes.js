import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheDailyCash = () => import(
  /* webpackChunkName: "daily-cash" */
  './index/TheDailyCash'
)

const children = [
  {
    name: 'daily-cash.index',
    path: 'caixa-diario',
    component: TheDailyCash,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'daily-cash',
    path: '/',
    component: Layout,
    children
  }
]
