import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheProductionTrack = () => import(
  './index/TheProductionTrack.vue'
)

const children = [
  {
    name: 'production-track.index',
    path: '/esteira-de-producao',
    component: TheProductionTrack,
    meta: {
      middleware: [role],
      roles: [
        roles.ATENDIMENTO,
        roles.COSTURA,
        roles.DESIGN,
        roles.ESTAMPA,
        roles.GERENCIA
      ]
    }
  }
]

export default [
  {
    name: 'production-track',
    path: '/',
    component: Layout,
    children
  }
]
