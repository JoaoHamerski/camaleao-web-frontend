import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { clients } from '@/constants/route-names'

const TheClients = () => import(
  /* webpackChunkName: "clients" */
  /* webpackPrefetch: true */
  './index/TheClients'
)

const TheClient = () => import(
  /* webpackChunkName: "clients" */
  /* webpackPrefetch: true */
  './show/TheClient'
)

const children = [
  {
    name: clients.index,
    path: '/clientes',
    component: TheClients,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: clients.show,
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
