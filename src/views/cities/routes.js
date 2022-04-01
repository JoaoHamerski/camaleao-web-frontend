import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'
import { citiesRoutes } from '@/constants/route-names'

const TheCities = () => import(
  /* webpackChunkName: "cities" */
  /* webpackPrefetch: true */
  './index/TheCities'
)

const children = [
  {
    name: citiesRoutes.index,
    path: '/gerenciamento/cidades',
    component: TheCities,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
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
