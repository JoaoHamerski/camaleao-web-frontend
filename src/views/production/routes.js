import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheProduction = () => import(
  /* webpackChunkName: "production" */
  './index/TheProduction'
)

const children = [
  {
    name: 'production.index',
    path: '/producao',
    component: TheProduction,
    meta: {
      middleware: [role],
      roles: [roles.COSTURA, roles.ESTAMPA]
    }
  }
]

export default [
  {
    name: 'producao',
    path: '/',
    component: Layout,
    children
  }
]
