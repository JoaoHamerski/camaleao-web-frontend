import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheProductionUsers = () => import(
  /* webpackChunkName: "production-users" */
  './index/TheProductionUsers'
)

const children = [
  {
    name: 'production-users.index',
    path: '/usuarios-producao',
    component: TheProductionUsers,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'usuarios-producao',
    path: '/',
    component: Layout,
    children
  }
]
