import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheWeeklyCalendarDelivery = () => import(
  /* webpackChunkName: "weekly-calendar-delivery" */
  /* webpackPrefetch: true */
  './TheWeeklyCalendarDelivery.vue'
)

const TheWeeklyCalendarSeam = () => import(
  /* webpackChunkName: "weekly-calendar-seam" */
  /* webpackPrefetch: true */
  './TheWeeklyCalendarSeam.vue'
)

const TheWeeklyCalendarPrint = () => import(
  /* webpackChunkName: "weekly-calendar-print" */
  /* webpackPrefetch: true */
  './TheWeeklyCalendarPrint.vue'
)

const children = [
  {
    name: 'weekly-calendar.print.index',
    path: '/calendario-semanal/estampa',
    component: TheWeeklyCalendarPrint,
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
  },
  {
    name: 'weekly-calendar.seam.index',
    path: '/calendario-semanal/costura',
    component: TheWeeklyCalendarSeam,
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
  },
  {
    name: 'weekly-calendar.delivery.index',
    path: '/calendario-semanal/entrega',
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
