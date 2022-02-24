import guest from '@/middleware/guest'

import TheLogin from './TheLogin'

export default [
  {
    name: 'login',
    path: '/entrar',
    component: TheLogin,
    meta: { middleware: [guest] }
  }
]
