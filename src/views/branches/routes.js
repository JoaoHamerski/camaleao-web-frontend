import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheBranches = () => import(
  /* webpackChunkName: "branches" */
  './index/TheBranches'
)

const children = [
  {
    name: 'branches.index',
    path: '/gerenciamento/filiais',
    component: TheBranches,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA, roles.ATENDIMENTO]
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