import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { activities } from '@/constants/route-names'

const TheActivities = () => import(
  './index/TheActivities.vue'
)

const children = [
  {
    name: activities.index,
    path: '/atividades',
    component: TheActivities,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'atividades',
    path: '/',
    component: Layout,
    children
  }
]
