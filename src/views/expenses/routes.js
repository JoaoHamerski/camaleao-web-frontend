import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { expenses } from '@/constants/route-names'

import TheExpenses from './index/TheExpenses'

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
