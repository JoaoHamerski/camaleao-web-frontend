import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheWeeklyCalendarDelivery = () => import(
  /* webpackChunkName: "weekly-calendar" */
  /* webpackPrefetch: true */
  './TheWeeklyCalendarDelivery.vue'
)

const children = [
  {
    name: 'weekly-calendar.delivery.index',
    path: '/calendario-de-entrega',
    component: TheWeeklyCalendarDelivery,
    meta: {
      middleware: [role],
      roles: [
        roles.GERENCIA,
        roles.ATENDIMENTO,
        roles.DESIGN,
        roles.COSTURA,
        roles.ESTAMPA,
      ]
    }
  }
]

export default [
  {
    name: 'weekly-calendar',
    path: '/',
    component: Layout,
    children
  }
]
