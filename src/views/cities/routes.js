import Layout from '@/views/Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { citiesRoutes } from '@/constants/route-names'

const TheCities = () => import(
  /* webpackChunkName: "cities" */
  './index/TheCities'
)

const children = [
  {
    name: citiesRoutes.index,
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
