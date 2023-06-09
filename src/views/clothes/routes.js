import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheClothes = () => import('./index/TheClothes.vue')

const children = [
  {
    name: 'clothes.index',
    path: '/gerenciamento/roupas',
    component: TheClothes,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'clothes',
    path: '/',
    component: Layout,
    children
  }
]
