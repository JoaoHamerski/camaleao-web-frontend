import Layout from './Layout'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheClothingTypes = () => import(
  /* webpackChunkName: "clothing-types" */
  './index/TheClothingTypes'
)

const children = [
  {
    name: 'clothing-types.index',
    path: 'gerenciamento/tipos-de-roupas',
    component: TheClothingTypes,
    meta: {
      middleware: [role],
      roles: [roles.ATENDIMENTO, roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'clothing-types',
    path: '/',
    component: Layout,
    children
  }
]
