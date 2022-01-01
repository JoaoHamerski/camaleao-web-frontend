import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheClients = () => import(
  /* webpackChunkName: "clients" */
  './index/TheClients'
)

const TheClient = () => import(
  /* webpackChunkName: "clients" */
  './show/TheClient'
)

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
