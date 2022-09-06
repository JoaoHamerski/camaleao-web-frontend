import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheOrderControl = () => import(
  './index/TheOrderControl.vue'
)

const children = [
  {
    name: 'order-control.index',
    path: '/controle-de-pedidos',
    component: TheOrderControl,
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
    name: 'order-control',
    path: '/',
    component: Layout,
    children
  }
]
