import guest from '@/middleware/guest'

import TheLogin from './TheLogin'

export default [
  {
    path: '/entrar',
    component: TheLogin,
    meta: { middleware: [guest] }
  }
]
