import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheUsers = () => import(
  /* webpackChunkName: "users" */
  './index/TheUsers'
)

const children = [
  {
    name: 'users.index',
    path: '/usuarios',
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