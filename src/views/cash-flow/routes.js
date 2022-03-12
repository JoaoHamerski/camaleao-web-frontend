import Layout from '@/views/Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { cashFlow } from '@/constants/route-names'

const TheCashFlow = () => import(
  /* webpackChunkName: "cash-flow" */
  './index/TheCashFlow'
)

const children = [
  {
    name: cashFlow.index,
    path: 'fluxo-de-caixa',
    component: TheCashFlow,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'cash-flow',
    path: '/',
    component: Layout,
    children
  }
]
