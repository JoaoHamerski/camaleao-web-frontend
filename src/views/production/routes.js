import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { production } from '@/constants/route-names'

const TheProduction = () => import(
  /* webpackChunkName: "production" */
  /* webpackPrefetch: true */
  './index/TheProduction'
)

const children = [
  {
    name: production.index,
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
