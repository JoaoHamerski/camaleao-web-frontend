import Layout from '@/views/MainLayout.vue'

import role from '@/middleware/role'
import roles from '@/constants/roles'

const TheBankMirror = () => import('./index/TheBankMirror.vue')

const children = [
  {
    name: 'bank-mirror.index',
    path: 'espelho-bancario',
    component: TheBankMirror,
    meta: {
      middleware: [role],
      roles: [roles.GERENCIA]
    }
  }
]

export default [
  {
    name: 'bank-mirror',
    path: '/',
    component: Layout,
    children
  }
]
