import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { dailyCash } from '@/constants/route-names'

const TheDailyCash = () => import(
  /* webpackChunkName: "daily-cash" */
  './index/TheDailyCash'
)

const children = [
  {
    name: dailyCash.index,
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
