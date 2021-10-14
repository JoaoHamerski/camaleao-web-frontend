import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

import TheOrder from './show/TheOrder'

const children = [
  {
    name: 'orders.show',
    path: '/clientes/:client/pedidos/:order',
    component: TheOrder,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'orders',
    path: '/',
    component: Layout,
    children
  }
]
