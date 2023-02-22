import Layout from '@/views/MainLayout.vue'

import roles from '@/constants/roles'
import role from '@/middleware/role'

const TheProductivityPanel = () => import(
  /* webpackChunkName: "productivity-panel" */
  /* webpackPrefetch: true */
  './index/TheProductivityPanel.vue'
)

const children = [
  {
    name: 'productivity-panel.index',
    path: '/painel-de-produtividade',
    component: TheProductivityPanel,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'productivity-panel',
    path: '/',
    component: Layout,
    children
  }
]
