import { isNil } from 'lodash-es'
import { DateTime } from 'luxon'

export const format = (str, pattern) => {
  let i = 0

  if (isNil(str)) {
    return null
  }

  const formatted = pattern.replace(/#/g, () => {
    return str.charAt(i++) || '#'
  })

  return formatted
}

export const formatPhone = (str) => {
  const patterns = {
    8: '####-####',
    9: '# ####-####',
    10: '(##) ####-####',
    11: '(##) # ####-####'
  }
  const length = str?.length || 0

  if (length < 8 || length > 11) {
    return null
  }

  return format(str, patterns[str.length])
}

export const formatMoney = (str, highlightNumerator = false) => {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(str)

  if (highlightNumerator) {
    const numerator = formatted.split(',')[0]
    const denominator = formatted.split(',')[1]
    const highlighted = `<b>${numerator}</b>,${denominator}`

    return highlighted
  }

  return formatted
}

export const formatDate = (str, format = 'dd/MM/y') => {
  return DateTime
    .fromISO(str)
    .setLocale('pt-br')
    .toFormat(format)
}

export default {
  formatPhone,
  formatMoney
}
