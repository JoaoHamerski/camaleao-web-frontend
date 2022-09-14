import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheBankEntries = () => import(
  /* webpackChunkName: "bank-entries" */
  /* webpackPrefetch: true */
  './index/TheBankEntries'
)

const children = [
  {
    name: 'bank-entries.index',
    path: 'gerenciamento/entradas',
    component: TheBankEntries,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'bank-entries',
    path: '/',
    component: Layout,
    children
  }
]
