import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { branches } from '@/constants/route-names'

const TheBranches = () => import(
  /* webpackChunkName: "branches" */
  /* webpackPrefetch: true */
  './index/TheBranches'
)

const children = [
  {
    name: branches.index,
    path: '/gerenciamento/filiais',
    component: TheBranches,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'branches',
    path: '/',
    component: Layout,
    children
  }
]
