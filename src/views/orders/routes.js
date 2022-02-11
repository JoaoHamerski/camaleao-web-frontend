import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheOrders = () => import(
  /* webpackChunkName: "orders" */
  './index/TheOrders'
)

const TheOrder = () => import(
  /* webpackChunkName: "orders" */
  './show/TheOrder'
)

const TheOrderNew = () => import(
  /* webpackChunkName: "orders" */
  './create/TheOrderNew'
)

const TheOrderEdit = () => import(
  /* webpackChunkName: "orders" */
  './edit/TheOrderEdit'
)

const children = [
  {
    name: 'orders.index',
    path: '/pedidos',
    component: TheOrders,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
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
