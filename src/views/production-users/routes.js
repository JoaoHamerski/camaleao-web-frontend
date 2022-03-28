import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { productionUsers } from '@/constants/route-names'

const TheProductionUsers = () => import(
  /* webpackChunkName: "production-users" */
  './index/TheProductionUsers'
)

const children = [
  {
    name: productionUsers.index,
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
