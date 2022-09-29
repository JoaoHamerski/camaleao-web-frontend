import { isNil, startsWith } from 'lodash-es'
import { DateTime } from 'luxon'
import accounting from 'accounting-js'

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

export const formatCurrencyBRL = (str, highlightNumerator = false, appendPlus = false) => {
  const formatted = accounting.formatMoney(str, {
    symbol: 'R$',
    decimal: ',',
    thousand: '.',
    precision: 2,
    format: '%s %v'
  })

  if (startsWith(str, 'R$')) {
    return str
  }

  const numeric = formatted.split('R$ ')[1]
  const numerator = numeric.split(',')[0]
  const denominator = numeric.split(',')[1]

  if (highlightNumerator) {
    const highlighted = `<b>R$ ${numerator}</b>,${denominator}`

    return highlighted
  }

  if (appendPlus) {
    const appended = `R$ +${numerator},${denominator}`

    return appended
  }

  return formatted
}

export const formatDatetime = (str, format = 'dd/MM/y') => {
  if (isNil(str)) {
    return str
  }

  const formatted = DateTime.fromFormat(str, format)

  if (formatted.isValid) {
    return str
  }

  return DateTime
    .fromSQL(str)
    .setLocale('pt-br')
    .toFormat(format)
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 B'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  const formattedSize = accounting.formatNumber(size, {
    precision: 2,
    thousand: '.',
    decimal: ','
  })
  const symbol = sizes[i]

  return formattedSize + ' ' + symbol
}

export default {
  formatCurrencyBRL,
  formatDatetime,
  formatBytes,
  formatPhone
}
