import Layout from '@/views/MainLayout.vue'

import auth from '@/middleware/auth'
import { myAccount } from '@/constants/route-names'

const TheMyAccount = () => import(
  /* webpackChunkName: "my-acount" */
  /* webpackPrefetch: true */
  './index/TheMyAccount.vue'
)

const children = [
  {
    name: myAccount.index,
    path: '/minha-conta',
    component: TheMyAccount,
    meta: {
      middleware: [auth]
    }
  }
]

export default [
  {
    name: 'my-account',
    path: '/',
    component: Layout,
    children
  }
]
