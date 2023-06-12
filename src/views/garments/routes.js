import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheGarments = () => import('./index/TheGarments.vue')

const children = [
  {
    name: 'garments.index',
    path: '/gerenciamento/roupas',
    component: TheGarments,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'garments',
    path: '/',
    component: Layout,
    children
  }
]
