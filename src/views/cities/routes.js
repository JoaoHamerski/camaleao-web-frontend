import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheCities = () => import(
  /* webpackChunkName: "cities" */
  './index/TheCities'
)

const children = [
  {
    name: 'cities.index',
    path: '/gerenciamento/cidades',
    component: TheCities,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA, roles.ATENDIMENTO]
    }
  }
]

export default [
  {
    name: 'cities',
    path: '/',
    component: Layout,
    children
  }
]
