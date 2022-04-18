import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheStatus = () => import(
  /* webpackChunkName: "users" */
  /* webpackPrefetch: true */
  './index/TheStatus'
)

const children = [
  {
    name: 'status.index',
    path: '/gerenciamento/status',
    component: TheStatus,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'status',
    path: '/',
    component: Layout,
    children
  }
]
