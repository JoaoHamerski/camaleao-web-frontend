import Layout from '@/views/MainLayout.vue'

import auth from '@/middleware/auth'

const TheNubank = () => import(
  './index/TheNubank.vue'
)

const children = [
  {
    name: 'nubank.index',
    path: '/nubank',
    component: TheNubank,
    meta: {
      middleware: [auth]
    }
  }
]

export default [
  {
    name: 'nubank',
    path: '/',
    component: Layout,
    children
  }
]
