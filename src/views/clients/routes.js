import Layout from './Layout'

import TheClients from './TheClients'

const children = [
  {
    name: 'clients.index',
    path: '/clientes',
    component: TheClients
  }
]

export default [
  {
    name: 'clients',
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children
  }
]
