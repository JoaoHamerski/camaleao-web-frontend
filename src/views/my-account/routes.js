import Layout from './Layout'

import auth from '@/middleware/auth'

const TheMyAccount = () => import(
  /* webpackChunkName: "my-acount" */
  './index/TheMyAccount'
)

const children = [
  {
    name: 'my-account.index',
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
