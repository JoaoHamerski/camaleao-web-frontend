import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { orders } from '@/constants/route-names'

const TheOrders = () => import(
  /* webpackChunkName: "orders" */
  /* webpackPrefetch: true */
  './index/TheOrders.vue'
)

const TheOrder = () => import(
  /* webpackChunkName: "orders" */
  /* webpackPrefetch: true */
  './show/TheOrder.vue'
)

const TheOrderNew = () => import(
  /* webpackChunkName: "orders" */
  /* webpackPrefetch: true */
  './create/TheOrderNew.vue'
)

const TheOrderEdit = () => import(
  /* webpackChunkName: "orders" */
  /* webpackPrefetch: true */
  './edit/TheOrderEdit.vue'
)

const children = [
  {
    name: orders.index,
    path: '/pedidos',
    component: TheOrders,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: orders.create,
    path: '/clientes/:clientKey/novo-pedido',
    component: TheOrderNew,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: orders.show,
    path: '/clientes/:clientKey/pedidos/:orderKey',
    component: TheOrder,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: orders.showPreRegistered,
    path: '/pedidos/:orderKey',
    component: TheOrder,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: orders.edit,
    path: '/clientes/:clientKey/pedidos/:orderKey/editar',
    component: TheOrderEdit,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  },
  {
    name: orders.editPreRegistered,
    path: '/pedidos/:orderKey/editar',
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
