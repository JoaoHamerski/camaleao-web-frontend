import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { users } from '@/constants/route-names'

const TheUsers = () => import(
  /* webpackChunkName: "users" */
  /* webpackPrefetch: true */
  './index/TheUsers.vue'
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
