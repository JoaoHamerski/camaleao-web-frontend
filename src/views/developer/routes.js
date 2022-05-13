import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheReportUpdate = () => import (
  /* webpackChunkName: "developer" */
  /* webpackPrefetch: false */
  './TheReportUpdate.vue'
)

const children = [
  {
    name: 'developer.update-reports',
    path: '/desenvolvedor/relatorio-de-atualizacoes',
    component: TheReportUpdate,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'developer',
    path: '/desenvolvedor/',
    component: Layout,
    children
  },
]
