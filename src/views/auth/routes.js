import Layout from './Layout'
import TheLogin from './TheLogin'

const children = [
  {
    path: '/entrar',
    component: TheLogin
  }
]

export default [
  {
    path: '',
    component: Layout,
    children
  }
]
