import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { expenses } from '@/constants/route-names'

const TheExpenses = () => import(
  /* webpackChunkName: "expenses" */
  /* webpackPrefetch: true */
  './index/TheExpenses.vue'
)

const children = [
  {
    name: expenses.index,
    path: 'despesas',
    component: TheExpenses,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'expenses',
    path: '/',
    component: Layout,
    children
  }
]
