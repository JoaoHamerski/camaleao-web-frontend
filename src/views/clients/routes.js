import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

import TheClients from './TheClients'
import TheClient from './show/TheClient'

const children = [
  {
    name: 'clients.index',
    path: '/clientes',
    component: TheClients,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: 'clients.show',
    path: '/clientes/:clientKey/pedidos',
    component: TheClient,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'clients',
    path: '/',
    component: Layout,
    children
  }
]
