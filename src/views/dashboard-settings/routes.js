import roles from '@/constants/roles'
import role from '@/middleware/role'
import Layout from '@/views/MainLayout.vue'

const TheDashboardSettings = () => import('./index/TheDashboardSettings.vue')

const children = [
  {
    name: 'dashboard-settings.index',
    path: 'gerenciamento/dashboard',
    component: TheDashboardSettings,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'dashboard-settings',
    path: '/',
    component: Layout,
    children
  }
]
