import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

import TheOrder from './show/TheOrder'
import TheOrderNew from './create/TheOrderNew'
import TheOrderEdit from './edit/TheOrderEdit'

const children = [
  {
    name: 'orders.create',
    path: '/clientes/:clientKey/novo-pedido',
    component: TheOrderNew,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: 'orders.show',
    path: '/clientes/:clientKey/pedidos/:orderKey',
    component: TheOrder,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: 'orders.edit',
    path: '/clientes/:clientKey/pedidos/:orderKey/editar',
    component: TheOrderEdit,
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
