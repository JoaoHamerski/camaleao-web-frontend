import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

import TheExpenses from './index/TheExpenses'

const children = [
  {
    name: 'expenses.index',
    path: 'depesas',
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
