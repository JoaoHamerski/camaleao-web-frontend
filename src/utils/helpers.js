/**
 * @file Arquivo para o plugin de helpers do vue disponível
 * através de $helpers variavel
 */
import { apolloClientInstance } from '@/vue-apollo'
import { GetConfig } from '@/graphql/Config.gql'

import store from '@/store'
import router from '@/router'

import { map, isObject, isNil, flattenDeep } from 'lodash-es'
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

  const { data: {configGet: config} } = await apolloClient.query({
    query: GetConfig,
    variables: {
      name, key, encoded: true
    },
    fetchPolicy: 'network-only'
  })

  return JSON.parse(config)
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

/**
 * @method
 * Retorna cada key do objeto de keys passados
 *
 * @param {object} keys - Objeto de chaves que será
 *  retornado respectivamente como array
 *
 * @param {(object|string)} routeKeyNames - A chave a ser retornada de cada "keys",
 * pode ser um objeto com o nome da chave de "keys", ou apenas uma string,
 * que será usada para todos os objetos de "keys"
 *
 * @return {array}
 */
const getKeysOf = (keys, routeKeyNames = 'id') => {
  return map(keys, (item, key) => {
    if (!isObject(item)) {
      return item
    }

    if (isObject(routeKeyNames)) {
      return item[routeKeyNames[key]]
    }

    return item[routeKeyNames]
  })
}

/**
 * @method
 * Retorna o parâmetro "params" formatado para o vue router RawLocation type
 *
 * @param {object} keys - Chaves das rotas usada para criar os parâmetros,
 * sempre com sufixo "Key". E.g.: nameKey
 * @param {(object|string)} [routeKeyNames=id] - A chave de cada rota informada em "keys" |
 * Uma string como chave geral para todas as rotas
 * @param {string} - Sufixo das rotas
 *
 * @return {object}
 */
export const getRouteParams = (keys, routeKeyNames = 'id', postfix = 'Key') => {
  const routeKeys = getKeysOf(keys, routeKeyNames)
  const keyNames = Object.keys(keys)
  const params = {}

  routeKeys.map((value, index) => {
    params[keyNames[index] + postfix] = value
  })

  return params
}

/**
 * Redireciona para a rota informada.
 *
 * @param {string} name - Nome da rota
 * @param {object} keys - Keys das rotas, sem o sufixo "Key"
 * @param {(object|string)} [routeKeyNames=id] - Objeto com cada keyName das keys | keyName geral como string
 * @return {void}
 */
export const redirectTo = (name, keys = null, routeKeyNames = 'id') => {
  if (!keys) {
    router.push({ name })
    return
  }

  router.push({
    name,
    params: getRouteParams(keys, routeKeyNames)
  })
}

/**
 * Gera a url da rota informada.
 *
 * @param {string} name - Nome da rota
 * @param {object} keys - Keys das rotas, sem o sufixo "Key"
 * @param {(object|string)} [routeKeyNames=id] - Objeto com cada keyName das keys | keyName geral como string
 * @return {string}
 */
export const getUrl = (name, keys = null, routeKeyNames = 'id') => {
  if (!keys) {
    router.push({ name })
    return
  }

  const resolvedRoute = router.resolve({
    name,
    params: getRouteParams(keys, routeKeyNames)
  })

  return resolvedRoute.href
}

export const replaceStrArray = (search, replace, subject) => {
  const segments = subject.split(search)

  const result = []
  result.push(segments.shift())

  for (const segment of segments) {
    result.push((replace.shift() || search) + segment)
  }

  return result.join('')
}

const clearCacheByFieldName = (payload) => {
  const { apolloClient } = apolloClientInstance
  const { fieldName } = payload

  apolloClient.cache.evict({ fieldName })
}

const clearCacheById = (payload) => {
  const { apolloClient } = apolloClientInstance
  const { id, __typename } = payload
  const normalizedId = apolloClient.cache.identify({ id, __typename })

  apolloClient.cache.evict({ id: normalizedId })
}

const delegateClearCacheFrom = (props) => {
  if ('id' in props && '__typename' in props) {
    clearCacheById(props)
  } else if ('fieldName' in props) {
    clearCacheByFieldName(props)
  }
}

export const clearCacheFrom = (payload) => {
  const { apolloClient } = apolloClientInstance

  if (Array.isArray(payload)) {
    for (const props of payload) {
      delegateClearCacheFrom(props)
    }
  } else {
    delegateClearCacheFrom(payload)
  }

  apolloClient.cache.gc()
}

export const plural = (value, gender = 'M', word, wordPlural = null, upperCase = false) => {
  const pronoun = gender.toLocaleLowerCase() === 'm'
    ? 'nenhum'
    : 'nenhuma'

  if (value === null || value === 0) {
    const str = `${pronoun} ${word}`

    return upperCase
      ? str.toUpperCase()
      : str
  }

  const str = value !== 1
    ? `${value} ${wordPlural || word + 's'}`
    : `${value} ${word}`

  return upperCase
    ? str.toUpperCase()
    : str
}

export const openInNewTab = (href) => {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: href,
  }).click();
}

export default {
  fallback,
  toBRL,
  inputFileToBase64,
  strContainsAny,
  stripNonDigits,
  isNumeric,
  getConfig,
  canView,
  getRouteParams,
  redirectTo,
  getUrl,
  replaceStrArray,
  clearCacheFrom,
  plural,
  openInNewTab
}
