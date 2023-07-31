import roles from '@/constants/roles'
import role from '@/middleware/role'
import Layout from '@/views/MainLayout.vue'

const TheDashboard = () => import('./index/TheDashboard.vue')

const children = [
  {
    name: 'dashboard.index',
    path: 'dashboard',
    component: TheDashboard,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'dashboard',
    path: '/',
    component: Layout,
    children
  }
]
