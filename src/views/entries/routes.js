import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheEntries = () => import(
  /* webpackChunkName: "entries" */
  /* webpackPrefetch: true */
  './index/TheEntries.vue'
)

const children = [
  {
    name: 'entries.index',
    path: 'entradas',
    component: TheEntries,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA, roles.ATENDIMENTO]
    }
  }
]

export default [
  {
    name: 'entries',
    path: '/',
    component: Layout,
    children
  }
]
