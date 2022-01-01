import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheCashFlow = () => import(
  /* webpackChunkName: "cash-flow" */
  './index/TheCashFlow'
)

const children = [
  {
    name: 'cash-flow.index',
    path: 'fluxo-de-caixa',
    component: TheCashFlow,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
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
