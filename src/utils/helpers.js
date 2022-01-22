/**
 * @file Arquivo para o plugin de helpers do vue disponível
 * através de $helpers variavel
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

export default {
  fallback,
  toBRL,
  inputFileToBase64,
  strContainsAny
}
