import Layout from '@/views/MainLayout.vue'

import roles from '@/constants/roles'
import role from '@/middleware/role'

const TheBudgetGenerator = () => import(
  /* webpackChunkName: "budget-generator" */
  /* webpackPrefetch: true */
  './index/TheBudgetGenerator.vue'
)

const children = [
  {
    name: 'budget-generator.index',
    path: '/gerador-de-orcamento',
    component: TheBudgetGenerator,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA, roles.ATENDIMENTO]
    }
  }
]

export default [
  {
    name: 'budget-generator',
    path: '/',
    component: Layout,
    children
  }
]
