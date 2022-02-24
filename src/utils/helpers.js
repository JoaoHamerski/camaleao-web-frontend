/**
 * @file Arquivo para o plugin de helpers do vue disponível
 * através de $helpers variavel
 */
import { apolloClientInstance } from '@/vue-apollo'
import { configGet } from '@/graphql/Config.gql'
import store from '@/store'

import { isNil, flattenDeep } from 'lodash-es'
import { formatCurrencyBRL } from '@/utils/formatters'

const fallback = (object, prop, fallbackString = 'N/A') => {
  if (isNil(prop)) {
    return object || fallbackString
  }
  return isNil(object) ? fallbackString : object[prop]
}

const toBRL = (str, highlightNumerator = false) => {
  return formatCurrencyBRL(str, highlightNumerator)
}

const inputFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

const strContainsAny = (str, search) => {
  if (!str) {
    return str
  }

  if (typeof search === 'object') {
    for (const s of search) {
      if (str.indexOf(s) > -1) {
        return true
      }
    }
  }

  if (str.indexOf(search) > -1) {
    return true
  }

  return false
}

export const stripNonDigits = (str) => {
  return str.replace(/\D/g, '')
}

export const isNumeric = (value) => {
  return /^\d+$/.test(value)
}

export const getConfig = async (name, key = null) => {
  const { apolloClient } = apolloClientInstance

  const { data } = await apolloClient.query({
    query: configGet,
    variables: {
      name, key
    },
    fetchPolicy: 'no-cache'
  })

  return JSON.parse(data.configGet)
}

export const canView = (...roleIds) => {
  const authUser = store.getters['auth/authUser']

  if (Array.isArray(roleIds[0])) {
    roleIds = flattenDeep(roleIds)
  }

  if (!authUser) {
    return false
  }

  return roleIds.includes(+authUser.role.id)
}

export default {
  fallback,
  toBRL,
  inputFileToBase64,
  strContainsAny,
  stripNonDigits,
  isNumeric,
  getConfig,
  canView
}
