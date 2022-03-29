import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { users } from '@/constants/route-names'

const TheUsers = () => import(
  /* webpackChunkName: "users" */
  './index/TheUsers'
)

const children = [
  {
    name: users.index,
    path: '/gerenciamento/usuarios',
    component: TheUsers,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'users',
    path: '/',
    component: Layout,
    children
  }
]
