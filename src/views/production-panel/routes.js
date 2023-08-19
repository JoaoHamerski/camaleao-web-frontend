import Layout from '@/views/MainLayout.vue'

import roles from '@/constants/roles'
import role from '@/middleware/role'

const TheProductionPanel = () => import(
  /* webpackChunkName: "production-panel" */
  /* webpackPrefetch: true */
  './index/TheProductionPanel.vue'
)

const children = [
  {
    name: 'production-panel.index',
    path: '/painel-de-produtividade',
    component: TheProductionPanel,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'production-panel',
    path: '/',
    component: Layout,
    children
  }
]
