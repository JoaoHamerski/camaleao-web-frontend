import guest from '@/middleware/guest'
import { auth } from '@/constants/route-names'

import TheLogin from './TheLogin.vue'

export default [
  {
    name: auth.login,
    path: '/entrar',
    component: TheLogin,
    meta: { middleware: [guest] }
  }
]
