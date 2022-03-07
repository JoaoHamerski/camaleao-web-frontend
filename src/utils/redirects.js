import router from '@/router'
import { isObject } from 'lodash-es'

const getKeysOf = (...vars) => {
  return vars.map(
    item => isObject(item) ? item.id : item
  )
}

export const redirectToClient = (client) => {
  const [clientKey] = getKeysOf(client)

  router.push({
    name: 'clients.show',
    params: {
      clientKey
    }
  })
}

export const redirectToOrder = (client, order) => {
  const [clientKey, orderKey] = getKeysOf(client, order)

  router.push({
    name: 'orders.show',
    params: {
      clientKey, orderKey
    }
  })
}

export const redirectToPreRegisteredOrder = (order) => {
  const [orderKey] = getKeysOf(order)

  router.push({
    name: 'orders.show.pre-registered',
    params: {
      orderKey
    }
  })
}

export const redirectToClients = () => {
  router.push({
    name: 'clients.index'
  })
}

export const redirectToOrders = () => {
  router.push({
    name: 'orders.index'
  })
}

export default {
  redirectToClient,
  redirectToOrder,
  redirectToClients,
  redirectToOrders,
  redirectToPreRegisteredOrder
}
