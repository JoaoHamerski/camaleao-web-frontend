import Layout from '@/views/MainLayout.vue'

import roles from '@/constants/roles'
import role from '@/middleware/role'

const TheReceiptGenerator = () => import(
  /* webpackChunkName: "receipt-generator" */
  /* webpackPrefetch: true */
  './index/TheReceiptGenerator.vue'
)

const children = [
  {
    name: 'receipt-generator.index',
    path: '/gerador-de-recibo',
    component: TheReceiptGenerator,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA, roles.ATENDIMENTO]
    }
  }
]

export default [
  {
    name: 'receipt-generator',
    path: '/',
    component: Layout,
    children
  }
]
