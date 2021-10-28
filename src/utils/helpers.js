/**
 * @file Arquivo para o plugin de helpers do vue disponível
 * através de $helpers variavels
 */
import { isNil } from 'lodash-es'
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

export default {
  fallback,
  toBRL
}
