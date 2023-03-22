import Layout from '@/views/MainLayout.vue'

import roles from '@/constants/roles'
import role from '@/middleware/role'

const TheSectors = () => import(
  /* webpackChunkName: "sectors" */
  /* webpackPrefetch: true */
  './index/TheSectors.vue'
)

const children = [
  {
    name: 'sectors.index',
    path: '/setores',
    component: TheSectors,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    },
  }
]

export default [
  {
    name: 'sectors',
    path: '/',
    component: Layout,
    children
  }
]
